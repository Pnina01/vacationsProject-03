import { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate, Link} from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Favorite from '@mui/icons-material/Favorite';
import Pagination from '@mui/material/Pagination';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import "./VacationList.css";

function VacationList(): JSX.Element {

    const navigate = useNavigate();
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [filterMyVacations, setFilterMyVacations] = useState<VacationModel[]>([]);
    const [filterCurrentVacations, setFilterCurrentVacations] = useState<VacationModel[]>([]);
    const [filterFutureVacations, setFilterFutureVacations] = useState<VacationModel[]>([]);
    const totalItemsPerPage = 10;
    const [page, setPage] = useState<number>(1);
    const [numOfPage, setNumOfPage] = useState<number>();
    const [checked, setChecked] = useState<string>('');
    


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    const fetchAllVacations = useCallback(() => {
        vacationService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notifyService.error(err));
    }, []);

    const fetchMyVacations = useCallback(() => {
        vacationService.getMyVacations()
            .then(filterMyVacations => {
                setFilterMyVacations(filterMyVacations);
                setChecked('myVacations');
            })
            .catch(err => notifyService.error(err));
    }, []);

    const fetchCurrentVacations = useCallback(() => {
        vacationService.getCurrentVacations()
          .then(filterCurrentVacations => {
            setFilterCurrentVacations(filterCurrentVacations);
            setChecked('currentVacations');
          })
          .catch(err => notifyService.error(err));
      }, []);
      
      const fetchFutureVacations = useCallback(() => {
        vacationService.getFutureVacations()
          .then(filterFutureVacations => {
            setFilterFutureVacations(filterFutureVacations);
            setChecked('futureVacations');
          })
          .catch(err => notifyService.error(err));
      }, []);
      

    useEffect(() => {
        if (!authService.isLoggedIn()) {
            navigate("/off-logout");
            return;
        } else {
            fetchAllVacations();
            setNumOfPage(Math.ceil(vacations.length / totalItemsPerPage));
            if (checked === 'myVacations') {
                setNumOfPage(Math.ceil(filterMyVacations.length / totalItemsPerPage));
            } else if (checked === 'currentVacations') {
                setNumOfPage(Math.ceil(filterCurrentVacations.length / totalItemsPerPage));
            } else if (checked === 'futureVacations') {
                setNumOfPage(Math.ceil(filterFutureVacations.length / totalItemsPerPage));
            }
        }
    }, [fetchAllVacations, vacations, filterMyVacations, filterCurrentVacations, filterFutureVacations, checked]);

    useEffect(() => {
        if (checked === 'myVacations') {
            fetchMyVacations();
        } else if (checked === 'currentVacations') {
            fetchCurrentVacations();
        } else if (checked === 'futureVacations') {
            fetchFutureVacations();
        } else {
            fetchAllVacations();
        }
    }, [checked, fetchAllVacations, fetchMyVacations, fetchCurrentVacations, fetchFutureVacations]);

    async function filterVacations(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedFilter = event.target.value;
        setChecked(selectedFilter);
    }

    const mainPageLink = "/vacations";

    return (
        <div className="VacationList">
            <h1> Explore Our Amazing Vacation Options</h1>

            <div className="AdminOptionsDiv">
                {authService.isAdmin() && <>
                
                    <NavLink to="/vacations/new"><AddIcon />Add Vacation</NavLink>
                    <NavLink to="/vacations/charts"><AssessmentIcon fontSize="medium" />Reports</NavLink>
                    <NavLink to="/vacations/csv"><FileDownloadOutlinedIcon/>  Download CSV file </NavLink>
                </>}
            </div>

            <div className="VacationsFilterButtons">
                {!authService.isAdmin() && (
                    <>
                        <div className="CenteredButtons">
                            <div className="FilterButton">
                                <Checkbox {...label} icon={<FavoriteBorder />} color="secondary" checkedIcon={<Favorite />} checked={checked === 'myVacations'} onChange={filterVacations} value="myVacations" className="CheckBoxFilter" />
                                <p className="MyVacations">My Vacations</p>
                            </div>

                            <div className="FilterButton">
                                <Checkbox {...label} icon={<AccessTimeIcon />} color="secondary" checkedIcon={<AccessTimeFilledIcon />} checked={checked === 'currentVacations'} onChange={filterVacations} value="currentVacations" className="CheckBoxFilter" />
                                <p className="currentVacations">Current Vacations</p>
                            </div>

                            <div className="FilterButton">
                                <Checkbox {...label} icon={<AirplaneTicketOutlinedIcon />} color="secondary" checkedIcon={<AirplaneTicketIcon />} checked={checked === 'futureVacations'} onChange={filterVacations} value="futureVacations" className="CheckBoxFilter" />
                                <p className="futureVacations">Future Vacations</p>
                            </div>
                            </div>
                            <div className="BackToMainPageLink">
                            <Link to={mainPageLink}> -Back- </Link>
          </div>
                    </>
                )}

                {checked === 'myVacations' && filterMyVacations.slice((page - 1) * totalItemsPerPage, page * totalItemsPerPage).map(v => (
                    <VacationCard key={v.vacationId} vacation={v} />
                ))}

                {checked === 'currentVacations' && filterCurrentVacations.slice((page - 1) * totalItemsPerPage, page * totalItemsPerPage).map(v => (
                    <VacationCard key={v.vacationId} vacation={v} />
                ))}

                {checked === 'futureVacations' && filterFutureVacations.slice((page - 1) * totalItemsPerPage, page * totalItemsPerPage).map(v => (
                    <VacationCard key={v.vacationId} vacation={v} />
                ))}

                 {!checked && vacations.slice((page - 1) * totalItemsPerPage, page * totalItemsPerPage).map(vac => (
                 <VacationCard key={vac.vacationId} vacation={vac} />
                        ))}
                    </div>
        
                    <Pagination count={numOfPage} page={page} onChange={handleChange} defaultPage={1} color="secondary" size="large" />
                </div>
            );
        }
        
        export default VacationList;





