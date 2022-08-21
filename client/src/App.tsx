// @ts-nocheck
import { useCallback, useState } from "react";
import ReactLoading from "react-loading";
import "./App.css";
import Breakdown from "./components/Breakdown";
import Consumption from "./components/Consumption";
import Estimate from "./components/Estimate";
import Navigation from "./components/Navigation";
import Rainfall from "./components/Rainfall";
import Search from "./components/Search";
import TankSize from "./components/TankSize";
import "./scss/bulma-theme.scss";

interface IMonthlyConsumption {
  ManagedObjectid: number;
  Month: string;
  typeM: string;
  TotalConsumed: number;
}
interface IApiResponse {
  Address: string;
  Latitude: number;
  Longitude: number;
  AnnualRainfall: number;
  MonthlyRainfall: Record<string, nummber>;
  RoofSurfaceAreaSqm: number;
  AnnualRainCollectionMm: number;
  MonthlyConsumption: IMonthlyConsumption[];
  TotalCostSaving: string;
  DisplayImage: string;
  Tank?: {
    Max: number;
    Link: string;
  };
}

const regulationLinks = [
  "https://www.sunshinecoast.qld.gov.au/Development/Building-and-Plumbing/Rainwater-Tanks",
  "https://www.moretonbay.qld.gov.au/files/assets/public/services/building-development/building-plumbing/building-approval-requirements-fact-sheet.pdf",
  "https://www.noosa.qld.gov.au/planning-development/building-plumbing/stormwater-water-collection#:~:text=Rainwater%20Tanks,plumbing%20approval%20is%20not%20required.",
  "https://www.scenicrim.qld.gov.au/downloads/file/4120/guideline-for-rainwater-tanks-fact-sheet",
];

function App() {
  const [data, setData] = useState<IApiResponse | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_ENDPOINT =
    "https://govhack-function.azurewebsites.net/api/GetRainfallByAddress";

  const callApi = useCallback(async (searchString) => {
    setIsLoading(true);
    const data = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: searchString,
      }),
    })
      .then((res) => res.json())
      .finally(() => setIsLoading(false));
    setData(data);
  }, []);

  return isLoading ? (
    <section className="hero is-fullheight has-background-dark">
      <div className="hero-body has-text-centered columns">
        <div className="column is-vcentered is-flex-direction-row">
          <ReactLoading
            type="bars"
            color="#FF4564"
            height={"20%"}
            width={"20%"}
          />
          <span className="has-text-light is-4 subtitle is-flex">
            Calculating your cost savings...
          </span>
        </div>
      </div>
    </section>
  ) : (
    <>
      <section className="is-relative pb-5" style={{ overflow: "hidden" }}>
        <Navigation />
        <Search
          search={(location) => {
            callApi(location);
          }}
        />
      </section>
      {data && (
        <>
          <Estimate savings={data?.TotalCostSaving} />
          <Breakdown
            address={data?.Address}
            image={data?.DisplayImage || "satimg.png"}
            collectable={data?.AnnualRainCollectionMm / 1000}
            rainfall={data?.AnnualRainfall}
            roofSize={data?.RoofSurfaceAreaSqm}
          />
          <Rainfall
            rainfall={data?.MonthlyRainfall || []}
            consumption={data?.MonthlyConsumptionMm || []}
            annualRainfall={data?.AnnualRainfall}
          />
          <Consumption
            rainfall={data?.MonthlyRainfall || []}
            consumption={data?.MonthlyConsumptionMm || []}
            collectable={data?.AnnualRainCollectionMm / 1000}
          />
          <TankSize
            size={45000}
            regulation={
              regulationLinks[
                Math.floor(Math.random() * regulationLinks.length)
              ]
            }
          />
        </>
      )}
    </>
  );
}

export default App;
