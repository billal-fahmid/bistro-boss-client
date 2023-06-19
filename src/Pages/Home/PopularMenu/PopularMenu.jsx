
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";


const PopularMenu = () => {

    const [menu ] = useMenu();
    const popular = menu.filter(item => item.category == 'popular')




    return (
        <section>
            <SectionTitle
            subHeading={'---FROM OUR MENU---'}
            heading={'Popular Menu'}
            >

            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-6 my-12">
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className="w-full flex items-center flex-col justify-center">
            <button className="btn btn-outline text-center border-0 border-b-4  mt-4">View Full Menu</button>
            </div>
            
        </section>
    );
};

export default PopularMenu;