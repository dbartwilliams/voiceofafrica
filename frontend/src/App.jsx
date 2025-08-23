import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Contact from "./layouts/Contact";
import BlogPage from "./pages/BlogPage";
import ProfilePage from "./pages/ProfilePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

import DashLayout from "./admin/DashLayout";
import Dashboard from "./admin/Dashboard";
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
        {/* Top-level routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<Contact />} />

        {/* Dashboard nested routes */}
        <Route path="/dashboard" element={<DashLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="comments" element={<DashComments />} />
          <Route path="posts" element={<DashPosts />} />
          <Route path="posts/edit/:slug" element={<EditPost />} />
          <Route path="categories" element={<DashCategories />} />
          <Route path="categories/edit/:slug" element={<DashEditCategories />} />
          <Route path="users" element={<DashUsers />} />
          <Route path="analytics" element={<DashAnalytics />} />
          <Route path="settings" element={<DashSettings />} />
        </Route>

        {/* Fallback 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
