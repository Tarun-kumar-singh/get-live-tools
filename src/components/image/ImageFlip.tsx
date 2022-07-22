import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import SelectImage from "../share/SelectImage";
import Jimp from 'jimp';
import { downloadImageFromBase64 } from "../../utils/image";

type Props = {
    onBack: () => void;
}
const ImageFlip = (props: Props) => {

    const { onBack } = props

    const [displayLoader, setDisplayLoader] = useState(false)
    const [imageType, setImageType] = useState('')

    const [selectedImageUrl, setSelectedImageUrl] = useState('')

    const [flipValue, setFlipValue] = useState({ h: false, v: false } as any)

    const [resultImage, setResultImage] = useState('')

    const onSelectFile = async(e: any) => {
        setDisplayLoader(true)
        if (!e.target.files || e.target.files.length === 0) {
            setDisplayLoader(false)
            return
        }
    
        setImageType(e.target.files[0].type)
        const selectedImageURL = URL.createObjectURL(e.target.files[0])
        setSelectedImageUrl(selectedImageURL)
        
        const jimpRead = await Jimp.read(selectedImageURL)
        jimpRead.getBase64(e.target.files[0].type, (err, src) =>{
            setResultImage(src)
            setDisplayLoader(false)
        })

    }

    const reset = () =>{
        setImageType('')
        setSelectedImageUrl('')
        setResultImage('')
    }

    const onClickBack = () =>{
        onBack()
    }

    const onDownload = async() =>{
        downloadImageFromBase64(resultImage, `Image.${imageType.split('/')[1]}`)
    }

    const onFlipImage = async() =>{
        setDisplayLoader(true)
        const resImg = await Jimp.read(selectedImageUrl)
        const flipedImg = resImg.flip(flipValue.h, flipValue.v)
        flipedImg.getBase64(imageType, (err, src) =>{
            setResultImage(src)
            setDisplayLoader(false)
        })   
    }

    const flipValueChange = (name: string, value: any) =>{
        setFlipValue({
            ...flipValue,
            [name]: value
        })
    }   

    return(
        <>
            <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection: 'column', gap: '10px'}}>
            {selectedImageUrl && 
                 <FormGroup>
                    <FormControlLabel value={flipValue.h} onChange={(e: any, val: any) => flipValueChange('h', val)} control={<Checkbox />} label='Horizontal' />
                    <FormControlLabel value={flipValue.v} onChange={(e: any, val: any) => flipValueChange('v', val)} control={<Checkbox />} label="Verticle" />
                    <Button onClick={onFlipImage}>Flip</Button>
               </FormGroup>
            }
                <SelectImage
                    displayLoader={displayLoader}
                    onSelectFile={onSelectFile}
                    selectedImageUrl={resultImage}
                    onDownload={onDownload}
                    reset={reset}
                />
               
            </div>
        </>
    )

}

export default ImageFlip;