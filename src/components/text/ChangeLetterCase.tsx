import { Button, Card, CardActions, CardContent, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { useEffect, useState } from "react"
import { alternateCase } from "../../utils/string"
import HeadTitle from "../share/headTitle"
import MultilineTextFiled from "../share/MultilineTextField"

type Props = {
    onBack: () => void
}
const ChangeLetterCase = (props: Props) => {


    const { onBack } = props
    const [value, setValue] = useState<string>('')
    const [result, setResult] = useState<string>('')
    const [selectedCase, setSelectedCase] = useState('')

    useEffect(() =>{
        console.log(selectedCase)
        changeCase(value, selectedCase)
    }, [selectedCase])

    const changeCase = (value: string, selectedCase: string) =>{

        if(selectedCase === 'upper'){
            setResult(value.toUpperCase())
        }
        else if(selectedCase === 'lower'){
            setResult(value.toLowerCase())
        }
        else{
            setResult(alternateCase(value, selectedCase === 'alternateUpper' ? true : false))
        }
    }

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
        setValue(val)
        changeCase(val, selectedCase)  
    }

    return(
        <>
             <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>
            <div style={{ display: 'flex', justifyContent:'center'}}>
                <HeadTitle
                 title='Change letter case'
                />
            </div>
           
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
           <div>
           <FormControl>
                <FormLabel>Select case</FormLabel>
                <RadioGroup
                    row
                    onChange={(e) => setSelectedCase(e.target.value)}
                >
                    <FormControlLabel value="upper" control={<Radio />} label="Upper case" />
                    <FormControlLabel value="lower" control={<Radio />} label="Lower case" />
                    <FormControlLabel value="alternateUpper" control={<Radio />} label="Alternate case(Upper first)" />                   
                    <FormControlLabel value="alternateLower" control={<Radio />} label="Alternate case(Lower first)" />                   

                </RadioGroup>
                </FormControl>
           </div>
                <MultilineTextFiled 
                    onChange={onChange}
                    value={value}
                />
            </div>
            {result && selectedCase && <div style={{ marginTop: '30px', display:'flex', justifyContent: 'center'  }}>
                <Divider/>
                    <Card 
                        sx={{ 
                            zIndex: 100, 
                            height: 'auto',
                            width:{
                                lg: '60%',
                                xs: '90%'
                            },
                            textAlign: 'center'
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

export default ChangeLetterCase;