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
        <>

           <OutlinedInput 
                value={value}
                placeholder="Please enter text"  
                multiline 
                rows={11} 
                sx={{
                    width:{
                        lg: '60%',
                        xs: '90%'
                    },
                    textAlign: 'center'
                }}
                onChange={(e) => setValue(e.target.value) }
            />
            <div style={{ textAlign: 'center' }}>   
                <Button disabled={!(!!value)} onClick={onChceck} variant="contained">Check</Button>
            </div>
        </>
        </>
    )
}

export default ImgBlankNWhite;