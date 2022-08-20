from supporting_modules.gmaps_query import gmaps_sat_image, gmaps_area_lat_long
from supporting_modules.roof_segmentation import roof_segmentation

def main(address):
    print("Segmenting Roof ...")

    # Call the Google Maps API to retrive and process sat image at address
    sat_img = gmaps_sat_image(address)

    roof_highlight_color = (255, 153, 0) # (Blue,Green,Red) format not RGB
    disp_img, area_percent = roof_segmentation(sat_img, roof_highlight_color)

    total_area, latitude, longitude = gmaps_area_lat_long(address)
    roof_surface_area_in_square_meters = round(total_area*area_percent, 2)

    # -----------------------------------------------------------------------
    #TODO: remove this once the front-end is ready
    print(f"Lat: {latitude}, Long: {longitude}")
    print(f"Roof Surface Area: {roof_surface_area_in_square_meters} m^2")

    import cv2
    cv2.imshow('Segmented Roof Top', disp_img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    # ------------------------------------------------------------------------

    return disp_img, roof_surface_area_in_square_meters, latitude, longitude



if __name__ == '__main__':
    #TODO: Insert code to retrieve address from front-end
    address = "63 Cogill Rd, Buderim QLD 4556"
    main(address)