import { FC } from "react";

const TankSize: FC<{ size: any; regulation: string }> = ({
  size,
  regulation,
}) => (
  <section className="is-relative section py-20 py-40-desktop has-background-info-light">
    <img
      className="is-absolute is-left-0 is-top-0 mt-24 is-hidden-touch"
      src="/yellow-dot-left-bars.svg"
      alt=""
    />
    <img
      className="is-absolute is-right-0 is-top-0 mt-52 is-hidden-touch"
      src="/yellow-dot-left-bars.svg"
      alt=""
    />
    <div className="container">
      <div className="has-mw-3xl mx-auto has-text-centered">
        <span className="is-size-7">
          <small className="has-text-info has-text-weight-semibold">
            Our Recommendation
          </small>
        </span>
        <h2 className="mt-8 mb-10 title is-2">
          Max Tank Size: {new Intl.NumberFormat("en-NZ").format(size)}L
        </h2>
        <p className="mb-12 is-size-5 has-text-grey-dark">
          This is an estimate based on the data you have supplied to us. Always
          check with your local council and seek professional advice before
          making any decision.
        </p>
        <div className="buttons is-centered">
          <a className="button is-primary" href={regulation}>
            View Council Regulation
          </a>
          <a className="button is-dark is-outlined" href="/">
            Back to Top
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default TankSize;
