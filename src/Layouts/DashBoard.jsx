import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendar, FaHome, FaUtensils, FaBookOpen,  FaUsers, } from 'react-icons/fa';
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";



const DashBoard = () => {
    const [cart] = useCart();

    //TODO load data from server to dynamic admin  
    // const isAdmin = true;

    const [isAdmin] = useAdmin();

    return (
        <div>

            <div className="drawer drawer-mobile ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side bg-[#d1a054]">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80  text-base-content">
                        {
                            isAdmin ?
                                <>
                                    <li><NavLink to='/dashboard/adminhome'> <FaHome></FaHome>Admin Home</NavLink></li>
                                    <li><NavLink to='/dashboard/additem'><FaUtensils></FaUtensils> Add An Item</NavLink></li>
                                    <li><NavLink to='/dashboard/menageItems'><FaWallet></FaWallet> Manage Items</NavLink></li>
                                    <li><NavLink to='/dashboard/history'><FaBookOpen></FaBookOpen> Manage Booking</NavLink></li>
                                    <li><NavLink to='/dashboard/allusers'><FaUsers></FaUsers> Manage Users</NavLink></li>
                                   
                                </> :
                                <>
                                    <li><NavLink to='/dashboard/userhome'> <FaHome></FaHome>User Home</NavLink></li>
                                    <li><NavLink to='/dashboard/reservation'><FaCalendar></FaCalendar> Reservation</NavLink></li>
                                    <li><NavLink to='/dashboard/history'><FaWallet></FaWallet> Payment History</NavLink></li>
                                    <li className="">
                                        <NavLink to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart> My Cart<span className="badge badge-secondary">+{cart?.length || 0}</span>
                                        </NavLink>

                                    </li>
                                </>
                        }


                        <div className="divider"></div>

                        <li><NavLink to='/'> <FaHome></FaHome> Home</NavLink></li>
                        <li><NavLink to='/menu'><FaUtensils></FaUtensils> Our Menu</NavLink></li>
                        <li><NavLink to='/order/salad'>Order Food</NavLink></li>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoard;