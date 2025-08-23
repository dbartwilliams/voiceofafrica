import { NavLink } from 'react-router-dom';
import {
  NewspaperIcon,
  UsersIcon,
  ChatAlt2Icon,
  ChartBarIcon
} from '@heroicons/react/outline';

const DashMobileNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 text-white bg-indigo-800 md:hidden">
      <div className="flex justify-around">
        <NavLink
          to="/"
          className={({ isActive }) => `p-4 text-center ${isActive ? 'text-indigo-200' : ''}`}
        >
          <ChartBarIcon className="w-6 h-6 mx-auto" />
          <span className="text-xs">Dashboard</span>
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) => `p-4 text-center ${isActive ? 'text-indigo-200' : ''}`}
        >
          <NewspaperIcon className="w-6 h-6 mx-auto" />
          <span className="text-xs">Posts</span>
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) => `p-4 text-center ${isActive ? 'text-indigo-200' : ''}`}
        >
          <UsersIcon className="w-6 h-6 mx-auto" />
          <span className="text-xs">Users</span>
        </NavLink>
        <NavLink
          to="/comments"
          className={({ isActive }) => `p-4 text-center ${isActive ? 'text-indigo-200' : ''}`}
        >
          <ChatAlt2Icon className="w-6 h-6 mx-auto" />
          <span className="text-xs">Comments</span>
        </NavLink>
      </div>
    </div>
  );
}
export default DashMobileNav;