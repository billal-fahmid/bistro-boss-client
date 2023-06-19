import { Parallax } from 'react-parallax';

const Cover = ({ img, title, subTitle }) => {
    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={img}
            bgImageAlt="the dog"
            strength={-200}
        >
            <div className="hero h-[600px]" >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content w-full text-center text-neutral-content">
                    <div className=" bg-[#151515] bg-opacity-50 py-16 px-24 w-3/4">
                        <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                        <p className="mb-5 uppercase">{subTitle}</p>

                    </div>
                </div>
            </div>
      
        </Parallax>


    );
};

export default Cover;