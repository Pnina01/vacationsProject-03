import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="footer">
            <p>© {new Date().getFullYear()} Pnina's Global Journeys. All Rights Reserved.</p>
  <p>Contact Us - pninasglobal@gmail.com</p>
			
        </div>
    );
}

export default Footer;
