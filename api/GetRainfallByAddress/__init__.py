import logging
import os
import azure.functions as func
import pandas as pd
import json
from scipy import spatial

class Rainfall:
    def __init__(self, rainfall, tree):
        self.tree = tree
        self.rainfall = rainfall

    def get_closest_stations_rain(self, count: int, latitude: float, longitude: float):
        """Calculates the k-many weather stations, and returns their observations of rainfall

        Args:
            count (int): Number of closest stations to return rainfall aggregation for
            latitude (float): Latitude of address
            longitude (float): Longitude of address

        Returns:
            List[float]: Returns a list of count-many stations observations
        """
        nearest_stations = self.tree.query(x = [latitude, longitude], k = count)[1]
        return [self.rainfall.iloc[station_index].Rainfall for station_index in nearest_stations]

    def get_average_rainfall(self, coords):
        rainfall_36 = self.get_closest_stations_rain(3, coords[0], coords[1])
        return sum(rainfall_36)/3.0


def get_data():
    logging.info('Creating tree and reference data')
    rainfall_df = pd.read_csv("rainfall.csv")
    rainfall_df.columns = 'StationNumber', 'StationName', 'Region', 'Rainfall', 'Mean',\
    'Percentile', 'YearsOfData', 'Latitude', 'Longitude', 'Elevation'
    coord_tree = spatial.KDTree(rainfall_df.filter(items=["Latitude","Longitude"]))
    return rainfall_df, coord_tree

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

    address_rain = round(rain.get_average_rainfall((latitude,longitude))/3,2)

    return func.HttpResponse(json.dumps({
        "YearlyRainfall": address_rain
    }), status_code=200)
