import { CiBellOn } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import Image from "../components/Image";
import { getAvatarPath } from '../util/imageKitHelper';

const DashHeader = ({ setSidebarOpen }) => {
// export default function Header({ setSidebarOpen }) {
  const userState = useSelector((state) => state.user); // get auth user
  const user = userState?.userInfo;


  return (
    <header className="shadow">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            className="text-gray-500 md:hidden focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars className="w-6 h-6" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-gray-800">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 focus:outline-none">
            <CiBellOn className="w-6 h-6 text-white" />
          </button>
          <div className="relative">
            
            <button className="flex items-center focus:outline-none">
              <Image 
                className="w-8 h-8 rounded-full" 
                src={getAvatarPath(user.avatar)}
                alt={user?.name || "Admin"} 
                />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}

export default DashHeader;