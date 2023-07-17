
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './Components/LayoutArea/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import interceptorsService from './Services/InterceptorsService';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
interceptorsService.createInterceptors();
root.render(
  //<React.StrictMode>
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
 // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();