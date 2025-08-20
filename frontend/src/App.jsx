import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Contact from "./layouts/Contact";
import BlogPage from "./pages/BlogPage";
import ProfilePage from "./pages/ProfilePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import DashLayout from "./admin/DashLayout";
import Dashboard from "./admin/dashboard";
import DashPosts from "./admin/DashPosts";
import EditPost from "./admin/EditPost";
import DashUsers from "./admin/DashUsers";
import DashComments from "./admin/DashComments";
import DashCategories from "./admin/DashCategories";
import DashEditCategories from "./admin/DashEditCategories";
import DashAnalytics from "./admin/DashAnalytics";
import DashSettings from "./admin/DashSettings";

function App() {

  return (
    <div className="App">
    <Routes>
       <Route index path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/blog/:slug" element={<ArticleDetailPage />} />

      {/* Dashboard Routes - Key Fix Here */}
      <Route path="/dashboard" element={<DashLayout />}>
      <Route index element={<Dashboard />} />
        <Route path="posts">
          <Route index element={<DashPosts />} />
          <Route path="edit/:slug" element={<EditPost />} /> {/* Fixed this line */}
        </Route>
        <Route path="users" element={<DashUsers />} />
        <Route path="comments" element={<DashComments />} />
        <Route path="analytics" element={<DashAnalytics />} />
        <Route path="settings" element={<DashSettings />} />
        <Route path="categories" element={<DashCategories />} />
        <Route path="categories/edit/:slug" element={<DashEditCategories />} />
      </Route>
    </Routes>
    <Toaster />
  </div>
  )
}

export default App
