// @ts-nocheck
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import "./scss/bulma-theme.scss";

function App() {
  const [data, setData] = useState(null);

  const API_ENDPOINT =
    "https://govhack-function.azurewebsites.net/api/GetRainfallByAddress?code=OwLKUES2oFAU7PntYagZUkPERfuW5Bqv4urRji5NTJUFAzFu9KcZHw==";

  const callApi = useCallback(async () => {
    const data = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latitude: "-33.84", longitude: "151.21" }),
    }).then((res) => res.json());
    // console.log(data);
    setData(data);
  }, []);

  useEffect(() => {
    callApi();
  }, [callApi]);

  return (
    <>
      <section className="is-relative pb-5" style={{ overflow: "hidden" }}>
        <Navigation />
        <Search search={(location) => console.log("Searching", location)} />
      </section>
      <pre>{JSON.stringify(data)}</pre>
    </>
  );
}

export default App;
