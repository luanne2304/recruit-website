import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";

class EditorField extends Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "" };
    this.handleChange = this.handleChange.bind(this);
    this.textInput = React.createRef();
  }

  handleChange(html) {
    this.setState({ editorHtml: html }, () => {
      // Gọi hàm callback truyền vào qua props và chuyển dữ liệu HTML
      if (this.props.onContentChange) {
        this.props.onContentChange(html);
      }
    });
  }

  handleSubmit() {
    const editor = this.reactQuillRef.getEditor();
    this.setState({
      editorHtml: editor
    });
  }
  modules = {
    // #3 Add "image" to the toolbar
    toolbar: [
      [{ header: [ 3, false] }],
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["clean"]
    ],

    
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot" // #5 Optinal if using custom formats
  ];

  render() {
    return (
      <>
        <ReactQuill
          onChange={this.handleChange}
          theme="snow"
          style={{
            width:"700px"
          }}
          modules={this.modules}
          formats={this.formats}
          value={this.state.editorHtml}
        />
      </>
    );
  }
}

export default EditorField;