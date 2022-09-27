import React from "react";
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary p-3">
      <Image height="100px" src="./src/res/cl_logo.png" title="Champions League" />
      <Link className="navbar-brand mx-5" to="/"> Home </Link>
    </nav>
  );
};

export default NavBar;
