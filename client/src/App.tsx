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
  TotalConsumed: number;
}
interface IApiResponse {
  Address: string;
  Latitude: number;
  Longitude: number;
  AnnualRainfall: number;
  MonthlyRainfall: Record<string, nummber>;
  RoofSurfaceAreaSqm: number;
  AnnualRainCollection: number;
  MonthlyConsumption: IMonthlyConsumption[];
  TotalCostSaving: string;
  DisplayImage: string;
  Tank?: {
    Max: number;
    Link: string;
  };
}

function App() {
  const [data, setData] = useState<IApiResponse | undefined>({
    Address: "24 Young St, Milton QLD 4064",
    Latitude: -27.4653006,
    Longitude: 153.0014803,
    AnnualRainfall: 1352.74,
    MonthlyRainfall: {
      "1": 176.8,
      "2": 175.5,
      "3": 157.9,
      "4": 109.7,
      "5": 90.9,
      "6": 85.0,
      "7": 73.7,
      "8": 63.1,
      "9": 62.9,
      "10": 92.6,
      "11": 114.2,
      "12": 150.5,
    },
    RoofSurfaceAreaSqm: 169.57,
    AnnualRainCollection: 229384.12,
    MonthlyConsumption: [
      {
        ManagedObjectid: 21270260,
        typeM: "Pulse1",
        Month: "06",
        TotalConsumed: 286470,
      },
      {
        ManagedObjectid: 21270260,
        typeM: "Pulse1",
        Month: "05",
        TotalConsumed: 243490,
      },
      {
        ManagedObjectid: 21270260,
        typeM: "Pulse1",
        Month: "04",
        TotalConsumed: 0,
      },
    ],
    TotalCostSaving: "$TBC",
    DisplayImage: "",
    Tank: {
      max: 45000,
      link: "https://example.com/tanksthatarebig",
    },
  });
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
            collectable={data?.AnnualRainCollection / 1000}
            rainfall={data?.AnnualRainfall}
            roofSize={data?.RoofSurfaceAreaSqm}
          />
          <Rainfall
            rainfall={data?.MonthlyRainfall || []}
            consumption={data?.MonthlyConsumption || []}
            annualRainfall={data?.AnnualRainfall}
          />
          <Consumption
            rainfall={data?.MonthlyRainfall || []}
            consumption={data?.MonthlyConsumption || []}
            collectable={data?.AnnualRainCollection / 1000}
          />
          <TankSize size={45000} regulation={"https://www.example.com"} />
        </>
      )}
    </>
  );
}

export default App;
