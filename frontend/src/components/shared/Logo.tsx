import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "2px",
      }}
    >
      <Link to={"/"}>
        <img
          src={"https://storage.googleapis.com/u4e/assets/artificial-intelligence-34.svg"}
          alt="openai"
          width={"40px"}
          height={"40px"}
          className="image-inverted"
        />
      </Link>
      <Typography
      color="info.main"
        sx={{
          // display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
        }}
      >
        <span style={{ fontSize: "20px", color:"success.main" }}>U4E</span>ducation
      </Typography>
    </div>
  );
};

export default Logo;