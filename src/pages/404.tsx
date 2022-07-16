import { useRouter } from "next/router";
import { useEffect } from "react";


const Clienterror = () =>{
   
    const router = useRouter()
    useEffect(() =>{
         router.replace('/')
    }, [])

    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center', height: '70vh'}}>
        </div>
    )
}

export default Clienterror;