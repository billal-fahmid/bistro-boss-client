import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";


const MyCart = () => {
    const [cart, refetch] = useCart()

    const total = cart.reduce((sum, item) => item.price + sum, 0)

    const handleDelete = _id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://bistro-boss-server-two-puce.vercel.app/carts/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className="w-full custom-my">
            <Helmet>
                <title> Bistro Boss || My Cart</title>
            </Helmet>
            <SectionTitle subHeading={'Yea ye Poket '} heading={"Poket kHali koro"}></SectionTitle>
            <div className="uppercase flex justify-between  font-semibold items-center" >
                <h3 className="text-3xl "> Total Items - {cart.length}</h3>
                <h3 className="text-3xl "> Total Price - {total} $</h3>
                <Link to='/dashboard/payment'><button className="btn btn-warning btn-sm ">Pay Now</button></Link>
            </div>
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table h-[100%] w-full">
                        {/* head */}
                        <thead >
                            <tr className="bg-[#d1a054]">
                                <th>
                                    #
                                </th>
                                <th>Food</th>
                                <th>Item Name</th>
                                <th>Price </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((food, index) => (
                                    <tr key={food._id}>
                                        <td>
                                            <label>
                                                {index + 1}
                                            </label>
                                        </td>
                                        <td>

                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={food.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>


                                        </td>
                                        <td>
                                            {food.name}
                                        </td>
                                        <td className="">
                                            $  {food.price}
                                        </td>

                                        <td>
                                            <button onClick={() => handleDelete(food._id)} className=" text-2xl text-red-500"> <FaTrashAlt></FaTrashAlt> </button>
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;