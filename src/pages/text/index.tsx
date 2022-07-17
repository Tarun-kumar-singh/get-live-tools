import { Box } from '@mui/material';
import type { NextPage } from 'next'
import ToolsCard from '../../components/share/tools-card';
import Jimp from 'jimp';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import KeywordDenisityChecker from '../../components/text/KeywordDenisityChecker';
import { addTagToUrl, getURlTagValue } from '../../hooks/useTagUrl';
import { TextTools } from '../../constants/tools/texts';
 
const getToolsComponent = (componentName: string) => {

  if(componentName === 'KeywordDenisityChecker'){
   return <KeywordDenisityChecker />
  }

}

const Index: NextPage = () => {

  const router = useRouter()
  
  const [selectedTools, setSelectedTools] = useState<string | undefined>()
  const tagVal = getURlTagValue(router)

  useEffect(() =>{
    router.beforePopState(({ url, as, options }: any) => {   
      if(!url.includes('#')){
        setSelectedTools('')
      }
      else{
        setSelectedTools(url.split('#')[1])
      }
      return true
    })
  }, [])

  useEffect(() =>{
    if(tagVal) {
      setSelectedTools(tagVal)
    }
  }, [tagVal])

  const onToolCardClick = (data: any) =>{
    setSelectedTools(data.name)
    addTagToUrl(router, data.name)
  }

  return (
    <>

      {
        selectedTools && 
          <Box sx={{ display:'flex', justifyContent:'center', gap: '13px', flexWrap: 'wrap' }}>
            {getToolsComponent(selectedTools)}
          </Box>
      }

      {!selectedTools && 
          <Box sx={{ display:'flex', justifyContent:'center', gap: '13px', flexWrap: 'wrap' }}>
            {
                TextTools.map((el: any) =>(
                  <ToolsCard onToolCardClick={() => onToolCardClick(el)} key={el.label} title={el.label} />
                ))
            }
          </Box >
      }

    </>
  )
}

export default Index;
