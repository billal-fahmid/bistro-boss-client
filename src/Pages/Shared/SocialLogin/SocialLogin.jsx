



import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";




const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/'

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user
                console.log(user)
                const saveUser = { name: user.displayName, email: user.email }
                fetch(`https://bistro-boss-server-two-puce.vercel.app/users`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
    
                            navigate(from, { replace: true })
                           
                    })

               
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className="divider"></div>
            <div className="w-full text-center pb-6">
                <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;