import { Box, Button, Slider, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useEffect, useState } from "react"
import Image from 'next/image'
import Jimp from 'jimp';
import AppLoader from "../share/appLoader";
import { ObjectType } from "../../types/comman/object";

const OperationValue: ObjectType = {
    rotation:{
        min: 0,
        max: 360,
        step: 1,
        message:'Rotation'
    },
    blur: {
        min: 1,
        max: 100,
        step: 1,
        message:'Blur'
    },
    brightness: {
        min: -1,
        max: 1,
        step: 0.1,
        message:'Brightness'
    },
    contrast:{
        min: -1,
        max: 1,
        step: 0.1,
        message:'Contrast'
    },
    opacity:{
        min: 0,
        max: 1,
        step: 0.1,
        message: 'Opacity'
    },
    fade:{
        min: 0,
        max: 1,
        step: 0.1,
        message: 'Fade'
    }

}
type Props = {
    onBack: () => void
}
const ColorManipulation = (props: Props) =>{

    const { onBack } = props
    const [selectedFile, setSelectedFile] = useState<Blob | MediaSource | undefined>()
    const [previewImage, setPreviewImage] = useState<string>('')
    const [selectedImageBase64, setSelectedImageBase64] = useState<string>('')

    const [displayLoader, setDisplayLoader] = useState(false)

    const [changeValue, setChangeValue] = useState<any>({ rotation: 0, blur: 0, fade: 0, brighness: 0, contrast: 0, opacity: 0 })
    const [selectedOperation, setSelectedOperation] = useState('')
    const [selectedOperationValue, setSelectedOperationValue] = useState({} as any) // OperatioValue[selectedOperation]

    const onClickBack = () =>{
        onBack()
    }

    const onChangeBlurValue = (e: any, value: any) =>{
        console.log(value)
        console.log(selectedOperation)
        editOperation(URL.createObjectURL(selectedFile as Blob), value)
    }

    const onSelectFile = async(e: any) => {
        setDisplayLoader(true)
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            setDisplayLoader(false)
            return
        }
        
        setSelectedFile(e.target.files[0])
        const selectedImageURL = URL.createObjectURL(e.target.files[0])
        const jimpRead = await Jimp.read(selectedImageURL)
        
        jimpRead.getBase64(Jimp.MIME_JPEG, (err, src) =>{
            setSelectedImageBase64(src)
            setPreviewImage(src)
        })
        setDisplayLoader(false)
 
    }
    
    const downloadImageFromBase64 = (base64Data: string) =>{
        var a = document.createElement("a"); //Create <a>
        a.href = base64Data; //Image Base64 Goes here
        a.download = "Image.png"; //File name Here
        a.click(); //Downloaded file
    
    }

    const reset = () =>{
        setSelectedFile(undefined)
        setPreviewImage('')
        setSelectedImageBase64('')

    }

   const editOperation = async(imageURL: string, editValue: number) =>{
    
    setDisplayLoader(true)

    const image = await Jimp.read(imageURL);
    let resultImage
    
    if(selectedOperation === 'brightness'){
        resultImage = image.rotate(editValue);
     }
     else if(selectedOperation === 'contrast'){
        resultImage = image.contrast(editValue)
     }
 
    else if(selectedOperation === 'opacity'){
        resultImage = image.opacity(editValue) 
    }
    else if(selectedOperation === 'fade'){
        resultImage = image.fade(editValue) 
    }
    else if(selectedOperation === 'rotation'){
        resultImage = image.rotate(editValue) 
    }
    else if(selectedOperation === 'blur'){
        resultImage = image.blur(editValue) 
    }

    (resultImage as any).getBase64(Jimp.MIME_JPEG, (err: any, src: any) =>{
        setPreviewImage(src)
        setDisplayLoader(false)
    })

   }

   const handleOperationTab = (event: React.MouseEvent<HTMLElement>, value: any): void =>{
        console.log(value)

        // Change the operation name
        setSelectedOperation(value)
        setSelectedOperationValue({...OperationValue[value]})

        console.log(changeValue)
    }

    const sliderValueChange = (e: any, val: any) =>{
        console.log(val)
        setChangeValue({
            ...changeValue,
            [selectedOperation]: val
        })
    }

    return(
        <>
            <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>
         
            <div style={{ display: 'flex', justifyContent: 'center', marginTop:'5px', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>         

            {previewImage
             && <div>
                <ToggleButtonGroup
                    value={selectedOperation}
                    exclusive
                    onChange={handleOperationTab}
                    aria-label="text alignment"
                    size="small"
                >
                    {
                        Object.keys(OperationValue).map((el: any, index) =>(
                            <ToggleButton key={el.message} value={el}>
                                {OperationValue[el].message}
                            </ToggleButton>
                        ))
                    }
                 
                </ToggleButtonGroup>
            </div>}

                {previewImage && <div style={{ marginTop: 0 }}>
                    <Button disabled={displayLoader} onClick={reset} variant="text">Upload another image</Button> 
                </div>}
                
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width: '200px', height: '250px', border: '2px black', borderStyle: 'dotted'}}>
                    {!previewImage ? 
                        <Button disabled={displayLoader} variant="contained" component="label">
                                {displayLoader ? 'Uploading...' : 'Upload image'}
                            <input hidden onChange={onSelectFile} accept="image/*" multiple type="file" />
                        </Button> : 
                        <>
                        <Image
                            src={previewImage}
                            alt="Picture of the author"
                            width={200}
                            height={250}
                        />
                        <div style={{ position:'absolute'}}>
                            {displayLoader && <AppLoader />}
                        </div>

                        </>
                    }  
                </div>

            </div>
        
            <Box
                sx={{
                    display: 'flex',
                    justifyContent:'center', 
                    flexDirection:'column',
                    alignItems:'center'
                }}
            >
           
            <>
                {previewImage && selectedOperation &&
                <>  
                    <p>{selectedOperationValue.message}</p> 
                    <Slider
                       onChange={sliderValueChange}
                        size="small"
                        value={changeValue[selectedOperation]}
                        min={selectedOperationValue.min}
                        max={selectedOperationValue.max}
                        step={selectedOperationValue.step}
                        valueLabelDisplay="auto"
                        sx={{
                            width: {
                                lg: '40%',
                                xs: '80%'
                            }
                        }}
                        onChangeCommitted={onChangeBlurValue}
                    />
                </>
                }

            {previewImage && <div style={{ marginTop: '3%' }}>
                <Button onClick={() => downloadImageFromBase64(previewImage)} variant='outlined'>
                    Download
                </Button>
            </div>}

            </> 

            </Box>
        </>
    )
}

export default ColorManipulation;