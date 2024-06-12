// import React from "react";
import TextField from "@mui/material/TextField";
type Props = {
  name: string;
  type: string;
  label: string;
};
const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        style: {
          borderRadius: 10,
          color: "primary",
        },
      }}
    />
  );
};

export default CustomizedInput;