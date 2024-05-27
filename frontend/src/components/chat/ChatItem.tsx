// import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
//@ts-expect-error fdas
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Utility function to escape HTML entities for security
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

const ChatItem = ({ content, role }) => {
  // Additional parsing for LaTeX goes here if needed

  if (role === 'assistant'){
  return (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        bgcolor: 'transparent',
        gap: 2,
        borderRadius: 2,
      }}
    >

      <Avatar 
      src = {window.location.origin + '/U4E-AI-Icon-cropped.png'}
      alt = 'teacher'
      />
      
      <Box>
        <Typography component="div" sx={{ fontSize: '14px' }}>
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
            p: 2,
            bgcolor: '#001e1d',
            gap: 2,
            borderRadius: 2,
          }}
        >
    
          <Avatar 
          sx={{ ml: '0', bgcolor:'black', color: 'white' }}
          
          >
          </Avatar>
          <Box>
            <Typography component="div" sx={{ fontSize: '14px' }}>
              {parseMarkdown(content)}
            </Typography>
          </Box>
        </Box>
      );
    }
};

export default ChatItem;