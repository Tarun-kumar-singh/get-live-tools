import { Button, OutlinedInput, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";


type Props = {

}
const ImgBlankNWhite = (props: Props) =>{

    const [value, setValue] = useState('')

    const onChceck = () => {

    }

    return(
        <>
        <Box sx={{
            display: 'flex',
            justifyContent:'center',
            flexDirection: 'column',
            gap: '10px',
            flexGrow: 1
        }}>
           <OutlinedInput 
                value={value}
                placeholder="Please enter text"  
                multiline 
                rows={11} 
                sx={{
                    width:{
                        lg: '60%',
                        xs: '90%'
                    }
                }}
                onChange={(e) => setValue(e.target.value) }
            />
            <div>   
                <Button disabled={!(!!value)} onClick={onChceck} variant="contained">Check</Button>
            </div>
        </Box>
        </>
    )
}

export default ImgBlankNWhite;