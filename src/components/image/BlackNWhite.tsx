import { Button } from "@mui/material"
import { useState } from "react"
import Jimp from 'jimp';
import SelectImage from "../share/SelectImage";

type Props = {
    onBack: () => void
}
const BlackNWhite = (props: Props) => {

    const { onBack } = props

    const [displayLoader, setDisplayLoader] = useState(false)
    const [imageType, setImageType] = useState('')

    const [selectedImageUrl, setSelectedImageUrl] = useState('')

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

    const onClickBack = () =>{
        onBack()
    }

    return(
        <>
            <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop:'5px', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>         
                <SelectImage
                    displayLoader={displayLoader}
                    onSelectFile={onSelectFile}
                    selectedImageUrl={selectedImageUrl}
                    onDownload={onDownload}
                    reset={reset}
                /> 
            </div>        
        </>
    )

}

export default BlackNWhite;
