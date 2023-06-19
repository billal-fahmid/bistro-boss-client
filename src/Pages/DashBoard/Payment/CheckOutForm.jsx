import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const CheckOutForm = ({ price, cart, }) => {
    const { user } = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCartError] = useState('');

    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [proccessing, setProccessing] = useState(false);
    const [transactionId, setTransactionId] = useState('')

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure])



    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, } = await stripe.createPaymentMethod({
            type: 'card', card
        })

        if (error) {
            console.log('error', error)
            setCartError(error.message)
        } else {
            setCartError('')
            // console.log('payment method', paymentMethod)
        }

        setProccessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'anonymous',
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError)
        }
        console.log('payment intent', paymentIntent)
        setProccessing(false)

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            // const transactionId = paymentIntent.id;
            //save payment information to the server 
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                status: 'service pending',
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemId),
                itemsName: cart.map(item => item.name),
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    // refetch()
                    if (res.data.result.insertedId) {
                        //TODO display confirm
                    }
                })
        }

    }
    return (

        <div className="w-2/3 py-10 mx-auto">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-outline btn-danger btn-sm mt-6" type="submit" disabled={!stripe || !clientSecret || proccessing}>
                    Pay
                </button>
            </form>
            {cardError && <p className="text-orange-400 text-2xl font-bold">{cardError}</p>}
            {transactionId && <p className="text-green-400 text-2xl font-bold">Payment Success with Transaction Id : {transactionId}</p>}
        </div>


    );
};

export default CheckOutForm;