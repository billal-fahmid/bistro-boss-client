import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import featured from '../../../../assets/home/featured.jpg'
import './Featured.css'


const Featured = () => {
    return (
        <div className="featured-item bg-fixed opacity-80 text-white pt-2 pb-20 mt-20">
            <SectionTitle 
            subHeading={'---Check it out---'}
            heading={'Featured Item'}
            
            ></SectionTitle>
            <div className="md:flex justify-center  items-center  px-36">
                <div className="">
                    <img className="" src={featured} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>March 20, 2023</p>
                    <p className="uppercase"> WHERE CAN I GET SOME?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
            
        </div>
    );
};

export default Featured;