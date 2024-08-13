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
        justifyContent: "space-between",
        alignItems: "center",
        width:"100%",
      }}
    >
      <TextField
        margin="normal"
        fullWidth
        name={props.name}
        label={props.label}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        disabled={disableButton}
        multiline
        required
        rows = {props.rows}
        InputProps={{
          style: {
            borderRadius: 10,
            color: "primary",
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
            color='primary'
          />
        ) : (
          <EditIcon
            fontSize="inherit"
            color='primary'
          />
        )}
      </IconButton>
    </Box>
  );
};

export default EditableInput;
