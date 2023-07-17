import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			
            <NavLink to="/vacations">Home</NavLink>
        </div>
    );
}

export default Menu;
