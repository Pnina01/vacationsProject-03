import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import { Button } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import "./UpdateVacation.css";
import VerifyAdmin from "../../../Utils/VerifyAdmin";

function UpdateVacation(): JSX.Element {

    VerifyAdmin();

    
    const navigate = useNavigate();
    const params = useParams();
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();

    const [arrivalDateError, setArrivalDateError] = useState<string>("");
    const [departureDateError, setDepartureDateError] = useState<string>("");

    useEffect(() => {
        const vacationId = +params.vacationId
        vacationService.getOneVacation(vacationId)
            .then(vacation => {

                const arrivalDate = new Date(vacation.vacationStartDate)
                arrivalDate.setDate(arrivalDate.getDate() + 1);
                const arrivalString = arrivalDate.toISOString();

                const departureDate = new Date(vacation.vacationEndDate)
                departureDate.setDate(departureDate.getDate() + 1);
                const departureString = departureDate.toISOString();

                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("vacationStartDate", arrivalString.substring(0, 10));
                setValue("vacationEndDate", departureString.substring(0, 10));
                setValue("price", vacation.price);
                setValue("followersCount", vacation.followersCount);
                setValue("isFollowed", vacation.isFollowed);
                setValue("imageName", vacation.imageName);
            })
            .catch(err => notifyService.error(err.message))

    }, []);

    async function send(vacation: VacationModel) {
        try {
            const now = new Date().toISOString().slice(0, 10);
            if (vacation.vacationStartDate < now) {
                setArrivalDateError("The Date passed");
                return;
            }
            setArrivalDateError("");
            if (vacation.vacationEndDate > vacation.vacationEndDate) {
                setDepartureDateError("The Arrival-date must be before Departure-date");
                return;
            }
            setDepartureDateError("");
            await vacationService.updateVacation(vacation);
            notifyService.success("Vacation has been updated!");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="UpdateVacation">

            <form onSubmit={handleSubmit(send)}>

                <h2>Edit Vacation</h2>

                <input type="number" hidden {...register("vacationId")} />

                <label>Destination:</label>
                <input type="text" className="EditInput" {...register("destination", {
                    required: { value: true, message: "Missing Destination" },
                    minLength: { value: 2, message: "Destination must be minimum 2 chars" },
                    maxLength: { value: 50, message: "Destination can't exceed 50 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.destination?.message}</span>

                <label>Description:</label>
                <textarea maxLength={300} className="EditTextarea" {...register("description", {
                    required: { value: true, message: "Missing Description" },
                    minLength: { value: 5, message: "Description must be minimum 5 chars" },
                    maxLength: { value: 300, message: "Description can't exceed 300 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.description?.message}</span>

                <label>Arrival Date:</label>
                <input type="date" className="EditInput" {...register("vacationStartDate", {
                    required: { value: true, message: "Missing Arrival Date" }
                })} />
                <span className="SpanMessage">{formState.errors.vacationStartDate?.message}</span>
                <span className="SpanMessage">{arrivalDateError}</span>

                <label>Departure Date:</label>
                <input type="date" className="EditInput" {...register("vacationEndDate", {
                    required: { value: true, message: "Missing Departure Date" }
                })} />
                <span className="SpanMessage">{formState.errors.vacationEndDate?.message}</span>
                <span className="SpanMessage">{departureDateError}</span>

                <label>Price:</label>
                <input type="number" step="0.01" className="EditInput" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 10000, message: "Price can't exceed 10,000" },
                })} />
                <span className="SpanMessage">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*"  {...register("image")} />

                <input type="text" hidden {...register("imageName")} />

                <input type="number" hidden {...register("followersCount")} />

                <Button type="submit" className="BtnAdd" startIcon={<DriveFileRenameOutlineIcon />}>Edit</Button>

            </form>

            <div><NavLink to="/vacations">-Back-</NavLink></div>

        </div>
    );
}

export default UpdateVacation;