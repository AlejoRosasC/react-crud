import React from "react";
import {Link} from 'react-router-dom'

export default function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" >
          GNS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/post">
                Publicaciones
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/photo">
                Fotos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/request">
                Peticiones
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
        );
}