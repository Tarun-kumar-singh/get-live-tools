import { Typography, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react"
import SelectImage from "../share/SelectImage"
import Jimp from 'jimp';
import { downloadImageFromBase64 } from "../../utils/image";

type Props = {
    onBack: () => void
}
const ImageQuality = (props: Props) => {

    const { onBack } = props

    const [displayLoader, setDisplayLoader] = useState(false)
    const [imageType, setImageType] = useState('')

    const [selectedImageUrl, setSelectedImageUrl] = useState('')

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

    return(
        <>
            <div>
              <Typography variant="h6" sx={{
                textAlign: 'center',
                marginTop: '-40px'
              }}>
                    Change image quality
              </Typography>
            </div>  
            <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection: 'column', gap: '10px'}}>
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


export default ImageQuality;