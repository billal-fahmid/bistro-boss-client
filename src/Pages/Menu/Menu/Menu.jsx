import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import MainCoverImg from '../../../assets/menu/banner3.jpg'
import dessertsImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'

import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';



const Menu = () => {

    const [menu] = useMenu()
    const desserts = menu.filter(item => item.category == 'dessert');
    const pizza = menu.filter(item => item.category == 'pizza');
    const  soup = menu.filter(item => item.category == 'soup');
    const salad = menu.filter(item => item.category == 'salad');
    const offered = menu.filter(item => item.category == 'offered');
   

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
               
            </Helmet>
            {/* main cover */}
            <Cover img={MainCoverImg} title={'OUR MENU'} subTitle={'Would you like to try a dish?'}>
            </Cover>
            {/* offered Menu items */}
            <SectionTitle 
            subHeading={"---Don't miss---"}
            heading={"TODAY'S OFFER"}
            ></SectionTitle>
            <MenuCategory items={offered} title={'offered'}></MenuCategory>

            {/* desserts menu items */}
            <MenuCategory 
            items={desserts} 
            title={'dessert'} 
            subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
            img={dessertsImg}
            ></MenuCategory>

            {/* pizza menu items */}
            <MenuCategory 
            items={pizza}
            title={'pizza'}
            subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
            img={pizzaImg}
            ></MenuCategory>

            {/* salad menu items */}
            <MenuCategory 
            items={salad}
            title={'salad'}
            subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
            img={saladImg}
            ></MenuCategory>

            {/* soup menu items */}
            <MenuCategory 
            items={soup}
            title={'soup'}
            subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
            img={soupImg}
            ></MenuCategory>
            
        </div>
    );
};

export default Menu;