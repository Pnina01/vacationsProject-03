
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";
import logo from "../../../Assets/Images/logo.png";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <div className="LogoContainer">
        <img className="Logo" src={logo} alt="Logo" />
        <h1 className="Title">Pnina's Global Journeys</h1>
      </div>
      <div className="AuthMenuContainer">
        <AuthMenu />
      </div>
    </div>
  );
}

export default Header;

