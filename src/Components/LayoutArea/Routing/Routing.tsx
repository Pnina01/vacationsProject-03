import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import PageNotFound from "../PageNotFound/PageNotFound";
import VacationList from "../../VacationsArea/VacationsList/VacationList";
import AddVacation from "../../AdminArea/AddVacation/AddVacation";
import UpdateVacation from "../../AdminArea/UpdateVacation/UpdateVacation";
import FollowersChart from "../../AdminArea/FollowersChart/FollowersChart";
import CsvFile from "../../AdminArea/CsvFile/CsvFile";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/off-logout" element={<Logout off={true}/>}/>
                <Route path="/logout" element={<Logout off={false} />} />
                <Route path="/vacations" element={<VacationList/>} />
                <Route path="/vacations/new" element={<AddVacation/>} />
                <Route path="/vacations/edit/:vacationId" element={<UpdateVacation/>} />
                <Route path="/vacations/charts" element={<FollowersChart/>} />
                <Route path="/csv" element={ <CsvFile />}></Route>
                <Route path="/" element={<Navigate to="/vacations" />} />
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
