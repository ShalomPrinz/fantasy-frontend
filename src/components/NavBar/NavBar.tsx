import { useState } from "react";

import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { ConditionalList, IconComponent, ImageComponent } from "../";
import { useUser } from "../../features/authentication";
import "./NavBar.css";

interface Page {
  badge?: JSX.Element;
  id: number;
  name: string;
  url: string;
}

const navlinkClassname = "nav-item nav-links fw-light";

const pageCallback = ({ badge, name, url }: Page) => (
  <NavLink className={navlinkClassname} to={url}>
    {name}
    {badge && " "}
    {badge && badge}
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
        <ImageComponent
          height="90px"
          className="p-2 m-3 filter-invert"
          src={"NAVBAR_LOGO"}
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
    const messages = user.inbox.length;
    const badgeBg = messages ? "primary" : "secondary";
    const pages = [
      {
        id: 3,
        name: `${user.name}'s team`,
        url: "/team",
      },
      {
        id: 4,
        name: "Leagues",
        url: "/leagues",
      },
      {
        badge: <Badge bg={badgeBg}>{messages}</Badge>,
        id: 5,
        name: "Inbox",
        url: "/inbox",
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
