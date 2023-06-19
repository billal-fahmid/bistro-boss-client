import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
    const { name, recipe, price, image ,_id} = item;
    const { user } = useContext(AuthContext);

    const [ ,refetch] = useCart()

    const location = useLocation()
    const navigate = useNavigate()


    const handleAddToCart = item => {
        console.log(item)
        if (user && user.email) {
            const orderItem = {menuItemId:_id,name,image,price , email:user?.email}
            fetch(`https://bistro-boss-server-two-puce.vercel.app/carts`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(orderItem)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        refetch() // refetch cart to update the number of items in the cart
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Food has been saved to Cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                       
                    }
                })
        } else {
            Swal.fire({
                title: 'Please Login to Order the Food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                 navigate('/login' ,{state:{from:location}})
                }
            })
        }
    }

    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mt-4 mr-4 py-1 px-2 rounded bg-stone-900 text-white">$ {price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline text-center border-0 border-b-4 mt-6 bg-slate-100 border-orange-500">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;