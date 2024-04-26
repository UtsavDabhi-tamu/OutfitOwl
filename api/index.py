from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
from openai import OpenAI
import os

import pickle
from PIL import Image
import torch
from torch import nn
import torchvision.transforms as transforms
import torchvision.models as models
import random

app = Flask(__name__)

# Allow cross-origin requests
CORS(app)

basic_preferences = [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 
                    1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 
                    0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 
                    0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 
                    1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 
                    0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 
                    0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 
                    0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 
                    1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 
                    0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 
                    0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 
                    1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 
                    0, 1, 1, 1, 0]


@app.route("/api/store_preferences", methods=["POST"])
def user_preferences():
    likedImages = request.json.get("likedImages")

    return jsonify({"likedImages": likedImages})


def get_sim_image(category, profile="Basic"):
    # combined_categories = {
    #     "Top": ["Blouse", "Tee", "Top"],
    #     "Jeans": ["Jeans", "Leggings", "Leggings", "Sweatpants"],
    #     "Shorts": ["Shorts", "Cutoffs"],
    #     "Jacket": ["Blazer", "Coat", "Hoodie", "Jacket"],
    #     "Skirt": ["Skirt"],
    #     "Sweater": ["Sweater"],
    # }
    # categories = combined_categories[category]

    # Add other profiles later
    profile_preferences = {
        "Basic": basic_preferences,
    }
    user_preferences = profile_preferences[profile]

    image_directory = "public/images/preferences"
    images = []

    for root, dirs, files in os.walk(image_directory):
        for i, file in enumerate(files):
            # if file.lower().endswith(".jpg") and any(category in file for category in categories) and user_preferences[i] == 1:
            if file.lower().endswith(".jpg") and category in file and user_preferences[i] == 1:
                images.append(file)
    
    sim_image = random.choice(images)
    return sim_image


# items_to_rec ex. ['Top', 'Shorts']
def run_vbpr(items_to_rec, profile="Basic"):
    profile_vbpr = {"Basic": "basic_vbpr.pkl"}
    vbpr_file_name = profile_vbpr[profile]
    
    trainer = None
    with open(vbpr_file_name, 'rb') as f:
        trainer = pickle.load(f)


    for category in items_to_rec:
        # Get feature from similar image
        sim_image = get_sim_image(category, profile)
        query_img_features = trainer.get_image_feature("preference_features/"+sim_image[:-4]+".pt")

        # Query image features reshaped and appended
        query_img_features = query_img_features.reshape(1, -1)
        original_features = trainer.model.features.weight.data.clone()
        features_with_query = torch.cat([original_features, query_img_features], dim=0)
        print(features_with_query.shape)
        trainer.model.features = nn.Embedding.from_pretrained(features_with_query, freeze=True)

        # Update all item-dependent embeddings to include the new item
        original_gamma_items = trainer.model.gamma_items.weight.data.clone()
        new_gamma_items = torch.cat([original_gamma_items, torch.zeros(1, original_gamma_items.size(1), device=trainer.model.gamma_items.weight.device)], dim=0)
        trainer.model.gamma_items = nn.Embedding.from_pretrained(new_gamma_items, freeze=False)

        original_beta_items = trainer.model.beta_items.weight.data.clone()
        new_beta_items = torch.cat([original_beta_items, torch.zeros(1, 1, device=trainer.model.beta_items.weight.device)], dim=0)
        trainer.model.beta_items = nn.Embedding.from_pretrained(new_beta_items, freeze=False)

        # Setup indices for model input
        device = next(trainer.model.parameters()).device
        user_index = torch.tensor([[0]], device=device)

        # Compute similarity scores with the updated model
        items_indices = torch.arange(features_with_query.size(0), device=device).unsqueeze(0)
        scores = trainer.model.recommend(user_index, items_indices)

        # Extract and print top recommendations
        top_scores, top_indices = torch.topk(scores.squeeze(), 2)
        top_indices = top_indices[top_indices != (features_with_query.size(0) - 1)]

        print("Top recommended item indices:", top_indices)

        # Restore the original state of the trainer's model
        trainer.model.features = nn.Embedding.from_pretrained(original_features, freeze=True)
        trainer.model.gamma_items = nn.Embedding.from_pretrained(original_gamma_items, freeze=False)
        trainer.model.beta_items = nn.Embedding.from_pretrained(original_beta_items, freeze=False)

        # Get image from top recommended item
        # top_indices[0]



