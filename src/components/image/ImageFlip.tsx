import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import SelectImage from "../share/SelectImage";
import Jimp from 'jimp';
import { Preview } from "@mui/icons-material";

const FlipTypes: Array<any> = [
    {label: 'Horizontal', value:'horz'},
    {label: 'Verticle', value:'vert'},
]
type Props = {
    onBack: () => void;
}
const ImageFlip = (props: Props) => {

    const { onBack } = props

    const [displayLoader, setDisplayLoader] = useState(false)
    const [imageType, setImageType] = useState('')

    const [selectedImageUrl, setSelectedImageUrl] = useState('')

    const [selectedFlipType, setSelectedFlipType] = useState('')

    const onSelectFile = async(e: any) => {
        setDisplayLoader(true)
        if (!e.target.files || e.target.files.length === 0) {
            setDisplayLoader(false)
            return
        }
    
        setImageType(e.target.files[0].type)
        const selectedImageURL = URL.createObjectURL(e.target.files[0])
        setSelectedImageUrl(selectedImageURL)
        setDisplayLoader(false)
    }

    const reset = () =>{
        setImageType('')
        setSelectedImageUrl('')
    }

    const onClickBack = () =>{
        onBack()
    }

    const onDownload = async() =>{
        setDisplayLoader(true)
        const jimpRead = await Jimp.read(selectedImageUrl)
        const editedImage = jimpRead.greyscale()
        editedImage.getBase64(imageType, (err, src) =>{
            setDisplayLoader(false)
            downloadImageFromBase64(src, `Image.${imageType.split('/')[1]}`)
        })   
    }

    const downloadImageFromBase64 = (base64Data: string, name: string) =>{
        var a = document.createElement("a"); //Create <a>
        a.href = base64Data; //Image Base64 Goes here
        a.download = name; //File name Here
        a.click(); //Downloaded file
    }

    const selectFlipType = async(e: any, value: any) =>{
        console.log(value)
        setSelectedFlipType(value)
        const resImg = await Jimp.read(selectedImageUrl)
        const flipedImg = resImg.flip(true, true)
       
        flipedImg.getBase64( imageType, (err, src) =>{
            setSelectedImageUrl(src)
        })
        
    }

    return(
        <>
            <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection: 'column', gap: '10px'}}>
            {selectedImageUrl && 
                <ToggleButtonGroup
                    value={selectedFlipType}
                    exclusive
                    onChange={selectFlipType}
                    size="small"
                >
                {
                    FlipTypes.map((el: any, index) =>(
                        <ToggleButton key={el.label} value={el.value}>
                            {el.label}
                        </ToggleButton>
                    ))
                }
            </ToggleButtonGroup>
            }
                {selectedImageUrl && 
                    <div style={{ marginTop: 0 }}>
                        <Button disabled={displayLoader} onClick={reset} variant="text">Upload another image</Button> 
                    </div>
                }
                <SelectImage
                    displayLoader={displayLoader}
                    onSelectFile={onSelectFile}
                    selectedImageUrl={selectedImageUrl}
                />
                {
                selectedImageUrl && 
                    <Button onClick={onDownload}>Downlaod</Button>
                }   
            </div>
        </>
    )

}

export default ImageFlip;