import { useEffect, useState } from "react";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Typography, Button, CircularProgress, Autocomplete, TextField, Chip } from "@mui/material";
import EditableInput from "../shared/EditableInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const languages = [
  "Mandarin Chinese", "Spanish", "English", "Hindi", "Bengali",
  "Portuguese", "Russian", "Japanese", "Western Punjabi", "Marathi",
  "Telugu", "Wu Chinese", "Turkish", "Korean", "French", "German",
  "Vietnamese", "Tamil", "Yue Chinese", "Urdu"
];

const UserInfo = () => {
  const auth = useAuth();

  const [currentUser, setCurrentUser] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      setCurrentUser(auth.user);
      setFirstname(auth.user.firstname);
      setLastname(auth.user.lastname);
      setEmail(auth.user.email);
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!firstname) return toast.error("First name required");

      if (!lastname) return toast.error("Last name required");

      if (!email) return toast.error("Email required");

      const newUserInfo = {
        ...currentUser,
        firstname,
        lastname,
        email,
        languages: selectedLanguages,
      };
      console.log(newUserInfo);
      const updatedUser = await auth?.userUpdate(newUserInfo);
      setCurrentUser(updatedUser);
      toast.success('User info updated!', { id: "updateUserInfo" });
    } catch (error) {
      console.log(error);
      toast.error('Could not update user info', { id: "updateUserInfo" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "0 auto",
        padding: "1rem",
        boxShadow: "0px 0.25px 5px 0px rgba(0,0,0,0.36)",
        borderRadius: "10px",
        maxWidth: "600px",
        width: "90%",
      }}
    >
      <Typography variant="h5" textAlign="center">
        Edit User Info
      </Typography>
      <EditableInput
        type="text"
        name="firstname"
        label="First name"
        value={firstname}
        rows={1}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <EditableInput
        type="text"
        name="lastname"
        label="Last name"
        value={lastname}
        rows={1}
        onChange={(e) => setLastname(e.target.value)}
      />
      <EditableInput
        type="email"
        name="email"
        label="Email"
        value={email}
        rows={1}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Autocomplete
        multiple
        options={languages}
        getOptionLabel={(option) => option}
        value={selectedLanguages}
        //@ts-expect-error event not used
        onChange={(event, newValue) => setSelectedLanguages(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Languages Spoken"
            placeholder="Select Languages"
            margin="normal"
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        sx={{ mt: "20px" }}
        disabled={auth?.userUpdatePending ? true : false}
        endIcon={auth?.userUpdatePending ? null : <SaveAltIcon />}
      >
        {auth?.userUpdatePending ? (
          <CircularProgress size={24} color="secondary" />
        ) : (
          "Save Edits"
        )}
      </Button>
    </form>
  );
};

export default UserInfo;
