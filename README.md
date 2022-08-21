# AquaDash
The official AquaDash repository for GovHack 2022

The issue of sustainable water use presents a growing challenge in Australia, driven by the increasing consumption, climate variability and low reuse. AquaDash is a water tank recommendation tool that quantifies potential water bill savings and provides personalised guidelines on what tank the user needs, based just on their address. AquaDash will empower the Sunshine Coast residents to drive more efficient, sustainable water usage for their households and for the region as a whole.

AquaDash uses Artificial Intelligence to estimate the user’s roof surface area from the Google Maps image and combine that with the water tank size guidelines to recommend a water tank size for the household. Using the rainfall data for their location in the Sunshine Coast region, the tool estimates how much water can be collected and saved by adopting the recommended water tank. By combining this information with the user household’s water consumption data from Unitywater, AquaDash quantifies and presents the potential savings the user can achieve in a personalised dashboard.

# Tackling the problem statement

The project addresses multiple problem statement elements:

__Weather and climate events and their impact on water use and infrastructure__

 * The recent drought season is a stark reminder that the scarcity of water presents an excruciating challenge for many rural Australian households, even with today’s water infrastructure capabilities. AquaDash can equip households with actionable information that can help their household become more resilient to climate extremes and anomalies.

__Water savings, analysis and reporting tools__

 * AquaDash allows the user to view their water usage history and potential water bill savings based on the recommended tank size, rainfall data and UnityWater’s tier pricing information. If required, there is a future opportunity to present this weekly.
 * An interested customer simply supplies one input (an address) and AquaDash intelligently calculated the building’s roof surface area, the annual rainfall, and how much rainwater could be captured by the roof. These insights are then presented in an accessible manner via charts and text, informing the user at every step of the way. Including, how many times an average washing machine could be run from the rainwater that can be collected. The report culminates in a tank recommendation for the property, including a direct link to the council regulation.

__Learnings from tracking and monitoring water consumption by geographic profile__

 * By linking the Managed Object ID to the household, we are able to provide an accurate overview of historical water consumption for the household and forecast the comparative savings that would come from the water tank. There is a future opportunity to utilise the postcode and suburb information to segment the water usage insights by location.
 * The use of geographic data can also help drive valuable insights to the user, such as how their consumption compares to the suburb’s average.

### Looking forward
Below is a summary of the ways in which AquaDash can be extended to provide an even better experience to the community:

* Using the ManagedObjectid-linked geographic data to give the user insights about water consumption in their area and how their household compares. By going further and exploring the use of more fine-grained household address data, we could create a social experience where the users can see how much water they are using/saving compared to their neighbours/friends on the opt-in basis, given the appropriate data privacy considerations. This would gamify the experience of consuming water, with friends aiming to meet certain consumption reduction targets (seasonally adjusted). This could potentially also be further incentivised with water discounts to be used each quarter.

* Expanding the savings information to include more household appliances that could be powered by the collected water. Allow users to register their devices (and associated energy ratings) to deduce:

 * More accurate estimations for how much the user could save by implementing a tank.
 * Track consumption changes after adding this device to their home (e.g. show the effect of different devices on consumption)
 
 # Data story and architecture
 
 ![Architecture diagram]("solution_architecture.png")

 AquaDash utilises multiple datasets and Machine Learning techniques that can be divided into three key steps:

* __Roof surface area calculation and tank size estimation:__
AquaDash leverages the Google Maps API to decode addresses into latitude and longitude. From here, we once again use it to capture a satellite image for the property used to calculate the roof's surface area. Once the surface area is exacted, we colour it in blue and overlay it over the image. This is what becomes visible to the end user as the "calculated surface area".
* __Monthly rainfall estimation for a given locale:__ Using data from the Bureau of Meteorology (BOM), we were able to source a 36month average of rainfall across all stations in Australia. We divided this by three to get a stable estimate for annual rainfall. Our API then uses this data to locate the 3 closest stations to the address entered by the user, to triangulate an estimated value for annual rainfall in the area the house is in. We then augment this by the BOM monthly average rainfall data to deduce the estimated monthly rainfall in the region. Ideally, we would source this data at a monthly level to begin with, but the approximation was made due to reduced data access/ time constraints.
* __Monthly water usage for a given Managed Object ID:__ We save the UnityWater consumption data in a storage account, and then load it into an Azure Data Explorer cluster. We the Kusto Query Language (KQL) to process the daily Unity water datasets and extract, for a given managedObjectId, the monthly water consumption for that managedObjectId. We account for both digital and integrated water meters (summation over Pulse1 typeM values for digital and /10266/0 for integrated).