def get_user_preference():
    pass

@app.route("/api/get_data", methods=["POST"])
def get_data():
    data = request.get_json()

    zipcode = data["zipcode"]
    weather_data = query_openweather(zipcode)

    plans = data["plans"]

    profile = data["profile"]
    clothing_prefs = profile["clothing_prefs"]

    response = query_gpt(weather_data, clothing_prefs, plans)

    items_to_rec = [item for item in response.split("|") if item != ""]
    print(items_to_rec)
    run_vbpr(items_to_rec, profile)

    # return jsonify(weather_data)
    return jsonify(items_to_rec)


# METHOD TO GET WEATHER DATA
def query_openweather(zipcode):
    """get the forecast for the whole day for the given zipcode"""

    WEATHER_API_KEY = "e31953beb2e64692b8b213507241904"
    END_POINT = f"https://api.weatherapi.com/v1/forecast.json?key={WEATHER_API_KEY}&q={zipcode}&days=1"

    r = requests.get(END_POINT)
    response = r.json()["forecast"]["forecastday"][0]["day"]

    # we get the following data from this endpoint
    """
        "day": {
            "maxtemp_c": 22.7,
            "maxtemp_f": 72.9,
            "mintemp_c": 18.9,
            "mintemp_f": 66.1,
            "avgtemp_c": 20.7,
            "avgtemp_f": 69.3,
            "maxwind_mph": 11.9,
            "maxwind_kph": 19.1,
            "totalprecip_mm": 0.27,
            "totalprecip_in": 0.01,
            "totalsnow_cm": 0.0,
            "avgvis_km": 6.7,
            "avgvis_miles": 4.0,
            "avghumidity": 89,
            "daily_will_it_rain": 1,
            "daily_chance_of_rain": 89,
            "daily_will_it_snow": 0,
            "daily_chance_of_snow": 0,
            "condition": {
                "text": "Patchy rain nearby",
                "icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
                "code": 1063
            },
            "uv": 4.0
        },
    """

    data_to_pass = {
        "avg_temp_f": response["avgtemp_f"],
        "max_wind_mph": response["maxwind_mph"],
        "total_precip_mm": response["totalprecip_mm"],
        "total_snow_cm": response["totalsnow_cm"],
        "avg_humidity": response["avghumidity"],
        "chance_of_rain_precent": response["daily_chance_of_rain"],
        "chance_of_snow_percent": response["daily_chance_of_snow"],
        "condition": response["condition"]["text"],
        "uv_index": response["uv"],
    }

    return data_to_pass


# METHOD TO GET RECOMMENDATIONS FROM GPT
def query_gpt(weather_data, clothing_prefs, plans):
    """pass on the weather data for the day and special plans to ask GPT to recommend outfits"""

    client = OpenAI(api_key="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")

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are an outfit picking assistant that will use my clothing preferences and current weather & location to pick an outfit for my day.",
            },
            {
                "role": "user",
                "content": f"""
                    The weather data of my location for the day is this {weather_data} and my plans for the day are {plans}.
                    My clothing preferences are these - {clothing_prefs}
                    What types of clothes should I wear today? You response should include each major article of clothing I should wear with no other text. Only give optional articles if necessary.

                    Feminine Options:
                        Lower Body Options: Sweatpants, Skirt, Shorts, Leggings, Jeans, Cutoffs
                        Upper Body Options: Top, Tee, Sweater, Blouse
                        Optional Upper Body Outerwear: Coat, Jacket, Hoodie, Blazer

                    Masculine Options:
                        Lower Body Options: Sweatpants, Shorts, Jeans
                        Upper Body Options: Tee, Sweater
                        Optional Upper Body Outerwear: Coat, Jacket, Hoodie, Blazer

                    Format: "|<lower body article>|<upper body article>|<optional upper body outerwear>|"
                    Example: |Shorts|Top|Jacket|
                """,
            },
        ],
    )

    response = completion.choices[0].message.content

    return response


@app.route("/api/img_filenames", methods=["GET"])
def get_img_filenames():
    image_directory = "public/images/preferences"
    image_filenames = []

    for root, dirs, files in os.walk(image_directory):
        for file in files:
            if file.lower().endswith(".jpg"):
                image_filenames.append(file)

    return jsonify(image_filenames)
