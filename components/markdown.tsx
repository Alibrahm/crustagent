import React from "react";
import markdownit from "markdown-it";
import DOMPurify from "dompurify";

type Props = {
  text: string;
  role: string;
};

const md = markdownit();

const Markdown = ({ text, role }: Props) => {
  const htmlcontent = md.render(text);
  const sanitized = DOMPurify.sanitize(htmlcontent);

  // Define a style object for the container
  const userBorderStyle = {
    padding: role === "user" ? "5px 10px" : "0",
    borderRadius: role === "user" ? "10px" : "0",
    background: role === "user" ? "#48e23945" : "none",
  };

  return (
    <div style={userBorderStyle}>
      <style>
        {`
          .markdown-content pre {
            background-color: #000; /* Black background */
            color: #fff; /* White text */
            padding: 10px; /* Add some padding */
            border-radius: 5px; /* Rounded corners */
            overflow-x: auto; /* Enable horizontal scrolling */
            font-family: monospace; /* Monospace font for code blocks */
          }
        `}
      </style>
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      ></div>
    </div>
  );
};

export default Markdown;
