import { useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton } from "@mui/material";

const Recorder = ({onTranscriptChange, handleSend}) => {
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

    useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript, onTranscriptChange]);

  const handleSendClick = async() =>{
    await SpeechRecognition.stopListening()
    await handleSend()
    resetTranscript
  }
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await SpeechRecognition.stopListening()
      resetTranscript 
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <MicOffIcon color="secondary" fontSize="small" />;
  }

  return (
    <>
    { listening ? 
          <IconButton onClick={handleSendClick} color="secondary" size="small" onKeyDown={handleKeyDown}>
          <ArrowUpwardIcon />
        </IconButton>
    :
          <IconButton onClick={() => SpeechRecognition.startListening({continuous: true})} color="secondary" size="small">
          <MicIcon />
        </IconButton>

    }
    </>
  );
};
export default Recorder;
