import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";


const SignUp = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email }
                        fetch(`https://bistro-boss-server-two-puce.vercel.app/users`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                if (data.insertedId) {
                                    reset()
                                    navigate('/')
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User profile updated',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })

                                }
                            })


                    }).catch((error) => {
                        // An error occurred
                        // ...
                        console.log(error)
                    });

            })
            .catch(err => {
                console.log(err)
            })

    };


    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>

            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-orange-500">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="photoURL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-orange-500">photoURL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-orange-500">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 12,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/

                                })}
                                    name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'minLength' && <p className="text-orange-400">password must be 6 character</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-orange-400">password must less then 12 character</p>}
                                {errors.password?.type === 'pattern' && <p className="text-orange-400">password must be One uppercase and One special character and one number and one lower case</p>}


                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">


                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p><small>Already have an Account ? <Link to='/login'>login please </Link></small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;