import { useQuery } from "@tanstack/react-query";

const useMenu= () =>{
    
    // const [menu , setMenu ] = useState([])
    // const [loading , setLoading ] = useState(true)
  
        // useEffect(() =>{
        //     fetch('https://bistro-boss-server-two-puce.vercel.app/menu')
        //     .then(res => res.json())
        //     .then(data => {
        //         // const popularItems = data.filter(dt => dt.category === 'popular')
        //         setMenu(data)})
        //         setLoading(false)
        // },[])
        // console.log(menu)

        const {data:menu=[] , isLoading:loading, refetch} = useQuery({
            queryKey:['menu'],
            queryFn: async ()=>{
                const res = await fetch(`https://bistro-boss-server-two-puce.vercel.app/menu`)
                return res.json()
            }
        })
        

        return [menu , loading,refetch]

}

export default useMenu;