import { Link } from "react-router-dom";
import DropDown from "./Reusable/DropDown";

const PostsTopBar = ({ setOrder }) => {
  return (
    <div className="container flex gap-2 my-2">
      <Link to={"/newPost"} className="border rounded-md px-2 py-1 self-center">
        ➕ New Post
      </Link>
      <Link to={"/admin"} className="border rounded-md px-2 py-1 self-center">
        ⚙️ Admin settings
      </Link>
      <DropDown
        onSelect={setOrder}
        options={[
          { label: "Most Recent", value: "desc?option=all" },
          { label: "Oldest", value: "asc?option=all" },
          { label: "Recent Published", value: "desc?option=published" },
          { label: "Oldest Published", value: "asc?option=published" },
          { label: "Recent Draft", value: "desc?option=draft" },
          { label: "Oldest Draft", value: "asc?option=draft" },
        ]}
        defaultOption="🔀 Order posts by:"
      />
      <Link to={"/AI"} className="border rounded-md px-2 py-1 self-center">
        ✨ New AI Post
      </Link>
    </div>
  );
};

export default PostsTopBar;
