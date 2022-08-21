import { FC } from "react";
import { Bar, BarChart, Legend, XAxis, YAxis } from "recharts";

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

// const CustomTooltip: FC<{ active?: any; payload: any; label: any }> = ({
//   active,
//   payload,
//   label,
// }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${label} : ${payload[0].value}`}</p>
//         <p className="intro">{getIntroOfPage(label)}</p>
//         <p className="desc">Anything you want can be displayed here.</p>
//       </div>
//     );
//   }

//   return null;
// };

interface IRainfall {
  month: string;
  amount: number;
}

const Rainfall: FC<{
  rainfall?: any;
  consumption: any;
  annualRainfall: number;
}> = ({ rainfall, consumption, annualRainfall }) => {
  const rainfallData: IRainfall[] = [];
  const consumptionData: any[] = [];

  Object.entries(rainfall).forEach(([key, value]) => {
    return rainfallData.push({
      month: months[Number(key) - 1],
      amount: Number(value),
    });
  });

  consumption.map((record: any) => {
    return consumptionData.push({
      month: months[Number(record.Month) - 1],
      consumed: Number(record.TotalConsumed) / 1000,
    });
  });

  return (
    <section
      className="is-relative section has-background-light"
      style={{ overflow: "hidden" }}
    >
      <div className="container">
        <div className="columns is-vcentered">
          <div className="has-mw-4xl mx-auto">
            <div className="columns is-vcentered">
              <div className="column is-6 mb-8 mb-0-desktop">
                <BarChart
                  width={400}
                  height={300}
                  data={rainfallData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Legend />
                  <Bar
                    dataKey="amount"
                    name="Rainfall (mm)"
                    barSize={15}
                    fill="#45C1FF"
                  />
                </BarChart>
              </div>
              <div className="column is-6 mb-8 mb-0-desktop">
                <h2 className="mb-4 title is-4">Average Rainfall</h2>
                {/* <p className="mb-10">Rainfall Data</p> */}
                <p className="mb-10 is-size-5 has-text-grey-dark">
                  Here is helpful rainfall chart for your area. Remember: Any
                  rain water harvested is water saved.
                </p>
                <p className="mb-10 is-size-5 has-text-grey-dark">
                  On average, it rains about{" "}
                  <b>{Math.round(annualRainfall / 12)}mm</b> per month.
                </p>
                {/* <div>
                  <button className="button is-secondary">Keep Scolling</button>
                </div> */}
                {/* <BarChart
                  width={500}
                  height={300}
                  data={consumptionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Legend />
                  <Bar
                    dataKey="consumed"
                    name="Water Consumption (liters)"
                    barSize={50}
                    fill="#45C1FF"
                  />
                </BarChart> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rainfall;
