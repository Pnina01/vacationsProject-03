import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";


export class VacationState {
    public vacations: VacationModel[] = [];  
}


export enum VacationActionType {
    FetchVacations = "FetchVacations", // Fetch all vacations from backend
    AddVacation = "AddVacation", // Add new vacation
    UpdateVacation = "UpdateVacation", // Update  vacation
    DeleteVacation = "DeleteVacation", // Delete vacation
    Follow = "FollowVacation", // Add new follower
    UnFollow = "UnFollowVacation", // Delete follower
    ResetVacations = "ResetVacations" //Reset all the vacations
}


export interface VacationAction {
    type: VacationActionType,
    payload?: any; 
}


export function vacationReducer(currentState = new VacationState(), action: VacationAction): VacationState {

    const newState = { ...currentState };

    switch (action.type) {

        case VacationActionType.FetchVacations: 
            newState.vacations = action.payload; 
            break;

        case VacationActionType.AddVacation: 
            newState.vacations.push(action.payload) 
            newState.vacations.sort((a, b) => {
                let aDate = new Date(a.vacationStartDate);
                let bDate = new Date(b.vacationEndDate);
                return aDate > bDate  ? 1 : -1});
            break;

        case VacationActionType.UpdateVacation:       
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId); // -1 if not exist
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;  
            }
            break;

        case VacationActionType.DeleteVacation: 
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload); // -1 if not exist
            if (indexToDelete >= 0) {
                console.log(indexToDelete)
                newState.vacations.splice(indexToDelete, 1); 
            }
            break;

        case VacationActionType.Follow: 
            const fIndexToUpdate = newState.vacations.findIndex(f => f.vacationId === action.payload); // -1 if not exist
            if (fIndexToUpdate >= 0) {
                newState.vacations[fIndexToUpdate].followersCount++;
                newState.vacations[fIndexToUpdate].isFollowed = true;
            }
            break;
            
        case VacationActionType.UnFollow: 
            const fIndexToDelete = newState.vacations.findIndex(f => f.vacationId === action.payload); // -1 if not exist
            if (fIndexToDelete >= 0) {
                newState.vacations[fIndexToDelete].followersCount--;
                newState.vacations[fIndexToDelete].isFollowed = false;
            }
            break;
        
        case VacationActionType.ResetVacations: 
            newState.vacations=[];
            break;
    }

    return newState; 
}


export const vacationStore = createStore(vacationReducer);