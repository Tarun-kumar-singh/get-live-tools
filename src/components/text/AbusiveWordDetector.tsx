import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import HeadTitle from "../share/headTitle";
import MultilineTextFiled from "../share/MultilineTextField";
const Filter = require('bad-words'),
    filter = new Filter();

type Props = {
    onBack: () => void
}
const AbusiveWordDetector = (props: Props) => {

    const { onBack } = props
    const [value, setValue] = useState('')
    const [selectedValue, setSelectedValue] = useState('')

    const onClickBack = () =>{
        onBack()
    }

    const onChange = (val: string) =>{
        setValue(val)
    }

    const onClickFind = () => {
        setValue(value)
    }

    const findProfaneWords = (value: string) => {

    }

    return(
        <>
             <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>
            <div style={{ display: 'flex', justifyContent:'center'}}>
                <HeadTitle
                 title='Find bad words'
                />
            </div>
           
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <FormControl>
                    <FormLabel>Select case</FormLabel>
                        <RadioGroup
                            row
                            onChange={(e) => setSelectedValue(e.target.value)}
                        >
                            <FormControlLabel value="upper" control={<Radio />} label="find bad words" />
                            <FormControlLabel value="lower" control={<Radio />} label="Replace bad words with *" />
                            <FormControlLabel value="alternateUpper" control={<Radio />} label="Remove bad word" />                   
                        </RadioGroup>
                </FormControl>
                <MultilineTextFiled 
                    placeholder="Paste your content here"
                    onChange={onChange}
                    value={value}
                />
                <Button 
                    disabled={!value || !selectedValue} 
                    variant="contained" 
                    onClick={() => onClickFind()}
                >
                    Find
                </Button>

            </div>
        
        </>
    )

}

export default AbusiveWordDetector;