import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import logo from "../res/cl_logo.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import "./NavBar.css";

const pages = [
  {
    name: "My Team",
    url: "/team"
  },
  {
    name: "Second",
    url: "/"
  },
  {
    name: "Third",
    url: "/"
  }
]

let key = 0;

function NavBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar className="navbar bg-default" expand="lg" expanded={expanded}>
      <NavLink className="navbar-brand fs-1" to="/">
        <Image 
          height="90px"
          className="p-2 m-3 filter-invert" 
          src={logo} 
          title="Champions League" 
        />
        Fantasy
      </NavLink>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded && <FontAwesomeIcon color="white" icon={faTimes} />}
        {!expanded && <FontAwesomeIcon color="white" icon={faBars} />}
      </Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav
          onClick={() => {
            if (expanded) setExpanded(!expanded);
          }}
        >
          {pages.map((page) => (
            <NavLink className="nav-item nav-links fw-light" to={page.url} key={key++}>
              {page.name}
            </NavLink>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
