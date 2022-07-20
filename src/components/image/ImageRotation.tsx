import { Box, Button, Slider } from "@mui/material"
import { useEffect, useState } from "react"
import Image from 'next/image'
import Jimp from 'jimp';

type Props = {
    onBack: () => void
}
const ImageRotation = (props: Props) =>{

    const { onBack } = props
    const [selectedFile, setSelectedFile] = useState<Blob | MediaSource | undefined>()
    const [previewImage, setPreviewImage] = useState<string>('')
    const [selectedImageBase64, setSelectedImageBase64] = useState<string>('')

    const onClickBack = () =>{
        onBack()
    }

    const onChangeBlurValue = (value: any) =>{
        makeBlur(URL.createObjectURL(selectedFile as Blob), value)
    }

    const onSelectFile = async(e: any) => {
       
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        
        setSelectedFile(e.target.files[0])
        const selectedImageURL = URL.createObjectURL(e.target.files[0])
       
        ;(await Jimp.read(selectedImageURL)).getBase64(Jimp.MIME_JPEG, (err, src) =>{
            console.log(src)
            setSelectedImageBase64(src)
            setPreviewImage(src)
        })
 
    }

    const makeBlur = async(imageURL: string, bluredValue: number) =>{
        
        if(bluredValue === 0){
            setPreviewImage(selectedImageBase64)
            return
        }

        const image = await Jimp.read(imageURL);
        const bluredImage = image.rotate(bluredValue);
 
        bluredImage.getBase64(Jimp.MIME_JPEG, (err, src) =>{
            setPreviewImage(src)
        })
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

    return(
        <>
            <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>
         
            <div style={{ display: 'flex', justifyContent: 'center', marginTop:'10px', flexDirection: 'column', alignItems: 'center', gap: '20px' }}> 
                {previewImage && <div style={{ marginTop: '-50px' }}>
                    <Button onClick={reset} variant="text">Upload another image</Button>
                </div>}
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width: '200px', height: '250px', border: '2px black', borderStyle: 'dotted'}}>
                    {!previewImage ? 
                        <Button variant="contained" component="label">
                            Upload image
                            <input hidden onChange={onSelectFile} accept="image/*" multiple type="file" />
                        </Button> : 
                        <Image
                            src={previewImage}
                            alt="Picture of the author"
                            width={200}
                            height={250}
                        />
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
                    <p>Rotation value(in deg)</p> 
                    <Slider
                        size="small"
                        defaultValue={0}
                        min={0}
                        max={360}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        // onChange={onChangeBlurValue}
                        sx={{
                            width: {
                                lg: '40%',
                                xs: '80%'
                            }
                        }}
                        onChangeCommitted={(e: any, val: number) =>{
                            onChangeBlurValue(val)
                        } }
                    />
                </>
                }

            {previewImage && <div style={{ marginTop: '3%' }}>
                <Button onClick={() => downloadImageFromBase64(previewImage)} variant='outlined'>Download</Button>
            </div>}

            </> 

            </Box>
        </>
    )
}

export default ImageRotation;