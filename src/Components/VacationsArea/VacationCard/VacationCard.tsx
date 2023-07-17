import { SyntheticEvent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import "./VacationCard.css";
import { vacationStore } from "../../../Redux/VacationState";
import appConfig from "../../../Utils/config";



interface VacationCardProps {
    vacation: VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();
    const navigate = useNavigate();

    function convertDate(date: string): string {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    useEffect(() => {
        const selectedVacation = vacationStore.getState().vacations.find(v => v.vacationId === props.vacation.vacationId);
        setVacation(selectedVacation);

        const unsubscribe = vacationStore.subscribe(() => {
            const newVacation = { ...vacationStore.getState().vacations.find(v => v.vacationId === props.vacation.vacationId) };
            setVacation(newVacation);
        });

       
        return () => {
            unsubscribe();
        }
    }, []);

    async function addOrRemoveFollow(args: SyntheticEvent) {
        try {
            if (!authService.isLoggedIn()) {
                navigate("/login");
                return;
            }
            const target = args.target as HTMLInputElement;
            let value = target.checked;

            if (value === true) {
                await vacationService.AddFollow(vacation.vacationId);
                return;
            }

            if (value === false) {
                await vacationService.deleteFollow(vacation.vacationId);
                return;
            }
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    async function deleteVacation(vacationId: number) {
        try {
            if (authService.isAdmin()) {

                const iAmSure = window.confirm("Are you sure you want to delete this vacation?");
                if (!iAmSure) return;
                console.log(vacationId)
            await vacationService.deleteVacation(vacationId);
            notifyService.success("Vacation has been deleted");
            navigate("/vacations");
        } else {
            notifyService.error("Access denied. You need admin permissions to delete vacations.");
        }
        
        }
        catch (err: any) {
            notifyService.error(err)
        }
    }

   

    return (
        <div className="VacationCard">
            {vacation && <>
                <div className="Card">

    
                    <img  src={appConfig.imagesUrl + props.vacation.imageName}/>
                    
                    <div className="Details">
                        <p className="Destination">{vacation.destination}</p>
                        <p className="Description">{vacation.description}</p>
                        <span>Dates: {convertDate(vacation.vacationStartDate)} - {convertDate(vacation.vacationEndDate)}</span>
                        <p className="Price">Price: ${vacation.price} USD</p>
                    </div>

                    {!authService.isAdmin() && <>
                        <div className="CheckboxDiv">
                            <label className="Switch">
                                <input type="checkbox" checked={vacation.isFollowed} onChange={addOrRemoveFollow} className={vacation.isFollowed ? "Unfollow" : "Follow"} />
                                <span className={`Slider Round ${vacation.isFollowed ? "Unfollow" : "Follow"}`}>{vacation.isFollowed ? "Unfollow" : "Follow"}</span>
                            </label>
                            <div className="DivFollowCount">
                                <span className="TextCountFollow">{vacation.followersCount}</span>
                            </div>
                        </div>
                    </>}

                    {authService.isAdmin() && <>
                        <div className="BtnAdminDiv">
                            <IconButton>
                                <NavLink to={`/vacations/edit/${vacation.vacationId}`}><EditIcon color="secondary" /></NavLink>
                            </IconButton>
                            <IconButton aria-label="delete" color="secondary" onClick={() => { deleteVacation(vacation.vacationId) }}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </>}
                </div>
            </>}
        </div>
    );
}

export default VacationCard;

