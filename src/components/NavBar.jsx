import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import "./NavBar.css";

const pages = [
  {
    name: "First",
    url: "/"
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

function NavBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar className="navbar" expand="lg" expanded={expanded}>
      <NavLink className="navbar-brand fs-1" to="/">
        <Image 
          height="90px"
          className="p-2 m-3 filter-invert" 
          src="./src/res/cl_logo.png" 
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
            <NavLink className="nav-item nav-links fw-light" to={page.url}>
              {page.name}
            </NavLink>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
