import { useCallback, useState } from "react";

import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

import { ConditionalList } from "../";
import { cl_logo } from "../../res";
import "./NavBar.css";

interface Page {
  id: number;
  name: string;
  url: string;
}

const pages = [
  {
    id: 0,
    name: "My Team",
    url: "/team",
  },
  {
    id: 1,
    name: "Register",
    url: "/register",
  },
  {
    id: 2,
    name: "Log In",
    url: "/login",
  },
];

function NavBar() {
  const [expanded, setExpanded] = useState(false);

  const pageCallback = useCallback(
    ({ name, url }: Page) => (
      <NavLink className="nav-item nav-links fw-light" to={url}>
        {name}
      </NavLink>
    ),
    []
  );

  const icon = expanded ? faTimes : faBars;
  const setNotExpanded = () => expanded && setExpanded(!expanded);

  return (
    <Navbar className="navbar bg-default" expand="lg" expanded={expanded}>
      <NavLink onClick={setNotExpanded} className="navbar-brand fs-1" to="/">
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
        <Nav onClick={setNotExpanded}>
          <ConditionalList itemCallback={pageCallback} list={pages} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
