from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
from openai import OpenAI
import os

import pickle
from PIL import Image
import torch
from torch import nn
from vbpr import VBPR, Trainer
import torchvision.transforms as transforms
import torchvision.models as models
import random

from keys import keys

app = Flask(__name__)

# Allow cross-origin requests
CORS(app)

profile_vbpr = {
    "Basic": "api/Basic.pkl",
    "Patterns": "api/Patterns.pkl",
    "Solid": "api/Solid.pkl",
}
profile_preferences = {
    "Basic": [
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
    ],
    "Patterns": [
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ],
    "Solid": [
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
    ],
}

combined_categories = {
    "Top": ["Blouse", "Tee", "Top"],
    "Jeans": ["Jeans", "Leggings", "Leggings", "Sweatpants"],
    "Shorts": ["Shorts", "Cutoffs"],
    "Jacket": ["Blazer", "Coat", "Hoodie", "Jacket"],
    "Skirt": ["Skirt"],
    "Sweater": ["Sweater"],
}

reverse_combined_categories = {
    "Blouse": "Top",
    "Tee": "Top",
    "Top": "Top",
    "Jeans": "Jeans",
    "Leggings": "Jeans",
    "Sweatpants": "Jeans",
    "Shorts": "Shorts",
    "Cutoffs": "Shorts",
    "Blazer": "Jacket",
    "Coat": "Jacket",
    "Hoodie": "Jacket",
    "Jacket": "Jacket",
    "Skirt": "Skirt",
    "Sweater": "Sweater",
}


@app.route("/api/store_preferences", methods=["POST"])
def user_preferences():
    likedImages = request.json.get("likedImages")
    print(likedImages)

    return jsonify({"likedImages": likedImages})


def get_sim_image(category, profile="Basic"):
    user_preferences = profile_preferences[profile]

    image_directory = "public/images/preferences"
    images = []

    for root, dirs, files in os.walk(image_directory):
        for i, file in enumerate(files):
            if (
                file.lower().endswith(".jpg")
                and category in file
                and user_preferences[i] == 1
            ):
                images.append(file)

    if len(images) == 0:
        return "Jeans_Solid_3_92.jpg"
    sim_image = random.choice(images)
    return sim_image


# items_to_rec ex. ['Tee', 'Shorts']
def run_vbpr(items_to_rec, profile="Basic", topK=300):
    if profile not in profile_vbpr:
        profile = "Basic"
    vbpr_file_name = profile_vbpr[profile]

    trainer = None
    with open(vbpr_file_name, "rb") as f:
        trainer = pickle.load(f)

    # Get feature from similar image
    query_img_features = torch.load(
        "api/preference_features/"
        + get_sim_image(items_to_rec[1], profile)[: -len(".jpg")]
        + "_features.pt"
    )

    # Query image features reshaped and appended
    query_img_features = query_img_features.reshape(1, -1)
    original_features = trainer.model.features.weight.data.clone()
    features_with_query = torch.cat([original_features, query_img_features], dim=0)
    print(features_with_query.shape)
    trainer.model.features = nn.Embedding.from_pretrained(
        features_with_query, freeze=True
    )

    # Update all item-dependent embeddings to include the new item
    original_gamma_items = trainer.model.gamma_items.weight.data.clone()
    new_gamma_items = torch.cat(
        [
            original_gamma_items,
            torch.zeros(
                1,
                original_gamma_items.size(1),
                device=trainer.model.gamma_items.weight.device,
            ),
        ],
        dim=0,
    )
    trainer.model.gamma_items = nn.Embedding.from_pretrained(
        new_gamma_items, freeze=False
    )

    original_beta_items = trainer.model.beta_items.weight.data.clone()
    new_beta_items = torch.cat(
        [
            original_beta_items,
            torch.zeros(1, 1, device=trainer.model.beta_items.weight.device),
        ],
        dim=0,
    )
    trainer.model.beta_items = nn.Embedding.from_pretrained(
        new_beta_items, freeze=False
    )

    # Setup indices for model input
    device = next(trainer.model.parameters()).device
    user_index = torch.tensor([[0]], device=device)

    # Compute similarity scores with the updated model
    items_indices = torch.arange(features_with_query.size(0), device=device).unsqueeze(
        0
    )
    scores = trainer.model.recommend(user_index, items_indices)

    # Extract and print top recommendations
    top_scores, top_indices = torch.topk(scores.squeeze(), topK)

    # Remove prefernce images from top indices
    top_indices = top_indices[top_indices != (features_with_query.size(0) - 1)]

    # print(f"Top recommended item indices:", top_indices)

    # Restore the original state of the trainer's model
    trainer.model.features = nn.Embedding.from_pretrained(
        original_features, freeze=True
    )
    trainer.model.gamma_items = nn.Embedding.from_pretrained(
        original_gamma_items, freeze=False
    )
    trainer.model.beta_items = nn.Embedding.from_pretrained(
        original_beta_items, freeze=False
    )

    # Get image from top recommended item
    # top_indices[0]
    # first 221 are preferences
    # next 1000 are wardrobe
    tensor_names = None
    with open("api/TensorCodex.pkl", "rb") as f:
        tensor_names = pickle.load(f)

    # Initialize lists for each category
    category_lists = {
        "Top": [],
        "Jeans": [],
        "Shorts": [],
        "Jacket": [],
        "Skirt": [],
        "Sweater": [],
    }

    # Function to map tensor names to categories
    def map_tensor_to_category(tensor_name):
        for main_category, subcategories in combined_categories.items():
            for subcategory in subcategories:
                if subcategory.lower() in tensor_name.lower():
                    return main_category
        return None

    # Populate the category lists using top_indices
    for index in top_indices:
        tensor_name = tensor_names[index]
        category = map_tensor_to_category(tensor_name)
        category_lists[category].append(tensor_name)

    images_to_rec = []

    for i, category in enumerate(items_to_rec):
        if len(category_lists[reverse_combined_categories[category]]) == 0:
            print("Rerunning VBPR with topK:", 400)
            images_to_rec.append(run_vbpr([category], profile, 400)[0])
            continue

        tensor_specific_subset = []
        tensor_general_subset = []

        for tensor_name in category_lists[reverse_combined_categories[category]]:
            if len(tensor_specific_subset) >= 10:
                break
            if category.lower() in tensor_name.lower():
                tensor_specific_subset.append(tensor_name)
            else:
                tensor_general_subset.append(tensor_name)

        tensor_subset = (
            tensor_specific_subset
            if len(tensor_specific_subset) > 0
            else tensor_general_subset
        )
        # print("Specific Subset:", tensor_specific_subset)
        # print("General Subset:", tensor_general_subset)
        print("Tensor Subset:", tensor_subset)
        image_name = random.choice(tensor_subset)[: -len("_features.pt")] + ".jpg"
        image_path = "/images/wardrobe/" + image_name
        if image_name.count("_") > 2:
            image_path = "/images/preferences/" + image_name

        images_to_rec.append(image_path)

    return images_to_rec


