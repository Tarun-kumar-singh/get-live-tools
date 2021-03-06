import { Box } from '@mui/material';
import type { NextPage } from 'next'
import ToolsCard from '../../components/share/tools-card';
import { ImageTools } from '../../constants/tools/image';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { addTagToUrl, getURlTagValue } from '../../hooks/useTagUrl';

import ImageManipulation from '../../components/image/ImageManipulation';
import ChangeFormat from '../../components/image/ChangeFormat';
import BlackNWhite from '../../components/image/BlackNWhite';
import ImageFlip from '../../components/image/ImageFlip';
import InvertColor from '../../components/image/InvertColor';
import ImageCrop from '../../components/image/ImageCrop';
import ImageLighten from '../../components/image/ImageLighten';
import ImageCircle from '../../components/image/ImageCircle';
 
const getToolsComponent = (componentName: string, onBack: () => void) => {

  if(componentName === 'ChangeFormat'){
   return <ChangeFormat onBack={onBack}/>
  }
  else if(componentName === 'EditImage'){
    return <ImageManipulation onBack={onBack} />
  }
  else if(componentName === 'BlackNWhite'){
    return <BlackNWhite onBack={onBack} />
  } 
  else if(componentName === 'FlipImage'){
    return <ImageFlip onBack={onBack} />
  } 
  else if(componentName === 'InvertColor'){
    return <InvertColor onBack={onBack} />
  } 
  else if(componentName === 'ImageCrop'){
    return <ImageCrop onBack={onBack} />
  }
  else if(componentName === 'ImageLighten'){
    return <ImageLighten onBack={onBack} />
  }
  else if(componentName === 'ImageCicle'){
    return <ImageCircle onBack={onBack} />
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
          <Box sx={{ display:'flex', justifyContent:'center', gap: '13px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {
                ImageTools.map((el: any) =>(
                  <ToolsCard onToolCardClick={() => onToolCardClick(el)} key={el.label} title={el.label} />
                ))
            }
          </Box>
      }

    </>
  )
}

export default Index;
