import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({items ,img,title, subTitle}) => {
    return (
        <div>
          {     title && <Cover img={img} title={title} subTitle={subTitle}>
            </Cover>}
             <div className="grid md:grid-cols-2 gap-6 my-12">
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className="w-full flex items-center flex-col justify-center">
            <Link to={`/order/${title}`} className="btn btn-outline text-center border-0 border-b-4 mb-12 mt-4">ORDER YOUR FAVOURITE FOOD</Link>
            </div>
        </div>
    );
};

export default MenuCategory;