import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const MyEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  return (
    <div className="w-full">
      <Editor
        name="content"
        apiKey={import.meta.env.VITE_TINY_API}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist | " +
            "removeformat",
        }}
      />
    </div>
  );
};

export default MyEditor;
