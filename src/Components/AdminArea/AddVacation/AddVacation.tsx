import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import { Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./AddVacation.css";
import VerifyAdmin from "../../../Utils/VerifyAdmin";


function AddVacation(): JSX.Element {

    VerifyAdmin();

    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();

    const [arrivalDateError, setArrivalDateError] = useState<string>("");
    const [departureDateError, setDepartureDateError] = useState<string>("");

    async function send(vacation: VacationModel) {
        try {
            const now = new Date().toISOString().slice(0, 10);
            if (vacation.vacationStartDate < now) {
                setArrivalDateError("The Date passed");
                return;
            }
            setArrivalDateError("");
            if (vacation.vacationStartDate > vacation.vacationEndDate) {
                setDepartureDateError("The Arrival-date must be before Departure-date");
                return;
            }
            setDepartureDateError("");
            await vacationService.addVacation(vacation);
            notifyService.success("Vacation added successfully!");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddVacation">

            <form onSubmit={handleSubmit(send)}>

                <h2>Add Vacation</h2>

                <label>Destination:</label>
                <input type="text" className="AddInput" {...register("destination", {
                    required: { value: true, message: "Missing Destination" },
                    minLength: { value: 2, message: "Destination must be minimum 2 chars" },
                    maxLength: { value: 50, message: "Destination can't exceed 50 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.destination?.message}</span>

                <label>Description:</label>
                <textarea maxLength={300} className="AddTextarea" {...register("description", {
                    required: { value: true, message: "Missing Description" },
                    minLength: { value: 5, message: "Description must be minimum 5 chars" },
                    maxLength: { value: 300, message: "Description can't exceed 300 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.description?.message}</span>

                <label>Arrival-Date:</label>
                <input type="date" className="AddInput" {...register("vacationStartDate", {
                    required: { value: true, message: "Missing Arrival Date" }
                })} />
                <span className="SpanMessage">{formState.errors.vacationStartDate?.message}</span>
                <span className="SpanMessage">{arrivalDateError}</span>

                <label>Departure-Date:</label>
                <input type="date" className="AddInput" {...register("vacationEndDate", {
                    required: { value: true, message: "Missing Departure Date" }
                })} />
                <span className="SpanMessage">{formState.errors.vacationEndDate?.message}</span>
                <span className="SpanMessage">{departureDateError}</span>

                <label>Price:</label>
                <input type="number" step="0.01" className="AddInput" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 10000, message: "Price can't exceed 10,000" },
                })} />
                <span className="SpanMessage">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image", {
                    required: { value: true, message: "Missing image" },
                })} />
                <span className="SpanImageMessage">{formState.errors.image?.message}</span>

                <Button type="submit" className="BtnAdd" startIcon={<AddCircleIcon />}>Add</Button>

            </form>

            <div><NavLink to="/vacations">-Back-</NavLink></div>

        </div>
    );
}

export default AddVacation;