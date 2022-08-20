import { FC, useState } from "react";

const Search: FC<{ search?: any }> = ({ search }) => {
  // const { ref } = usePlacesWidget({
  //   apiKey: "AIzaSyBMf82DpcHCLhnaNbdO3DtxMPVwEWB_xRQ",
  //   onPlaceSelected: (place) => console.log(place),
  // });

  const [address, setAddress] = useState("");

  return (
    <>
      <div className="section">
        <div className="columns pb-20">
          <div className="column is-12 is-7-desktop is-flex is-justify-content-center">
            <div className="px-4 mt-12">
              <div className="has-mw-xl mb-12">
                <span className="is-size-7">
                  <small className="has-text-info has-text-weight-semibold">
                    How much can you save?
                  </small>
                </span>
                <h2 className="mt-8 mb-6 mb-12-desktop title is-1 is-size-2-mobile">
                  Find the right size rain water tank.
                </h2>
                <p className="is-size-5 has-text-grey-dark">
                  Simply enter any Australian residential address and see your
                  potential rainwater collection impact.
                </p>
              </div>
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <input
                    className="input py-6"
                    type="text"
                    placeholder="e.g 5 Ross Street, Waverton 2060"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <span
                    className="is-absolute px-1 has-background-white has-text-grey-dark"
                    style={{ top: "-8px", left: "12px", fontSize: "12px" }}
                  >
                    Address
                  </span>
                </div>
                <div className="control">
                  <button
                    className="button is-primary"
                    onClick={() => search(address)}
                  >
                    Surprise Me -&gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="is-absolute is-top-0 is-right-0 mt-32 is-hidden-touch has-mw-2xl is-cover column is-4-desktop p-0"
        style={{ height: "100%", borderTopLeftRadius: "48px" }}
        src="/rainyday.jpg"
        alt=""
      />
    </>
  );
};

export default Search;
