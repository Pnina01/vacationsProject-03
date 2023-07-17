class Config {
    public authUrl = "http://localhost:3001/api/auth";
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public imagesUrl = "http://localhost:3001/api/vacations/images/";
    public followersUrl =  "http://localhost:3001/api/vacations/followers/";
   // public usersUrl  =  "http://localhost:3001/api/users/";
}

const appConfig = new Config();

export default appConfig;