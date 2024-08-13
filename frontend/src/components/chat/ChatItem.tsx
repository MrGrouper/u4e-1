<<<<<<< HEAD
// import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
//@ts-expect-error fdas
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import CustomAvatar from '../shared/CustomAvatar';
=======
// import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
>>>>>>> parent of 142c3b5 (working locally models slightly updated.)

// Utility function to escape HTML entities for security
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

<<<<<<< HEAD
const renderFormattedText = (text) => {
  // Here we escape HTML to prevent XSS attacks since we're using dangerouslySetInnerHTML
  // Convert line breaks to <br> for proper multiline display
  return { __html: escapeHtml(text).replace(/\n/g, '<br>') };
};

const parseMarkdown = (content) => {
  // Perform initial escaping and line break handling
  const renderedText = renderFormattedText(content);

  // Here we would perform replacements on `renderedText.__html` for Markdown syntax
  // Example for bold text: Replace **text** with <b>text</b>
  renderedText.__html = renderedText.__html
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold **text**
    .replace(/\*(.*?)\*/g, '<i>$1</i>') // Italic *text*
    .replace(/`(.*?)`/g, `<code>$1</code>`) // Inline code `code`
    .replace(/\[([^\]]+?)\]\((.*?)\)/g, `<a href="$2" target="_blank">$1</a>`) // Links [text](url)
    .replace(/^>\s*(.*)$/gm, `<blockquote>$1</blockquote>`); // Blockquotes > text

  // For headings, bullet and numbered lists, more complex parsing would be needed, potentially a recursive approach
  
  return <span dangerouslySetInnerHTML={renderedText} />;
};

const ChatItem = ({ content, role, currentUser }) => {
  // Additional parsing for LaTeX goes here if needed

  if (role === 'assistant'){
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        borderRadius: 2,
        maxWidth:"800px",
        padding: "0px 10px 0px 10px"
      }}
    >

      <Avatar 
      src = {window.location.origin + '/U4E-AI-Icon-cropped.png'}
      alt = 'teacher'
      sx={{height:"24px", width:"24px"}}
      />
      
      <Box
=======
function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}
const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant" | "system";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
//   return role == "assistant" ? (
//     <Box
//       sx={{
//         display: "flex",
//         p: 2,
//         bgcolor: "#004d5612",
//         gap: 2,
//         borderRadius: 2,
//         my: 1,
//       }}
//     >
//       <Avatar sx={{ ml: "0" }}>
//         <img src="openai.png" alt="openai" width={"30px"} />
//       </Avatar>
//       <Box>
//         {!messageBlocks && (
//           <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
//         )}
//         {messageBlocks &&
//           messageBlocks.length &&
//           messageBlocks.map((block) =>
//             isCodeBlock(block) ? (
//               <SyntaxHighlighter style={coldarkDark} language="javascript">
//                 {block}
//               </SyntaxHighlighter>
//             ) : (
//               <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
//             )
//           )}
//       </Box>
//     </Box>
//   ) : (
    // <Box
    //   sx={{
    //     display: "flex",
    //     p: 2,
    //     bgcolor: "#004d56",
    //     gap: 2,
    //     borderRadius: 2,
    //   }}
    // >
    //   <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
    //     {auth?.user?.name[0]}
    //     {auth?.user?.name.split(" ")[1][0]}
    //   </Avatar>
    //   <Box>
    //     {!messageBlocks && (
    //       <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
    //     )}
    //     {messageBlocks &&
    //       messageBlocks.length &&
    //       messageBlocks.map((block) =>
    //         isCodeBlock(block) ? (
    //           <SyntaxHighlighter style={coldarkDark} language="javascript">
    //             {block}
    //           </SyntaxHighlighter>
    //         ) : (
    //           <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
    //         )
    //       )}
    //   </Box>
    // </Box>
//   );
if (role == "assistant") {
  return(<Box
>>>>>>> parent of 142c3b5 (working locally models slightly updated.)
          sx={{
            display:"flex",
            flexDirection:"column"
          
          }}
          >
            <Typography variant='h6'>AI Teacher</Typography>
            <Typography variant='body1'>
              {parseMarkdown(content)}
            </Typography>
          </Box>
    </Box>
  );
    }
    else {
      return (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            borderRadius: 2,
            maxWidth:"800px",
            padding: "0px 10px 0px 10px"
          }}
        >
    
          <CustomAvatar 
          firstName={currentUser.firstname}
          lastName={currentUser.lastname}
          avatarUrl = {currentUser.avatarUrl}
          size={24}
          >
          </CustomAvatar>
          <Box
          sx={{
            display:"flex",
            flexDirection:"column"
          
          }}
          >
            <Typography variant='h6'>{currentUser.firstname}</Typography>
            <Typography variant='body1'>
              {parseMarkdown(content)}
            </Typography>
          </Box>
<<<<<<< HEAD
        </Box>
      );
    }
=======
        </Box>)
}
else if (role == "user") {
  return(<Box
    sx={{
      display: "flex",
      p: 2,
      bgcolor: "#004d56",
      gap: 2,
      borderRadius: 2,
    }}
  >
    <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
      {auth?.user?.name[0]}
      {auth?.user?.name.split(" ")[1][0]}
    </Avatar>
    <Box>
      {!messageBlocks && (
        <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
      )}
      {messageBlocks &&
        messageBlocks.length &&
        messageBlocks.map((block) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter style={coldarkDark} language="javascript">
              {block}
            </SyntaxHighlighter>
          ) : (
            <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
          )
        )}
    </Box>
  </Box>)

}
else return
>>>>>>> parent of 142c3b5 (working locally models slightly updated.)
};

export default ChatItem;