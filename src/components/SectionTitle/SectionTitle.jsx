

const SectionTitle = ({heading,  subHeading}) => {
    return (
        <div className="md:w-4/12 mx-auto text-center mt-20">
            <p className="text-[#D99904] text-xl italic pb-4">{subHeading}</p>
            <h1 className="text-4xl text-black border-y-4 py-4 mb-12">{heading}</h1>
        </div>
    );
};

export default SectionTitle;