import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/config";
import FollowersModel from "../Models/FollowersModel";
import { VacationAction, VacationActionType, vacationStore } from "../Redux/VacationState";

class VacationService {

   
    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationStore.getState().vacations;
        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
            vacations = response.data;
            const action: VacationAction = { type: VacationActionType.FetchVacations, payload: vacations };
            vacationStore.dispatch(action); 
        }
        return vacations;
    }

    
    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        let vacation;
        let vacations = vacationStore.getState().vacations;
        if (vacations.length === 0) {
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationId);
            vacation = response.data;
        } else {
            vacation = vacations.find(v => v.vacationId === vacationId);
        }
        return vacation;
    }

    public async getMyVacations(): Promise<VacationModel[]> {
        let vacations = await this.getAllVacations()
        vacations = vacations.filter(el => el.isFollowed);
       return vacations;
    }

   
    public async getCurrentVacations(): Promise<VacationModel[]> {
        const allVacations = await this.getAllVacations();
        const currentDate = new Date();  
        const currentVacations = allVacations.filter(vacation => {
        const startDate = new Date(vacation.vacationStartDate);
        const endDate = new Date(vacation.vacationEndDate);
        return startDate <= currentDate && currentDate <= endDate;
        });
        return currentVacations;
        }
      
    public async getFutureVacations(): Promise<VacationModel[]> {
        const allVacations = await this.getAllVacations();
        const currentDate = new Date();
        const futureVacations = allVacations.filter(vacation => {
        const startDate = new Date(vacation.vacationStartDate);
        return currentDate < startDate;
         }); 
        return futureVacations;
        }
      
    public async AddFollow(vacationId: number): Promise<void> {
        await axios.post<FollowersModel>(`${appConfig.followersUrl}${vacationId}/follow`);
        const action: VacationAction = { type: VacationActionType.Follow, payload: vacationId };
        vacationStore.dispatch(action);
    }

   
    public async deleteFollow(vacationId: number): Promise<void> {
        await axios.delete<FollowersModel>(`${appConfig.followersUrl}${vacationId}/unfollow`);
        const action: VacationAction = { type: VacationActionType.UnFollow, payload: vacationId };
        vacationStore.dispatch(action);

    }

    public async updateVacation(vacation: VacationModel): Promise<void> {

        const formData = new FormData();
        formData.append("vacationId", vacation.vacationId.toString());
        formData.append("followersCount", vacation.followersCount.toString());
        formData.append("isFollowed", vacation.isFollowed.toString());
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("vacationStartDate", vacation.vacationStartDate);
        formData.append("vacationEndDate", vacation.vacationEndDate);
        formData.append("price", vacation.price.toString());
        formData.append("image", vacation.image[0]);
        formData.append("imageName", vacation.imageName);

        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, formData);

        const updatedVacation: VacationModel = response.data;

        const action: VacationAction = { type: VacationActionType.UpdateVacation, payload: updatedVacation };
        vacationStore.dispatch(action);

    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("vacationStartDate", vacation.vacationStartDate);
        formData.append("vacationEndDate", vacation.vacationEndDate);
        formData.append("price", vacation.price.toString());
        formData.append("image", vacation.image[0])
        
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, formData);
        const addedVacation: VacationModel = response.data;
        const action: VacationAction = { type: VacationActionType.AddVacation, payload: addedVacation };
        vacationStore.dispatch(action);
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete<VacationModel>(appConfig.vacationsUrl + vacationId);
        const action: VacationAction = { type: VacationActionType.DeleteVacation, payload: vacationId };
        vacationStore.dispatch(action);
    }

    public resetVacations() {
        const action: VacationAction = { type: VacationActionType.ResetVacations, payload: '' };
        vacationStore.dispatch(action);
    }

}

const vacationService = new VacationService();

export default vacationService;