import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import BlogPost from "./components/BlogPost";
import NewPost from "./components/NewPost";
import AdminSettings from "./components/AdminSettings";
import AIPost from "./components/AIPost";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="container mx-auto px-4 py-8 h-min min-h-screen ">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<BlogPost />} />
            <Route path="/newPost" element={<NewPost />} />
            <Route path="/admin" element={<AdminSettings />} />
            <Route path="/AI" element={<AIPost />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
