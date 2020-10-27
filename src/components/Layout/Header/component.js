import React from "react";
import { Link } from "react-router-dom";
import routes from "../../../routes";

export default function Component() {
  return (
    <header>
      <div className="menu-btn">
        <span className="menu-btn__burger"></span>
      </div>

      <nav className="nav">
        <Link to="/" className="brand-nav">
          Blog
        </Link>
        <ul className="menu-nav">
          {routes.map((item, idx) => {
            return (
              item.name && (
                <li key={idx} className="menu-nav__item">
                  <Link to={item.path} className="menu-nav__link">
                    {item.name}
                  </Link>
                </li>
              )
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
