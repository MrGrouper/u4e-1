import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

type Props = {
  name: string;
  type: string;
  label: string;
  value: string;
  rows: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditableInput = (props: Props) => {
  const [disableButton, setDisableButton] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <TextField
        margin="normal"
        InputLabelProps={{ style: { color: "white" } }}
        name={props.name}
        label={props.label}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        disabled={disableButton}
        multiline
        rows = {props.rows}
        InputProps={{
          style: {
            width: "400px",
            borderRadius: 10,
            fontSize: 12,
            color: "white",
          },
        }}
      />
      <IconButton
        onClick={() => setDisableButton(!disableButton)}
        size="medium"
      >
        {!disableButton ? (
          <CheckIcon
            fontSize="inherit"
            sx={{ color: "white" }}
          />
        ) : (
          <EditIcon
            fontSize="inherit"
            sx={{ color: "white" }}
          />
        )}
      </IconButton>
    </Box>
  );
};

export default EditableInput;
