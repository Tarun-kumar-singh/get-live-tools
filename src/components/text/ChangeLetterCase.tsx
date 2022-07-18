import { Button, Card, CardActions, CardContent, Divider } from "@mui/material"
import { useState } from "react"
import HeadTitle from "../share/headTitle"
import MultilineTextFiled from "../share/MultilineTextField"

type Props = {
    onBack: () => void
}
const ChangeLetterCase = (props: Props) => {


    const { onBack } = props
    const [value, setValue] = useState<string>('')
    const [result, setResult] = useState<string>('')

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
        setResult(val.split('').reverse().join(''))
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
           
            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <MultilineTextFiled 
                    onChange={onChange}
                    value={value}
                />
            </div>
            {result && <div style={{ marginTop: '30px', display:'flex', justifyContent: 'center'  }}>
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