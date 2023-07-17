import "./PageNotFound.css";
import image from "../../../Assets/Images/pageNotFound.jpeg"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
           
       
         <p>"Oops! It seems like we took a wrong turn."</p>
         <h2> Page Not Found 404</h2>
         <a>Go to the homepage.</a>
        <a>Search for travel deals.</a>
         <br></br>
            <img src={image} />
         
			
        </div>
    );
}

export default PageNotFound;
