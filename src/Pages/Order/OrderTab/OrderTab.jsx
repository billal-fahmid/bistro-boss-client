import FoodCard from "../../../components/FoodCard/FoodCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


const OrderTab = ({ items }) => {

    // const numberOfItems =items.count;
    // const slide = Math.ceil(numberOfItems/6)
    // // const slides =[...slide,keys()]
    // // console.log(slides)

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    };

    return (
            <Swiper
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper "
          >
            <SwiperSlide>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {items.map(item => <FoodCard key={item._id} item={item}></FoodCard>)}
                </div>
            </SwiperSlide>
         
          </Swiper>
    );
};

export default OrderTab;