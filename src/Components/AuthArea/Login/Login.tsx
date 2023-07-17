import { TextField, Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome back!");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>

                <h2>Login</h2>

                <TextField label="Username" type="text" variant="outlined" className="TextBox" {...register("username", {
                    required: { value: true, message: "Missing username!" },
                    minLength: { value: 4, message: "username must be minimum 4 chars" },
                    maxLength: { value: 100, message: "username can't exceed 100 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.username?.message}</span>


                <TextField label="password" type="password" variant="outlined" className="TextBox" {...register("password", {
                    required: { value: true, message: "Missing password!" },
                    minLength: { value: 4, message: "password must be minimum 4 chars" },
                    maxLength: { value: 100, message: "password can't exceed 100 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.password?.message}</span>

                <Button type="submit" className="Btn" startIcon={<LoginIcon fontSize="medium" />}>Login</Button>

            </form>

        </div>
    );
}

export default Login;