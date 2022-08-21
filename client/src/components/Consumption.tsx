import { FC } from "react";
import { Bar, BarChart, Legend, XAxis, YAxis } from "recharts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Consumption: FC<{ consumption: any; collectable: number }> = ({
  consumption,
  collectable,
}) => {
  const consumptionData: any[] = [];

  consumption.map((record: any) => {
    return consumptionData.push({
      month: months[Number(record.Month) - 1],
      consumed: Number(record.TotalConsumed) / 1000,
    });
  });

  return (
    <section className="is-relative section" style={{ overflow: "hidden" }}>
      <div className="container">
        <div className="columns is-vcentered">
          <div className="has-mw-4xl mx-auto">
            <div className="columns is-vcentered">
              <div className="column is-6 mb-8 mb-0-desktop">
                <h2 className="mb-4 title is-4">Water Consumption</h2>
                {/* <p className="mb-10">Rainfall Data</p> */}
                <p className="mb-10 is-size-5 has-text-grey-dark">
                  This is the average monthly water consumption for your suburb.
                </p>
                <p className="mb-10 is-size-5 has-text-grey-dark">
                  Every month, you could collect as much as{" "}
                  <b>{Math.round(collectable / 12)} litres</b> of water, that's{" "}
                  <b>${Math.round(0.66 * (collectable / 12))} of savings</b>.
                </p>

                <p className="mb-10 is-size-5 has-text-grey-dark">
                  With a 6-star washing machine, you can wash{" "}
                  <b>{Math.round(collectable / 30)} times</b>.. for free.
                </p>
                {/* <div>
                  <button className="button is-secondary">Keep Scolling</button>
                </div> */}
              </div>
              <div className="column is-6 mb-8 mb-0-desktop">
                <BarChart
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
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consumption;
