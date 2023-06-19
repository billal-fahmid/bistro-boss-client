
import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MenageItems = () => {
    const [menu, ,refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure()

    const handleDelete = (id) => {
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

                axiosSecure.delete(`/menu/${id}`)
                    .then(res => {
                        refetch()
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                     
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
        <div className="w-full px-8 py-16">
            <SectionTitle subHeading={'Hurry Up'} heading={"Menage All Items"}></SectionTitle>

            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table h-full w-full">
                        {/* head */}
                        <thead >
                            <tr className="bg-[#d1a054]">
                                <th>
                                    #
                                </th>
                                <th>Item</th>
                                {/* <th>Item Name</th> */}
                                <th>Category</th>
                                <th>Price </th>
                                <th>Update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu?.map((item, index) => <tr key={item._id} >
                                    <td>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </td>
                                    <td className="flex  items-center">

                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div className=" ml-4">
                                            {item.name}
                                        </div>


                                    </td>
                                    <td>
                                        {item.category}
                                    </td>
                                    <td className="">
                                        {item.price} $
                                    </td>
                                    <td className="">

                                    </td>

                                    <td>
                                        <button onClick={() => handleDelete(item._id)} className=" text-2xl text-red-500"> <FaTrashAlt></FaTrashAlt> </button>
                                    </td>
                                </tr>)
                            }






                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default MenageItems;