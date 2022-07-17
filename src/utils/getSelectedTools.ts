import { useState } from "react";

const getSelectedToolName = (router: any) => {
  
  const [selectedTools, setSelectedTools] = useState<string>()
  router.beforePopState(({ url, as, options }: any) => {   
    if(!url.includes('#')){
      setSelectedTools('')
    }
    else{
      setSelectedTools(url.split('#')[1])
    }
    return true
  })

  return selectedTools;

};

export default getSelectedToolName;

