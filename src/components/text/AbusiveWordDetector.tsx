import {
    Alert,
    Button, Card, CardActions, CardContent, Divider, FormControl, 
    FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import React, { useEffect, useState } from "react";
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
    const [result, setResult] = useState('')

    const [snackBarMessage, setSnackBarMessage] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [displayAlert, setDisplayAlert] = useState<boolean>(false)

    useEffect(() =>{
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
          })
    }, [result])


    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([result], {
          type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "file.txt";
        document.body.appendChild(element);
        element.click();
    };

    const onClickBack = () =>{
        onBack()
    }

    const onChange = (val: string) =>{
        setAlert('', false)
        setValue(val)
    }

    const profaneWordsOperations = () => {
           setResult('')
           setDisplayAlert(false)
           setAlertMessage('')

            if(selectedValue === '1'){
               
                // list bad words
                const wordTokenProfanewords = value.split(' ').filter(el => filter.isProfane(el))
                if(wordTokenProfanewords.length === 0){
                    setAlert('No Bad word found', true)
                }
                console.log(wordTokenProfanewords)
                setResult(wordTokenProfanewords.join(','))
            }
            else if(selectedValue === '2') {
                // Replace with *
                const cleaned = filter.clean(value)
                if(!cleaned.includes('**')){
                    setAlert('No Bad word found', true)
                    return
                } 
                setResult(cleaned)
            }
            else if(selectedValue === '3') {
                // Remove bad words
                const cleanWords = value.split(' ').filter((el) => !filter.isProfane(el))
                console.log(cleanWords)
                if(cleanWords.join(' ').length === value.length){
                    setAlert('No Bad word found', true)
                    return  
                } 
                setResult(filter.clean(cleanWords.join(' ')))
            }
    } 
    
    const setAlert = (message: string, display?: boolean) =>{
        setAlertMessage(message)
        setDisplayAlert(display || false)
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
                            onChange={(e) =>{
                                setAlert('', false)
                                setSelectedValue(e.target.value)}
                            }
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Find bad words" />
                            <FormControlLabel value="2" control={<Radio />} label="Replace bad words with *" />
                            <FormControlLabel value="3" control={<Radio />} label="Remove bad word" />                   
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
                    onClick={() => profaneWordsOperations()}
                >
                    Find
                </Button>
            </div>
            {
                displayAlert &&
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <Alert style={{ width: '300px' }} icon={false} severity="success">
                        {alertMessage}
                </Alert>
                </div>
            }
            {result &&  <div style={{ marginTop: '30px', display:'flex', justifyContent: 'center'  }}>
                <Divider/>
                    <Card 
                        sx={{ 
                            zIndex: 100, 
                            height: 'auto',
                            width:{
                                lg: '60%',
                                xs: '90%'
                            },
                            textAlign: 'center',
                            marginBottom: '50px'
                        }}
                    >
                        <CardContent>
                            {result}
                        </CardContent>
                        <CardActions>
                            <div>
                                <Button onClick={() => navigator.clipboard.writeText(result)}>Copy</Button>
                                <Button onClick={() => downloadTxtFile()}>Download</Button>
                            </div>
                        </CardActions>
                    </Card>
            </div>}
        </>
    )

}

export default AbusiveWordDetector;