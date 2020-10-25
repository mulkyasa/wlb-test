import React from "react";

export default function component() {
  return (
    <header>
      <div className="menu-btn">
        <span className="menu-btn__burger"></span>
      </div>

      <nav className="nav">
        <a href="/" className="brand-nav">Typography</a>
        <ul className="menu-nav">
          <li className="menu-nav__item active">
            <a href="/" className="menu-nav__link">
              Home
            </a>
          </li>
          <li className="menu-nav__item">
            <a href="/posts" className="menu-nav__link">
              Posts
            </a>
          </li>
          <li className="menu-nav__item">
            <a href="/new-post" className="menu-nav__link">
              New post
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
