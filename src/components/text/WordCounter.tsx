import { Button, TableCell, Typography } from "@mui/material";
import { useState } from "react";
import HeadTitle from "../share/headTitle";
import MultilineTextFiled from "../share/MultilineTextField";
const { removeStopwords, eng, fra } = require('stopword')

type Props = {
    onBack: () => void
}
const WordCounter = (props: Props) => {

    const { onBack } = props
    const [value, setValue] = useState<string>('')
    const [totalCount, setTotalcount] = useState(0)
    const [totalCharacters, setTotalCharacters] = useState<number>(0)

    const onChange = (value: string): void =>{
        setValue(value)
       console.log(value)
        const stringToken = removeStopwords(value.trim().split(' '))
        console.log(stringToken)
        if(stringToken.length === 1 && stringToken[0] === '' ){
            setTotalcount(0)
        }
        else{
            setTotalcount(stringToken.length)
        }
            
        
        let charLength = 0
        stringToken.map((el: string) => charLength = charLength + el.length );
        setTotalCharacters(charLength)
    }

    const onClickBack = () =>{
        onBack()
      }

    return(
        <>
            <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>
            <div style={{ display: 'flex', justifyContent:'center'}}>
                <HeadTitle
                 title='Word counter'
                 caption='Stop words are not counted'
                />
            </div>
           
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>         
                    <div>
                        <TableCell variant="head">
                            Total Words:
                        </TableCell>
                        <TableCell>
                            {totalCount}
                        </TableCell>
                    </div> 
                    <div>
                        <TableCell variant="head">
                            Total Characters:
                        </TableCell>
                        <TableCell>
                            {totalCharacters}
                        </TableCell>
                    </div> 
            </div> 
            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <MultilineTextFiled 
                    onChange={onChange}
                    value={value}
                />
            </div>
        </>
    )

}

export default WordCounter;
