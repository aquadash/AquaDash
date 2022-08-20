const Navigation = () => (
  <nav
    className="navbar is-transparent py-5"
    style={{ backgroundColor: "transparent" }}
  >
    <div className="container is-fluid">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <span className="navbar-item px-0 title is-5 has-text-dark">
            <img
              src="/logo.png"
              alt=""
              style={{ height: "28px" }}
              width="auto"
            />
          </span>
        </a>
        <a
          className="navbar-menu-open navbar-burger"
          role="button"
          type="button"
          data-toggle="side-menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <ul className="navbar-item">
            <li>
              <a className="navbar-item" href="#">
                About
              </a>
            </li>
            <li></li>
            <li></li>
            <li>
              <a className="navbar-item" href="#">
                Methodology
              </a>
            </li>
          </ul>
          <div className="navbar-item is-hidden-mobile pl-0">
            <a
              className="button is-primary has-background-danger-light has-text-danger"
              href="https://github.com/aquadash/AquaDash"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navigation;
