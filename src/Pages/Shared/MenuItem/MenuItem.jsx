

const MenuItem = ({item}) => {
    const {name , recipe , price , image} = item;
    // console.log(image)
    return (
        <div className="flex space-x-2">
            <img style={{borderRadius:'0 200px 200px 200px'}} className="w-[100px] "  src={image} alt="" />
            <div className="">
                <h3 className="uppercase">{name} ------------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-[#BB8506]"> {price + '$'}</p>
        </div>
    );
};

export default MenuItem;