import { Box } from '@mui/material';
import type { NextPage } from 'next'
import ToolsCard from '../../components/share/tools-card';
import { ImageTools } from '../../constants/image';

const Index: NextPage = () => {

  return (
    <>
      <div style={{  display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
          {
              ImageTools.map((el: any) =>(
                <ToolsCard title={el.label} />
              ))
          }
        </div>
      </div>
    </>
  )
}

export default Index;
