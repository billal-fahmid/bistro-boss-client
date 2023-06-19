import { useEffect, useState } from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'


const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://bistro-boss-server-two-puce.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    console.log(reviews)

    return (
        <section>
            <SectionTitle
                subHeading={'What Our Client Say'}
                heading={'Testimonials'}
            ></SectionTitle>

            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper my-16">

                    {
                        reviews.map(review => <SwiperSlide key={review._id} >
                            <div className="flex flex-col items-center my-16 px-20">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className="py-10">{review.details}</p>
                                <h3 className="text-2xl text-orange-400 font-bold">{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>

        </section>

    );
};

export default Testimonials;