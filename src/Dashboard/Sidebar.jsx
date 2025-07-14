
import UserMenu from './Menu/UserMenu';
import ModeratorMenu from './Menu/ModeratorMenu';
import AdminMenu from './Menu/AdminMenu';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white p-6 shadow-lg rounded-r-3xl">
      <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>

       {/* user menu  */}
         <UserMenu/>
      {/* Moderator/Admin Section */}
     <ModeratorMenu/>

      {/* Admin Section */}
    <AdminMenu/>
    </div>
  );
};

export default Sidebar;
