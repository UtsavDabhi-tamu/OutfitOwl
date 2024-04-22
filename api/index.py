from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
from openai import OpenAI
import os

app = Flask(__name__)

# Allow cross-origin requests
CORS(app)


@app.route("/api/store_preferences", methods=["POST"])
def user_preferences():
    outfit_ids = request.json.get("outfit_ids")
    train_user_model(outfit_ids)

    return jsonify({"outfit_ids": outfit_ids})


def train_user_model(outfit_ids):
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

    # return jsonify(weather_data)
    return jsonify([item for item in response.split("|") if item != ""])


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

                    
                    For each article you must select an attribute for each to recommend based on my preferences.
                    Pick any of the attributes within the parenthesis for each article that makes sense.
        
                    Here are the possible options:
                    Patterns: (floral, graphic, striped, embroidered, solid)
                    Sleeve_length: (long_sleeve, short_sleeve, sleeveless)
                    Neckline: (crew_neckline, v_neckline, no_neckline)
                    Fit: (tight, loose, conventional)
                    Materials: (denim, cotton, leather, knit)

                    Format: "|<lower body article>|<upper body article>|<optional upper body outerwear>|"
                    Example: |floral cotton loose Shorts|short_sleeve v_neckline loose knit Top||
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
