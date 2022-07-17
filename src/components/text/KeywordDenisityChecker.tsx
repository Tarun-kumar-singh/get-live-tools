import { Button, OutlinedInput, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
// import { removeStopwords, eng, fra } from 'stopword'

const { removeStopwords, eng, fra } = require('stopword')

type Props = {

}
const ImgBlankNWhite = (props: Props) =>{

    const [value, setValue] = useState('')
    const [result, setResult] = useState<any>()
    const [total, setTotal] = useState<number | undefined>()

    const onChceck = () => {
        console.log(value)
        const newString = removeStopwords(value.split(' '))
        console.log(getFrequency(newString))
    }

    const getFrequency = (data: Array<any>) =>{
        console.log(data.length)
        setTotal(data.length)
        const count: any = {};
        data.forEach((e: any) => count[e] ? count[e]++ : count[e] = 1);
        console.log(result)
        setResult({
           ...count
        })
        return count
    }


    return(
        <>
            {
                result && 
                    <>
                       <p>Total: {total}</p>
                       {
                        Object.keys(result).map((el: any) =>{   
                           return(<div>
                                {el} - {result[el]}
                           </div>) 
                        })
                       }
                    </>
            }
           {!result && <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                </div>
            
                <div style={{ textAlign: 'center', marginTop:'10px' }}>   
                    <Button disabled={!(!!value)} onClick={onChceck} variant="contained">Check</Button>
                </div> 
            </>}

        </>
    )
}

export default ImgBlankNWhite;