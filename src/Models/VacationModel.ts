class VacationsModel {
    
    public vacationId: number;
    public destination: string;
    public description: string;
    public vacationStartDate: string;
    public vacationEndDate: string;
    public price: number;
    public image: FileList; 
    public imageName: string; 
    //public src: string;
    public followersCount: number;
    public isFollowed: boolean;

    public constructor(vacation: VacationsModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.vacationStartDate = vacation.vacationStartDate;
        this.vacationEndDate = vacation.vacationEndDate;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
       // this.src =  vacation.src;
        this.followersCount = vacation.followersCount;
        this.isFollowed = vacation.isFollowed;

    }
}
    export default VacationsModel