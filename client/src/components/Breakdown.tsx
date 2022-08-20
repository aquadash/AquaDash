const Breakdown = () => (
  <section className="is-relative section" style={{ overflow: "hidden" }}>
    <div className="container">
      <div className="columns is-vcentered">
        <div className="has-mw-4xl mx-auto">
          <div className="columns is-vcentered">
            <div className="column is-6 mb-8 mb-0-desktop">
              <h2 className="mb-4 title is-4">15 Glendale Ave, Somerville</h2>
              <p className="mb-10">Residential Property</p>
              <p className="mb-10 is-size-5 has-text-grey-dark">
                It looks like this property has a roof size of roughly{" "}
                <b>1,479sqm</b>. That's ideal for rainwater harvesting!
              </p>
              <p className="mb-10 is-size-5 has-text-grey-dark">
                Because it rains about <b>3mm</b> a year here, your roof alone
                can collect <b>1,479L</b> of rainwater.
              </p>
              <div>
                <button className="button is-secondary">More Insights</button>
                {/* <a
                  className="is-inline-flex is-align-items-center is-justify-content-center mr-4 has-background-light"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                  }}
                  href="#"
                >
                  <svg
                    width="7"
                    height="12"
                    // viewbox="0 0 7 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.08986 11.8182V6.51068H5.90543L6.17782 4.44164H4.08986V3.12086C4.08986 2.52201 4.2587 2.1139 5.13522 2.1139L6.25131 2.11345V0.26283C6.0583 0.238228 5.39575 0.181824 4.62462 0.181824C3.01437 0.181824 1.91196 1.14588 1.91196 2.91594V4.44164H0.0908813V6.51068H1.91196V11.8182H4.08986Z"
                      fill="#758A99"
                    ></path>
                  </svg>
                </a>
                <a
                  className="is-inline-flex is-align-items-center is-justify-content-center mr-4 has-background-light"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                  }}
                  href="#"
                >
                  <svg
                    width="13"
                    height="11"
                    // viewbox="0 0 13 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.5454 2.09731C12.0904 2.29895 11.6021 2.43569 11.0891 2.49674C11.6129 2.18307 12.0139 1.68553 12.2039 1.0945C11.7126 1.38499 11.1702 1.59592 10.5923 1.71026C10.1296 1.21658 9.47132 0.909088 8.74122 0.909088C7.34053 0.909088 6.20483 2.04479 6.20483 3.4447C6.20483 3.64325 6.22724 3.83717 6.27051 4.0226C4.16291 3.91675 2.29405 2.90699 1.04324 1.37262C0.824591 1.74656 0.700208 2.18228 0.700208 2.64739C0.700208 3.52737 1.14831 4.30382 1.82819 4.75808C1.41253 4.74418 1.0216 4.62984 0.679359 4.43978V4.47145C0.679359 5.69986 1.55392 6.72507 2.71356 6.9584C2.5011 7.01557 2.27706 7.04725 2.04528 7.04725C1.8815 7.04725 1.72312 7.03103 1.56782 7.00012C1.89075 8.00834 2.82714 8.74151 3.93657 8.76161C3.06895 9.44149 1.97498 9.84555 0.786753 9.84555C0.582026 9.84555 0.380369 9.83319 0.181824 9.81079C1.30439 10.5316 2.6371 10.9519 4.06946 10.9519C8.73508 10.9519 11.2854 7.08743 11.2854 3.73598L11.2769 3.40763C11.7752 3.05222 12.2063 2.60567 12.5454 2.09731Z"
                      fill="#758A99"
                    ></path>
                  </svg>
                </a>
                <a
                  className="is-inline-flex is-align-items-center is-justify-content-center mr-4 has-background-light"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                  }}
                  href="#"
                >
                  <svg
                    width="14"
                    height="14"
                    // viewbox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.06713 0.454544H9.9328C11.9249 0.454544 13.5456 2.07521 13.5455 4.06716V9.93284C13.5455 11.9248 11.9249 13.5455 9.9328 13.5455H4.06713C2.07518 13.5455 0.45459 11.9249 0.45459 9.93284V4.06716C0.45459 2.07521 2.07518 0.454544 4.06713 0.454544ZM9.9329 12.384C11.2845 12.384 12.3841 11.2844 12.3841 9.93283H12.384V4.06716C12.384 2.71565 11.2844 1.61603 9.93282 1.61603H4.06715C2.71564 1.61603 1.61609 2.71565 1.61609 4.06716V9.93283C1.61609 11.2844 2.71564 12.384 4.06715 12.384H9.9329ZM3.57148 7.00007C3.57148 5.10948 5.10951 3.57142 7.00005 3.57142C8.8906 3.57142 10.4286 5.10948 10.4286 7.00007C10.4286 8.89058 8.8906 10.4286 7.00005 10.4286C5.10951 10.4286 3.57148 8.89058 3.57148 7.00007ZM4.75203 6.99999C4.75203 8.23952 5.76054 9.2479 7.00004 9.2479C8.23955 9.2479 9.24806 8.23952 9.24806 6.99999C9.24806 5.76038 8.23963 4.75192 7.00004 4.75192C5.76046 4.75192 4.75203 5.76038 4.75203 6.99999Z"
                      fill="#758A99"
                    ></path>
                  </svg>
                </a>
                <a
                  className="is-inline-flex is-align-items-center is-justify-content-center mr-4 has-background-light"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                  }}
                  href="#"
                >
                  <svg
                    width="12"
                    height="12"
                    // viewbox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8 0H1.2C0.54 0 0 0.54 0 1.2V10.8C0 11.46 0.54 12 1.2 12H10.8C11.46 12 12 11.46 12 10.8V1.2C12 0.54 11.46 0 10.8 0ZM3.6 10.2H1.8V4.8H3.6V10.2ZM2.7 3.78C2.1 3.78 1.62 3.3 1.62 2.7C1.62 2.1 2.1 1.62 2.7 1.62C3.3 1.62 3.78 2.1 3.78 2.7C3.78 3.3 3.3 3.78 2.7 3.78ZM10.2 10.2H8.4V7.02C8.4 6.54002 7.98 6.12 7.5 6.12C7.02 6.12 6.6 6.54002 6.6 7.02V10.2H4.8V4.8H6.6V5.52C6.9 5.04 7.56 4.68 8.1 4.68C9.24 4.68 10.2 5.64 10.2 6.78V10.2Z"
                      fill="#758A99"
                    ></path>
                  </svg>
                </a> */}
              </div>
            </div>
            <div className="is-relative column is-6">
              <div className="is-relative mb-10" style={{ height: "448px" }}>
                <img
                  className="image is-fullwidth is-cover is-rounded"
                  style={{ height: "448px" }}
                  src="satimg.png"
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
