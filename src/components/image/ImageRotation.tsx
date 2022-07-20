import { Box, Button, Slider } from "@mui/material"
import { useEffect, useState } from "react"
import Image from 'next/image'
import Jimp from 'jimp';
import AppLoader from "../share/appLoader";

type Props = {
    onBack: () => void
}
const ImageRotation = (props: Props) =>{

    const { onBack } = props
    const [selectedFile, setSelectedFile] = useState<Blob | MediaSource | undefined>()
    const [previewImage, setPreviewImage] = useState<string>('')
    const [selectedImageBase64, setSelectedImageBase64] = useState<string>('')

    const [displayLoader, setDisplayLoader] = useState(false)
    const [changeValue, setChangeValue] = useState()
    const [changeValUnitMsg, setChangeValUnitMsg] = useState('Rotation value(in deg):')

    const onClickBack = () =>{
        onBack()
    }

    const onChangeBlurValue = (e: any, value: any) =>{
        setChangeValue(value)
        makeBlur(URL.createObjectURL(selectedFile as Blob), value)
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
       
        ;(await Jimp.read(selectedImageURL)).getBase64(Jimp.MIME_JPEG, (err, src) =>{
            setSelectedImageBase64(src)
            setPreviewImage(src)
        })
        setDisplayLoader(false)
 
    }

    const makeBlur = async(imageURL: string, bluredValue: number) =>{
        setDisplayLoader(true)
        if(bluredValue === 0){
            setPreviewImage(selectedImageBase64)
            setDisplayLoader(false)
            return
        }

        const image = await Jimp.read(imageURL);
        const bluredImage = image.rotate(bluredValue);
 
        bluredImage.getBase64(Jimp.MIME_JPEG, (err, src) =>{
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

    const onChangeContinueBlurValue = (e: any) =>{

    }

    return(
        <>
            <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>
         
            <div style={{ display: 'flex', justifyContent: 'center', marginTop:'10px', flexDirection: 'column', alignItems: 'center', gap: '20px' }}> 
                {previewImage && <div style={{ marginTop: '-50px' }}>
                    <Button disabled={displayLoader} onClick={reset} variant="text">Upload another image</Button> 
                </div>}
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width: '200px', height: '250px', border: '2px black', borderStyle: 'dotted'}}>
                    {!previewImage ? 
                        <Button variant="contained" component="label">
                                Upload image
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
                {previewImage &&
                <>  
                    <p>{changeValUnitMsg} {changeValue}</p> 
                    <Slider
                        size="small"
                        defaultValue={0}
                        min={0}
                        max={360}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        onChange={onChangeContinueBlurValue}
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

export default ImageRotation;