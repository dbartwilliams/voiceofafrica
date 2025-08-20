import { NavLink } from 'react-router-dom';
import { IoNewspaperSharp, IoAnalytics } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaRocketchat } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { TbCategory } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Image from "../components/Image";
import { getAvatarPath } from '../util/imageKitHelper';


import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { createPost } from "../services/index/posts";
import { images } from "../constants";


  const DashSidebar = ({ sidebarOpen, setSidebarOpen }) => {

    const navigate = useNavigate();
    const userState = useSelector((state) => state.user);
    const user = userState?.userInfo;
    const queryClient = useQueryClient();

  
    const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
      useMutation({
        mutationFn: ({ token }) => {
          return createPost({
            token,
          });
        },                           
        onSuccess: (data) => {
          queryClient.invalidateQueries(["posts"]);
          toast.success("Post is created, edit that now!");
          navigate(`/dashboard/posts/edit/${data.slug}`);
        },
        onError: (error) => {
          toast.error(error.message);
          console.log(error);
        },
      });
  
  
      const handleCreateNewPost = ({ token }) => {
        mutateCreatePost({ token });
      };
  return (
    <div className={`${sidebarOpen ? 'block' : 'hidden'} md:flex md:flex-shrink-0`}>
      <div className="flex flex-col w-64 text-white bg-gray-800">
        <div className="flex items-center justify-center h-16 px-4 bg-gray-800 border-b border-gray-700">
        
        <Link to="/">
          <span className="text-xl font-semibold">
          <img className="w-40" src={images.FooterLogo} alt="logo" />
          </span>
        </Link>

        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {/* Dashboard - Should match your index route */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded ${
                isActive ? 'bg-[#5eeccc] text-black' : 'hover:text-[#1be415] text-gray-200'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <GoCommentDiscussion className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>

          {/* Posts */}
          <NavLink
            to="/dashboard/posts"
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-lg ${
                isActive ? 'bg-gray-700 text-white' : 'hover:text-[#1be415] text-gray-200'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <IoNewspaperSharp className="w-5 h-5 mr-3" />
            Posts
          </NavLink>

          {/* Users */}
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-lg ${
                isActive ? 'bg-gray-700 text-white' : 'hover:text-[#1be415] text-gray-200'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaUsers className="w-5 h-5 mr-3" />
            Users
          </NavLink>

          {/* Comments */}
          <NavLink
            to="/dashboard/comments"
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-lg ${
                isActive ? 'bg-gray-700 text-white' : 'hover:text-[#1be415] text-gray-200'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaRocketchat className="w-5 h-5 mr-3" />
            Comments
          </NavLink>

          {/* Categories */}
            <NavLink
            to="/dashboard/categories"
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-lg ${
                isActive ? 'bg-gray-700 text-white' : 'hover:text-[#1be415] text-gray-200'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <TbCategory className="w-5 h-5 mr-3" />
            Categories
          </NavLink>

          {/* Analytics */}
          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-lg ${
                isActive ? 'bg-gray-700 text-white' : 'hover:text-[#1be415] text-gray-200'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <IoAnalytics className="w-5 h-5 mr-3" />
            Analytics
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-lg ${
                isActive ? 'bg-gray-700 text-white' : 'hover:text-[#1be415] text-gray-200'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <IoMdSettings className="w-5 h-5 mr-3" />
            Settings
          </NavLink>

          <button 
              disabled={isLoadingCreatePost}
              onClick={() =>
                handleCreateNewPost({ token: userState.userInfo.token })
              }
            className="px-5 py-2 mt-5 ml-7 text-black transition-colors duration-200 bg-[#5eeccc] rounded hover:bg-[#1be415] cursor-pointer">
              New Post
            </button>
          </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            
            <Image 
               className="w-10 h-10 rounded-full" 
               src={getAvatarPath(user.avatar)}
               alt={user?.name || "Admin"} 
               />
            <div className="ml-3">
            <p className="text-sm font-medium">{user?.name || "Admin User"}</p>
            <p className="text-xs text-indigo-200">{user?.email || "admin@example.com"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashSidebar;



