import { useState } from "react";
import {useRouter} from 'next/router';


export const addTagToUrl = (router: any, tagName: string) => {

    router.push(router.pathname + '#' + tagName)
};

export const getURlTagValue = () =>{
    const router = useRouter()
    const pathUrl = router.asPath
    const selctedVal = pathUrl.split('#')[1]
    return selctedVal
}

