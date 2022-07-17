import { Button, OutlinedInput } from "@mui/material";
import { useState } from "react";
import CheckDecimal from "../../utils/checkDecimal";
import StickyHeadTable from "../share/table/stickyheadtable";
const { removeStopwords, eng, fra } = require('stopword')

const columns = [
    {label:'Key word', value: 'keyWord', maxWidth: 170},
    {label:'Frequency', value: 'frequency'},
    {label:'Percentage', value: 'percent'},

]
type Props = {

}
const ImgBlankNWhite = (props: Props) =>{

    const [value, setValue] = useState('')
    const [result, setResult] = useState<any>()
    const [total, setTotal] = useState<number | undefined>()

    const [data, setData] = useState<Array<any>>([])

    const onChceck = () => {
        const newString = removeStopwords(value.trim().split(' '))
        getFrequency(newString)
    }

    const getFrequency = (data: Array<any>) =>{
        setTotal(data.length)
        const count: any = {};
        data.forEach((e: any) => count[e] ? count[e]++ : count[e] = 1);
        setResult({ ...count  })
        const createdData = Object.keys(count).map((el: any) => {
            const percentValue = (count[el] * 100) / data.length
            return { 
                keyWord: el, 
                frequency: count[el], 
                percent: (CheckDecimal(percentValue) ? percentValue.toPrecision(2):  percentValue) + '%'  }
        })

        setData(createdData)
    }

    const onBack = () =>{
        setResult(undefined)
      }

    return(
        <>
            {
                result && 
                    <div>
                        <div style={{ marginLeft: '3%', padding: '10px' }}>
                            <Button onClick={onBack} variant='outlined'>Back</Button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <p>Total keywords: {total}</p>
                        </div>
                            
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <StickyHeadTable
                                data={data}
                                columns={columns}
                            />
                        </div>
                    </div>       
                       
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