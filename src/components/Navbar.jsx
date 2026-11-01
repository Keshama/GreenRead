import { NavLink } from "react-router-dom";

export default function Navbar({ count }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="logo"> GreenRead</span>
        <nav className="nav-links">
          <NavLink to="/" end>Add Reading</NavLink>
          <NavLink to="/library">
            My Library <span className="badge">{count}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
