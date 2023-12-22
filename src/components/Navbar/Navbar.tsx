import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-md">
        <Link to="/" className="navbar-brand mb-0 h1 text-white ">Contacts</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/new-contact" className="nav-link"
            >
              Add contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;