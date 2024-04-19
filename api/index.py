from flask import Flask, request
import requests
import sys

app = Flask(__name__)

@app.route('/api/get_data', methods=['POST'])
def get_data():
    data = request.get_json()
    
    zipcode = data['zipcode']
    weather_data = query_openweather(zipcode)

    plans = data['plans']

    response = query_gpt(weather_data, plans)


# METHOD TO GET WEATHER DATA
def query_openweather(zipcode):
    ''' we get the forecast for the whole day for the given zipcode '''

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

    # we pass whatever we need to gpt
    return response


# METHOD TO GET RECOMMENDATIONS FROM GPT
def query_gpt(weather_data, plans):
    # pass the data to gpt to get recommendations