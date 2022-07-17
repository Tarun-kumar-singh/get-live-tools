import { Button } from "@mui/material";
import { useState } from "react";
import MultilineTextFiled from "../share/MultilineTextField";
const { removeStopwords, eng, fra } = require('stopword')

type Props = {
    onBack: () => void
}
const WordCounter = (props: Props) => {

    const { onBack } = props
    const [value, setValue] = useState<string>('')
    const [totalCount, setTotalcount] = useState()
    const [totalCharacters, setTotalCharacters] = useState<number>()

    const onChange = (value: string): void =>{
        
        setValue(value)
        const stringToken = removeStopwords(value.trim().split(' '))
        console.log(stringToken)
        setTotalcount(stringToken.length)
        
        let charLength = 0
        stringToken.map((el: string) => charLength = charLength + el.length );
        setTotalCharacters(charLength)
    }

    const onClickBack = () =>{
        onBack()
      }

    return(
        <>
            <div style={{ marginLeft: '3%', padding: '10px' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>
           <div>
              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
               <div> Total Words:{totalCount}</div> 
               <div> Total Characters:{totalCharacters}</div> 
            </div>  
            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <MultilineTextFiled 
                    onChange={onChange}
                    value={value}
                />

            </div>
           </div>
        </>
    )

}

export default WordCounter;
