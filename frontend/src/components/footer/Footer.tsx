import React from "react";
import { Link } from "react-router-dom";
import Logo from "../shared/Logo";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          backgroundColor: "#031B39",
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div
        style={{
          height: "100%",
          display: 'flex',
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Logo />
        </div>
        <div>
          <p>Contact</p>
          <p>About</p>
          <p>Contribute</p>
        </div>
        </div>
    </footer>
  );
};

export default Footer;