@app.route("/api/get_data", methods=["POST"])
def get_data():
    data = request.get_json()

    zipcode = data["zipcode"]
    weather_data = ""
    if zipcode:
        weather_data = query_openweather(zipcode)

    plans = data["plans"]
    profile = data["profile"]
    clothing_prefs = data["clothing_prefs"]

    items_to_rec = query_gpt(weather_data, clothing_prefs, plans)

    print("Items to Recommend:", items_to_rec)
    images_to_rec = run_vbpr(items_to_rec, profile)
    print("Images to Recommend:", images_to_rec)

    return jsonify(images_to_rec)


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

    client = OpenAI(api_key=keys["OpenAI-Key"])

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
                    Unless otherwise stated, I am going outside in the daytime and normally only wear upper body outerwear under 60 degrees unless occasion or weather absolutely requires it.
                    If my plans typically require conforming to a dress code, please recommend accordingly.
                    My clothing preferences are these - {clothing_prefs}
                    What types of clothes should I wear today? Your response should include each major article of clothing I should wear with no other text. 
                    Do not give optional articles unless absolutely necessary.

                    Feminine Options:
                        Lower Body Options: Sweatpants, Skirt, Shorts, Leggings, Pants, Cutoffs
                        Upper Body Options: Top, Tee, Sweater, Blouse
                        Optional Upper Body Outerwear: Coat, Jacket, Hoodie, Blazer

                    Masculine Options:
                        Lower Body Options: Sweatpants, Shorts, Pants
                        Upper Body Options: Tee, Sweater
                        Optional Upper Body Outerwear: Coat, Jacket, Hoodie, Blazer

                    Format: "|<lower body article>|<upper body article>|<optional upper body outerwear>|"
                    Example: |Shorts|Top|Jacket| or |Pants|Tee||
                """,
            },
        ],
    )

    response = completion.choices[0].message.content
    response = response.replace("Pants", "Jeans")
    response = response.replace("Raincoat", "Coat")
    items_to_rec = [
        item.strip() for item in response.strip().split("|") if item.strip() != ""
    ]

    return items_to_rec


@app.route("/api/pref_img_filenames", methods=["GET"])
def get_pref_img_filenames():
    image_directory = "public/images/preferences"
    image_filenames = []

    for root, dirs, files in os.walk(image_directory):
        for file in files:
            if file.lower().endswith(".jpg"):
                image_filenames.append(file)

    return jsonify(image_filenames)


@app.route("/api/ward_img_filenames", methods=["GET"])
def get_ward_img_filenames():
    image_directory = "public/images/wardrobe"
    image_filenames = []

    for root, dirs, files in os.walk(image_directory):
        for file in files:
            if file.lower().endswith(".jpg"):
                image_filenames.append(file)

    return jsonify(image_filenames)
