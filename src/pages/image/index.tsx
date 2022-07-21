import { Box } from '@mui/material';
import type { NextPage } from 'next'
import ToolsCard from '../../components/share/tools-card';
import { ImageTools } from '../../constants/tools/image';
import Jimp from 'jimp';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import ImgBlankNWhite from '../../components/image/ImageManipulation';
import { addTagToUrl, getURlTagValue } from '../../hooks/useTagUrl';
import ImageBlur from '../../components/image/ImageBlur';
import ImageRotation from '../../components/image/ImageRotation';
import ColorManipulation from '../../components/image/ImageManipulation';
import ImageManipulation from '../../components/image/ImageManipulation';
 
const getToolsComponent = (componentName: string, onBack: () => void) => {

  if(componentName === 'ImageBlackNWhite'){
  //  return <ImgBlankNWhite />
  }

  if(componentName === 'ImageBlur'){
    return <ImageManipulation onBack={onBack} />
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
                ImageTools.map((el: any) =>(
                  <ToolsCard onToolCardClick={() => onToolCardClick(el)} key={el.label} title={el.label} />
                ))
            }
          </Box >
      }

    </>
  )
}

export default Index;
