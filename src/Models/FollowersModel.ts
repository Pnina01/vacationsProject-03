class FollowerModel {

    public userId: number;
    public vacationId: number;

    constructor(userId: number, vacationId:  number){
        this.userId =  userId
        this.vacationId = vacationId
    }
}

export default FollowerModel;