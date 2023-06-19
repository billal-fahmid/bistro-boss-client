import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";


const Main = () => {
    const location = useLocation()
    const onHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');;
    return (
        <div>
            {onHeaderFooter ||   <Navbar></Navbar>}
            <Outlet></Outlet>
            {onHeaderFooter ||   <Footer></Footer>}
        </div>
    );
};

export default Main;