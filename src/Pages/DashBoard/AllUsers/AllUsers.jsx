import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {

    const [axiosSecure] =useAxiosSecure()

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data
    })

    const handleDelete=(user) =>{
        // fetch(`https://bistro-boss-server-two-puce.vercel.app/users/${user._id}`,{
        //     method:'DELETE'
        // })
        // .then(res => res.json)
        // .then(data => {
        //     console.log(data)
        // })
    }
    const handleMakeAdmin=(user)=>{
        console.log(user.name)
        fetch(`https://bistro-boss-server-two-puce.vercel.app/users/admin/${user._id}`,{
            method:'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an admin now`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    return (
        <div className="w-full px-10">
            <Helmet>
                <title> Bistro Boss || Manage Users</title>
            </Helmet>
            <h3 className="font-semibold text-3xl"> Total Users :{users.length}</h3>
            <div>
                <div>
                    <div className="overflow-x-auto w-full">
                        <table className="table h-[100%] w-full">
                            {/* head */}
                            <thead >
                                <tr className="bg-[#d1a054]">
                                    <th>
                                        #
                                    </th>
                                    <th>Name</th>
                                    <th> Email</th>
                                    <th>Role </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                   
                                    {
                                            users.map((user, index) => (
                                                <tr key={user._id}>
                                                <td>
                                                    <label>
                                                    {index + 1}
                                                    </label>
                                                </td>
                                                <td>
                                                    {user.name}
                                                </td>
                                                <td>
                                                    {user.email}
                                                </td>
                                                <td className="">
                                                    {
                                                        user.role === 'admin' ? 'Admin' : <button onClick={()=>handleMakeAdmin(user)} className="text-2xl btn text-orange-500"><FaUserShield></FaUserShield></button>
                                                    }
                                                </td>
    
                                                <td>
                                                    <button onClick={handleDelete(user)}  className=" text-2xl text-red-500"> <FaTrashAlt></FaTrashAlt> </button>
                                                </td>
                                            </tr>
                                            ))
                                    }
                                     
                         
                          


                            </tbody>


                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;