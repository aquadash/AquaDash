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
    annual_average = [101.2,119.3,131.6,126.5,117.4,133.1,96.3,80.2,68.1,76.7,83.8,77.1]
    mean = sum(annual_average)/len(annual_average)
    delta = [x - mean for x in annual_average]
    return [round(annual_rainfall/12 + x, 2) for x in delta]

def get_data():
    logging.info('Creating tree and reference data')
    rainfall_df = pd.read_csv("rainfall.csv")
    rainfall_df.columns = 'StationNumber', 'StationName', 'Region', 'Rainfall', 'Mean',\
    'Percentile', 'YearsOfData', 'Latitude', 'Longitude', 'Elevation'
    coord_tree = spatial.KDTree(rainfall_df.filter(items=["Latitude","Longitude"]))
    return rainfall_df, coord_tree