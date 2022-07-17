

export const addTagToUrl = (router: any, tagName: string) => {
    router.push(router.pathname + '#' + tagName)
};

export const getURlTagValue = (router: any) =>{
    const pathUrl = router.asPath
    const selctedVal = pathUrl.split('#')[1]
    return selctedVal
}

