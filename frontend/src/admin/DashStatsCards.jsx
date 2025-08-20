import { NavLink } from 'react-router-dom';
import { IoNewspaperSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaRocketchat } from "react-icons/fa";


export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
      <NavLink
        to="/posts"
        className="p-6 transition-shadow duration-200 bg-gray-800 rounded-lg shadow hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100">Total Posts</p>
            <p className="text-2xl font-semibold">124</p>
          </div>
          <div className="p-3 text-indigo-600 bg-indigo-100 rounded-full">
            <IoNewspaperSharp  className="w-6 h-6" />
          </div>
        </div>
      </NavLink>
      <NavLink
        to="/users"
        className="p-6 transition-shadow duration-200 bg-gray-800 rounded-lg shadow hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100">Total Users</p>
            <p className="text-2xl font-semibold">56</p>
          </div>
          <div className="p-3 text-green-600 bg-green-100 rounded-full">
            <FaUsers  className="w-6 h-6" />
          </div>
        </div>
      </NavLink>
      <NavLink
        to="/comments"
        className="p-6 transition-shadow duration-200 bg-gray-800 rounded-lg shadow hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100">Comments</p>
            <p className="text-2xl font-semibold">342</p>
          </div>
          <div className="p-3 text-blue-600 bg-blue-100 rounded-full">
            <FaRocketchat className="w-6 h-6" />
          </div>
        </div>
      </NavLink>
    </div>
  );
}