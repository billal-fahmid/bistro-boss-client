import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_token= import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
    const { register, handleSubmit, reset } = useForm();
    const [axiosSecure] = useAxiosSecure()

    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
    const onSubmit = data => {
        console.log(data)
        const formData = new FormData();
        formData.append('image' , data.image[0])

        fetch(image_hosting_url,{
            method:'POST',
            body:formData
        })
        .then(res => res.json())
        .then(imgData => {
            console.log(imgData)
            if(imgData.success){
                const imgURL = imgData.data.display_url;
                const {name, price, category , recipe} = data ;
                const newItem = {name, price:parseFloat(price) , category,recipe ,image:imgURL}
                console.log(newItem)
                axiosSecure.post('/menu' , newItem)
                .then(data =>{
                    console.log('after posting net menu item ' , data.data)
                    if(data.data.insertedId){
                        reset()
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Add new Item successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
            }
        })

    };
 
    return (
        <div className="w-full md:px-16 mx-auto py-16">
            <SectionTitle subHeading={'What New'} heading={'Add an Item'}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="space-y-2">
                        <div className="form-control w-full  ">
                            <label className="label">
                                <span className="label-text font-semibold">Recipe name * </span>
                            </label>
                            <input type="text" placeholder="Recipe Name" {...register("name", { required: true, maxLength: 120 })} className="input input-bordered w-full  " />
                        </div>

                        <div className="flex w-full gap-6">

                            <div className="form-control md:w-1/2  ">
                                <label className="label">
                                    <span className="label-text font-semibold">Category *</span>
                                </label>
                                <select defaultValue={'Pick one'} className="select select-bordered" {...register("category", { required: true })}>
                                    <option disabled >Pick one</option>
                                    <option>Pizza</option>
                                    <option>Soup </option>
                                    <option>Salad</option>
                                    <option>Drinks</option>
                                    <option>Deshi</option>
                                    <option>Dessert</option>
                                </select>
                            </div>

                            <div className="form-control md:w-1/2 ">
                                <label className="label">
                                    <span className="label-text font-semibold">Price * </span>
                                </label>
                                <input type="number" {...register("price", { required: true })} placeholder="Price" required className="input input-bordered w-full  " />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipe Details</span>
                            </label>
                            <textarea className="textarea textarea-bordered h-24" {...register("recipe", { required: true })} placeholder="Bio"></textarea>
                        </div>

                        <div className="form-control w-full  ">
                            <label className="label">
                                <span className="label-text">Item Image</span>
                            </label>
                            <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full  " />
                        </div>

                        <input type="submit" value="Add an item" className="btn btn-sm mt-5" />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddItem;