import { CircularProgress, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';

const TextToSpeech = ({audio, handleClick, isOn, audioPending}) => {

  return (
    audioPending ? <CircularProgress size={"15px"} color="secondary"/> :
    <IconButton onClick={handleClick} color='secondary' aria-label = {isOn ? 'turn text-to-speech off' : 'turn text-to-speech on'}>
      {isOn ?
      <>
        <VolumeOffOutlinedIcon /> 
        <audio src = {audio} autoPlay />
        </>
      
      : <VolumeUpIcon />}

    </IconButton>
  );
};
export default TextToSpeech;