import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { logo } from "../assets";
import { links } from "../assets/constants";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authSlice";

const NavLinks = ({ handleClick }) => (
  <div className="mt-6">
    {links.map((item) => (
      <NavLink 
      key={item.name}
      to={item.to}
      className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'
      onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2"/>
        {item.name}
      </NavLink>
    ))}
  </div>
)

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <>
      <div className="md:flex hidden flex-col w-240 py-10 px-4 bg-[#191624]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-full h-24 object-contain"/>
        </Link>
        <div className="text-white text-base mt-8 mb-4 text-center">
          Welcome, <br/> <span className="text-white font-bold text-center">{user.name}</span>
        </div>
        <div className="text-white font-semibold text-base text-center cursor-pointer hover:text-cyan-400" onClick={handleLogout}>
          Log out
        </div>
        <NavLinks/>
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (<RiCloseLine className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(false)}/>) : (<HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)}/>)}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white to-[483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-14 object-contain"/>
        <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
      </div>
    </>
  )
};

export default Sidebar;
