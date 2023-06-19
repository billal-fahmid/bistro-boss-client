import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import useCart from "../../../hooks/useCart";

// TODO provide publishable key
const stripePromise = loadStripe(`${import.meta.env.VITE_payment_gatway_key}`)

const Payment = () => {

    const [cart,refetch] = useCart()
    const total= cart?.reduce((sum,item)=>sum + item.price, 0);
    const price = parseFloat(total.toFixed(2))

    return (
        <div>
            <SectionTitle heading={"Payment"} subHeading={'Please process'}></SectionTitle>
            <h3 className="text-3xl">Payment koro bacha </h3>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm price={price} reduce={refetch} cart={cart}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;