import { useState } from "react";

import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { ConditionalList, IconComponent } from "../";
import { useUser } from "../../contexts";
import { getImage } from "../../res";
import "./NavBar.css";

interface Page {
  id: number;
  name: string;
  url: string;
}

const navlinkClassname = "nav-item nav-links fw-light";

const pageCallback = ({ name, url }: Page) => (
  <NavLink className={navlinkClassname} to={url}>
    {name}
  </NavLink>
);

interface NavBarProps {
  handleLogout?: Function;
  pages: Page[];
}

function NavBar({ handleLogout, pages }: NavBarProps) {
  const [expanded, setExpanded] = useState(false);

  const icon = expanded ? "navbarExpanded" : "navbarClosed";
  const setNotExpanded = () => expanded && setExpanded(!expanded);

  return (
    <Navbar className="navbar bg-default" expand="lg" expanded={expanded}>
      <NavLink onClick={setNotExpanded} className="navbar-brand fs-1" to="/">
        <Image
          height="90px"
          className="p-2 m-3 filter-invert"
          src={getImage("NAVBAR_LOGO")}
          title="Champions League"
        />
        Fantasy
      </NavLink>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        onClick={() => setExpanded(!expanded)}
      >
        <IconComponent color="white" icon={icon} />
      </Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav onClick={setNotExpanded}>
          <ConditionalList itemCallback={pageCallback} list={pages} />
        </Nav>
        {handleLogout && (
          <Nav onClick={setNotExpanded} className="ms-auto pe-5">
            <NavLink
              className={navlinkClassname}
              to="/"
              onClick={() => handleLogout()}
            >
              <IconComponent
                className="clickable align-middle ps-0 pe-2 fs-3"
                icon="logout"
              />
              Logout
            </NavLink>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

function NavBarWrapper() {
  const { logout, user } = useUser();

  if (typeof user === "undefined") {
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

    return <NavBar pages={pages} />;
  } else {
    const pages = [
      {
        id: 0,
        name: `${user.name}'s team`,
        url: "/team",
      },
    ];

    const handleLogout = () => {
      logout();
      toast.info("Successfully logged out. Come back later!");
    };

    return <NavBar handleLogout={handleLogout} pages={pages} />;
  }
}

export default NavBarWrapper;
