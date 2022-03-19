import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const CKEditorComponent = ({ onReady, onChange, onBlur, onFocus, data }) => {
  const EditorConfig = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "blockQuote",
      "link",
      "numberedList",
      "bulletedList",
      "insertTable",
      "mediaEmbed",
      "|",
      "undo",
      "redo",
    ],
    image: {
      upload: {
        panel: {
          items: ["insertImageViaUrl"],
        },
      },
    },
  };
  return (
    <>
      <CKEditor
        style={{ fontSize: "10px" }}
        data={data}
        config={EditorConfig}
        editor={ClassicEditor}
        onReady={onReady}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </>
  );
};
export default CKEditorComponent;
