from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)

# Allow cross-origin requests
CORS(app)


@app.route('/api/store_preferences', methods=['POST'])
def user_preferences():
    outfit_ids = request.json.get('outfit_ids')
    train_user_model(outfit_ids)

    return jsonify({'outfit_ids': outfit_ids})


def train_user_model(outfit_ids):
    pass


@app.route('/api/get_data', methods=['POST'])
def get_data():
    data = request.get_json()
    
    zipcode = data['zipcode']
    weather_data = query_openweather(zipcode)

    plans = data['plans']

    response = query_gpt(weather_data, plans)

    return jsonify(weather_data)


# METHOD TO GET WEATHER DATA
def query_openweather(zipcode):
    ''' get the forecast for the whole day for the given zipcode '''

    WEATHER_API_KEY = 'e31953beb2e64692b8b213507241904'
    END_POINT = f"https://api.weatherapi.com/v1/forecast.json?key={WEATHER_API_KEY}&q={zipcode}&days=1"

    r = requests.get(END_POINT)
    response = r.json()["forecast"]["forecastday"][0]["day"]

    # we get the following data from this endpoint
    '''
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
    '''

    data_to_pass = {
        "avg_temp_f": response["avgtemp_f"],
        "max_wind_mph": response["maxwind_mph"],
        "total_precip_mm": response["totalprecip_mm"],
        "total_snow_cm": response["totalsnow_cm"],
        "avg_humidity": response["avghumidity"],
        "chance_of_rain_precent": response["daily_chance_of_rain"],
        "chance_of_snow_percent": response["daily_chance_of_snow"],
        "condition": response["condition"]["text"],
        "uv_index": response["uv"]
    }

    return data_to_pass


# METHOD TO GET RECOMMENDATIONS FROM GPT
def query_gpt(weather_data, plans):
    ''' pass on the weather data for the day and special plans to ask GPT to recommend outfits '''

    GPT_API_KEY = 'sk-proj-d8p1CLVDyQ5NofxlQcM8T3BlbkFJbF9U38go8skHt1AOsn8S'
    END_POINT = 'https://api.openai.com/v1/completions'

    CLOTHING_CATEGORIES = ['Blazer', 'Blouse', 'Hoodie', 'Jacket', 'Sweater', 'Tee', 'Top',
                       'Cutoffs', 'Jeans', 'Leggings', 'Shorts', 'Skirt', 'Sweatpants', 'Coat']

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GPT_API_KEY}"
    }

    prompt = f'''
        We have this clothing categories {CLOTHING_CATEGORIES} and 
        the area where user is situated has the following weather forecast {weather_data} for the day
        What would you 
    '''

    data = {
        "model": "text-davinci-003",
    }
