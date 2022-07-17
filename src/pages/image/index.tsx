import { Box } from '@mui/material';
import type { NextPage } from 'next'
import ToolsCard from '../../components/share/tools-card';
import { ImageTools } from '../../constants/tools/image';
import Jimp from 'jimp';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import ImgBlankNWhite from '../../components/image/ImgBlankNWhite';
import { addTagToUrl, getURlTagValue } from '../../hooks/useTagUrl';

const getToolsComponent = (componentName: string) => {

  if(componentName === 'ImageBlackNWhite'){
   return <ImgBlankNWhite />
  }

}

const Index: NextPage = () => {

  const router = useRouter()
  
  const [selectedTools, setSelectedTools] = useState<string>()
  const tagVal = getURlTagValue(router, router.asPath)

  useEffect(() =>{
    if(tagVal) {
      setSelectedTools(tagVal)
    }
  }, [tagVal])

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {   
      if(!url.includes('#')){
        setSelectedTools('')
      }
      else{
        setSelectedTools(url.split('#')[1])
      }
      return true
    })
    
  }, [])

  const onToolCardClick = (data: any) =>{
    setSelectedTools(data.name)
    addTagToUrl(router, data.name)
  }

  return (
    <>

      {
        selectedTools && getToolsComponent(selectedTools)
      }

      {!selectedTools && <Box sx={{
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: '50px',
      }}>
        <div style={{  display: 'flex', justifyContent: 'center' }}>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
            {
                ImageTools.map((el: any) =>(
                  <ToolsCard onToolCardClick={() => onToolCardClick(el)} key={el.label} title={el.label} />
                ))
            }
          </div>
        </div>
      </Box>}

    </>
  )
}

export default Index;
