import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";
import jwtDecode from "jwt-decode";
import appConfig from "../Utils/config";
import RoleModel from "../Models/RoleModel";

class AuthService {

   
    public async register(user: UserModel): Promise<void> {
    const response = await axios.post<string>(`${appConfig.authUrl}/register`, user);
     const token = response.data;
     const action: AuthAction = { type: AuthActionType.Register, payload: token };
        authStore.dispatch(action);
    }

 
    public async login(credentials: CredentialsModel): Promise<void> {
     const response = await axios.post<string>(`${appConfig.authUrl}/login`, credentials);
     const token = response.data;
     const action: AuthAction = { type: AuthActionType.Login, payload: token };
        authStore.dispatch(action);
    }


    public logout(): void {
     const action: AuthAction = { type: AuthActionType.Logout };
        authStore.dispatch(action);
    }

    public async usernameExists(username: string): Promise<boolean> {
       const response = await axios.get<boolean>(`${appConfig.authUrl}/` + username);
        return response.data;
    }

   public isAdmin(): boolean {
        if (authStore.getState().user.role === RoleModel.Admin ) {
            return true
        }
      else {
       //notifyService.error("You are not Admin")
                return  false
            }
    }


    public isLoggedIn(): boolean {
        if (authStore.getState().token === null) return false;
        const container: { exp: number } = jwtDecode(authStore.getState().token);
        const now = new Date();
        
        return container.exp * 1000 > now.getTime();
    }

}

const authService = new AuthService();

export default  authService;