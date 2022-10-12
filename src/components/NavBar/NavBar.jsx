import React, { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { cl_logo } from "../../res";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import "./NavBar.css";
import ConditionalList from "../ConditionalList";

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

  const pageCallback = useCallback((page) => (
    <NavLink className="nav-item nav-links fw-light" to={page.url} key={key++}>
      {page.name}
    </NavLink>
  ), []);

  const icon = expanded ? faTimes : faBars;

  return (
    <Navbar className="navbar bg-default" expand="lg" expanded={expanded}>
      <NavLink className="navbar-brand fs-1" to="/">
        <Image 
          height="90px"
          className="p-2 m-3 filter-invert" 
          src={cl_logo} 
          title="Champions League" 
        />
        Fantasy
      </NavLink>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        onClick={() => setExpanded(!expanded)}
      >
        <FontAwesomeIcon color="white" icon={icon} />
      </Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav onClick={() => expanded && setExpanded(!expanded)}>
          <ConditionalList itemCallback={pageCallback} list={pages} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
