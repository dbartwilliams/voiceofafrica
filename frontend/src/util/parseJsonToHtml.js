// import { generateHTML } from "@tiptap/html";
// import parse from "html-react-parser";
// import { extensions } from "../constants/tiptapExtensions";

// const parseJsonToHtml = (json) => {
//   return parse(generateHTML(json, extensions));
// };

// export default parseJsonToHtml;

import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Italic from '@tiptap/extension-italic'

const parseJsonToHtml = (json) => {
  // Validate input
  if (!json || typeof json !== 'object') {
    console.warn('Invalid JSON input for Tiptap parser');
    return parse('<p></p>');
  }

  try {
    const extensions = [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
    ];

    const html = generateHTML(json, extensions);
    return parse(html || '<p></p>');
  } catch (error) {
    console.error('Error parsing Tiptap JSON:', error);
    return parse('<p>Content could not be loaded</p>');
  }
};

export default parseJsonToHtml;