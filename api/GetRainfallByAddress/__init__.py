from audioop import add
import logging
import azure.functions as func
import json
from RainfallHelper import *
from gmaps_query import gmaps_sat_image, gmaps_area_lat_long
from roof_segmentation import roof_segmentation, image_to_string
from consumption_helper import get_water_usage


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        req_body = req.get_json()
        address = req_body.get('address')
        assert type(address) == str
    except ValueError:
        return func.HttpResponse("Please supply an address in your request body.)", status_code=400)
    except AssertionError:
        return func.HttpResponse("Please supply an address in your request body.", status_code=400)

    # Call the Google Maps API to retrive and process sat image at address
    sat_img = gmaps_sat_image(address)

    roof_highlight_color = (255, 153, 0)  # (Blue,Green,Red) format not RGB
    disp_img, area_percent = roof_segmentation(sat_img, roof_highlight_color)
    segmented_img_buffer = image_to_string(disp_img)

    total_area, latitude, longitude = gmaps_area_lat_long(address)
    roof_surface_area_in_square_meters = round(total_area*area_percent, 2)

    logging.info(f"Address: {address}")
    logging.info(f"Lat: {latitude}, Long: {longitude}")
    logging.info(
        f"Roof Surface Area: {roof_surface_area_in_square_meters} m^2")

    rainfall, tree = get_data()

    rain = Rainfall(rainfall, tree)

    annual_rain = round(rain.get_average_rainfall((latitude, longitude))/3, 2)
    mock_data = mock_monthly_trend(annual_rain)
    month = [str(x) for x in range(1, 13)]
    monthly_rain = dict(zip(month, mock_data))

    monthly_consumption = get_water_usage("21270260")
    # TODO: implement check to ensure monthly data returns same # of periods

    final_result = {
        "Address": address,
        "Latitude": latitude,
        "Longitude": longitude,
        "MonthlyRainfall": monthly_rain,
        "RoofSurfaceAreaSqm": roof_surface_area_in_square_meters,
        "AnnualRainCollectionMm": round(annual_rain * roof_surface_area_in_square_meters, 2),
        "MonthlyConsumptionMm":monthly_consumption,
        "TotalCostSaving": "$TBC",
        "DisplayImage": "data:image/gif;base64," + segmented_img_buffer
    }

    return func.HttpResponse(json.dumps(
        final_result
    ), status_code=200)
