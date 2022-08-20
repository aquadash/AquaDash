import logging
import pandas as pd
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


def mock_monthly_trend(annual_rainfall):
    annual_average = [159.6,158.3,140.7,92.5,73.7,67.8,56.5,45.9,45.7,75.4,97.0,133.3]
    mean = sum(annual_average)/len(annual_average)
    delta = [x - mean for x in annual_average]
    return [round(annual_rainfall + x, 2) for x in delta]

def get_data():
    logging.info('Creating tree and reference data')
    rainfall_df = pd.read_csv("rainfall.csv")
    rainfall_df.columns = 'StationNumber', 'StationName', 'Region', 'Rainfall', 'Mean',\
    'Percentile', 'YearsOfData', 'Latitude', 'Longitude', 'Elevation'
    coord_tree = spatial.KDTree(rainfall_df.filter(items=["Latitude","Longitude"]))
    return rainfall_df, coord_tree