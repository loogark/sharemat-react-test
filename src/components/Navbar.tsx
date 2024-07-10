import { Logo } from "../assets/Logo";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-logo'>
        <Logo />
      </div>
      <div className='navbar-title'>
        <h1>Test For ShareMat</h1>
      </div>
    </nav>
  );
};
