import { FC } from "react";

const Breakdown: FC<{
  address: string;
  roofSize: number;
  rainfall: number;
  collectable: any;
  image: string;
}> = ({ address, roofSize, rainfall, collectable, image }) => (
  <section className="is-relative section" style={{ overflow: "hidden" }}>
    <div className="container">
      <div className="columns is-vcentered">
        <div className="has-mw-4xl mx-auto">
          <div className="columns is-vcentered">
            <div className="column is-6 mb-8 mb-0-desktop">
              <h2 className="mb-4 title is-4">{address}</h2>
              <p className="mb-10">Residential Property</p>
              <p className="mb-10 is-size-5 has-text-grey-dark">
                It looks like this property has a roof size of roughly{" "}
                <b>{Math.round(roofSize)}sqm</b>. That's ideal for rainwater
                harvesting!
              </p>
              <p className="mb-10 is-size-5 has-text-grey-dark">
                Because it rains about <b>{Math.round(rainfall)}mm</b> a year
                here, your roof alone can collect{" "}
                <b>{Math.round(collectable)}L</b> of rainwater.
              </p>
              <div>
                <button className="button is-secondary">More Insights</button>
              </div>
            </div>
            <div className="is-relative column is-6">
              <div className="is-relative mb-10" style={{ height: "448px" }}>
                <img
                  className="image is-fullwidth is-cover is-rounded"
                  style={{ height: "448px" }}
                  src={image}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Breakdown;
