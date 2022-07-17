import { Box, Button } from '@mui/material';
import type { NextPage } from 'next'
import ToolsCard from '../../components/share/tools-card';
import Jimp from 'jimp';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import KeywordDenisityChecker from '../../components/text/KeywordDenisityChecker';
import { addTagToUrl, getURlTagValue } from '../../hooks/useTagUrl';
import { TextTools } from '../../constants/tools/texts';
import WordCounter from '../../components/text/WordCounter';
 
const getToolsComponent = (componentName: string, onBack: () => void) => {

  if(componentName === 'KeywordDenisityChecker'){
   return <KeywordDenisityChecker onBack={onBack}/>
  }
  else if(componentName === 'WordCounter'){
    return <WordCounter onBack={onBack}/>
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

  const onBack = () =>{
    router.back()
  }

  return (
    <>

      {
        selectedTools && 
          <>    
            {getToolsComponent(selectedTools, onBack)}
          </>
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
