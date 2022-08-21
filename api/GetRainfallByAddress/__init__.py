from audioop import add
import logging
import azure.functions as func
import json
from RainfallHelper import *
from gmaps_query import gmaps_sat_image, gmaps_area_lat_long
from roof_segmentation import roof_segmentation
from consumption_helper import get_water_usage

def calc_water_savings(roof_size, avg_rainfall):
    return roof_size * avg_rainfall # sqm * mm = L

def potential_savings(monthly_consumption, annual_rain, roof_surface_area_in_square_meters):

    # Get how much water we can save
    water_harvest_potential = calc_water_savings(roof_surface_area_in_square_meters, annual_rain) # in litres

    # Calculate average daily consumption
    avg_usage = []
    for month in monthly_consumption:
        avg_usage.append(month["TotalConsumed"]/30)
    avg_usage = sum(avg_usage)/len(avg_usage)

    # calculate potiential savings
    # NOTE: 822L threshold is based on UnityWater's pricing tiers
    potential_savings =  water_harvest_potential * 0.667 if (avg_usage < 823) else water_harvest_potential * 1.333

    return potential_savings, water_harvest_potential


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

    # Water savings
    predicted_savings_potential, water_harvest_potential = potential_savings(monthly_consumption, annual_rain, roof_surface_area_in_square_meters)

    final_result = {
        "Address": address,
        "Latitude": latitude,
        "Longitude": longitude,
        "MonthlyRainfall": monthly_rain,
        "RoofSurfaceAreaSqm": roof_surface_area_in_square_meters,
        "AnnualRainCollectionMm": water_harvest_potential,
        "MonthlyConsumptionMm":monthly_consumption,
        "TotalCostSaving": "$" + str(round(predicted_savings_potential, 2)),
        "DisplayImage": "TBC_StringBuffer"
    }

    return func.HttpResponse(json.dumps(
        final_result
    ), status_code=200)
