
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     
      <Navbar />
      
      
      <div className="flex-1 relative">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;