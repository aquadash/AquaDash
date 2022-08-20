import cv2
import urllib.request
from io import BytesIO
import numpy as np
import requests
import math
import os

API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

def gmaps_sat_image(location, zoom=19, size=[300,300]):
    """_summary_: Returns a satellite image of the location specified using Google's Static Maps API

    Args:
        location (_type_): Address to look up
        zoom (int, optional): Map zoom level as per Docs at: https://developers.google.com/maps/documentation/maps-static/start#Zoomlevels. Defaults to 19.
        size (list, optional): Image size in pixels. Defaults to [300,300].

    Returns:
        cv2.img: Static satellite image of the location
    """
    location = location.replace(" ", "+")
    image_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + location + "&zoom=" + str(zoom) + "&size=" + str(size[0]) + "x" + str(size[1]) + "&maptype=satellite&key=" + API_KEY
    requested_url = urllib.request.urlopen(image_url)
    image_array = np.asarray(bytearray(requested_url.read()), dtype=np.uint8)
    img = cv2.imdecode(image_array, -1)
    return img

def gmaps_area_lat_long(location, zoom=19, size=[300,300]): 
    """_summary_: Returns the latitude and longitude of the top left and bottom right corners of the image returned by gmaps_sat_image

    Args:
        location (_type_): Address to look up
        zoom (int, optional): Map zoom level as per Docs at: https://developers.google.com/maps/documentation/maps-static/start#Zoomlevels. Defaults to 19.
        size (list, optional): Image size in pixels. Defaults to [300,300].

    Returns:
        area: Area of the image coverage
        lat: Latitude of the location
        long: Longitude of the location
    """
    location = location.replace(" ", "+")
    response = requests.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + API_KEY)
    resp_json_payload = response.json()
    lat = resp_json_payload['results'][0]['geometry']['location']['lat']
    lon = resp_json_payload['results'][0]['geometry']['location']['lng']
    metersPerPx = 156543.03392 * math.cos(lat*math.pi/180)/math.pow(2,zoom)
    area = size[0]*size[1]*metersPerPx**2
    return area, lat, lon #map area in meters squared