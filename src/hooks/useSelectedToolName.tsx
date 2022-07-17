import { useRouter } from "next/router";
import { useState } from "react";

const useSelectedToolName = () => {
  
  const router = useRouter()
  const [selectedTools, setSelectedTools] = useState<string>()
  router.beforePopState(({ url, as, options }) => {   
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

export default useSelectedToolName;


