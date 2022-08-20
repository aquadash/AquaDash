import logging
import azure.functions as func
import json
from RainfallHelper import *


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        req_body = req.get_json()
        latitude = float(req_body.get('latitude'))
        longitude = float(req_body.get('longitude'))
    except TypeError:
        return func.HttpResponse("Please supply a latitude and longitude in your request body.", status_code = 400)

    logging.info(f"Coordinates = ({latitude},{longitude})")

    rainfall, tree = get_data()

    rain = Rainfall(rainfall, tree)

    annual_rain = round(rain.get_average_rainfall((latitude,longitude))/3,2)
    mock_data = mock_monthly_trend(annual_rain)
    month = [str(x) for x in range(1,13)]
    monthly_rain = dict(zip(month, mock_data))

    return func.HttpResponse(json.dumps(
        monthly_rain
    ), status_code=200)
