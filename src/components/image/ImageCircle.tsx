import { Typography, Button, Slider, Box } from "@mui/material"
import Jimp from "jimp"
import { useState } from "react"
import { downloadImageFromBase64 } from "../../utils/image"
import SelectImage from "../share/SelectImage"
import SelectImage2 from "../share/SelectImage2"

type Props = {
    onBack: () => void
}
const ImageCircle = (props: Props) => {

    const { onBack } = props

    const [displayLoader, setDisplayLoader] = useState(false)
    const [imageType, setImageType] = useState('')

    const [selectedImageUrl, setSelectedImageUrl] = useState('')
    const [changeFormatValue, setChangeFormatValue] = useState('')

    const [resultImage, setResultImage] = useState('')
    const [selectedImage, setSelectedImage] = useState('')

    const [silderValue, setSliderValue] = useState<any>(255)

    const onSelectFile = async(e: any) => {
        setDisplayLoader(true)
        if (!e.target.files || e.target.files.length === 0) {
            setDisplayLoader(false)
            return
        }
    
        setImageType((e.target.files[0].type))
        const selectedImageURL = URL.createObjectURL(e.target.files[0])
        setSelectedImageUrl(selectedImageURL) 
        setDisplayLoader(false)

    }
    
    const onClickBack = () =>{
        onBack()
    }

    const reset = () =>{
        setImageType('')
        setSelectedImageUrl('')
        setResultImage('')
        setSliderValue(255)
    }
    
    const onDownload = async() =>{
        downloadImageFromBase64(resultImage, `Image.${imageType.split('/')[1]}`)
    }

    const edit = async() =>{
        setDisplayLoader(true)
       const jimpRead = await Jimp.read(selectedImageUrl)
       const resultImg = jimpRead.circle()
       resultImg.getBase64(imageType, (err, src) =>{
        setResultImage(src)
        setDisplayLoader(false)
       })

    }

    return(
        <>
           <div>
                <Typography variant="h6" sx={{
                    textAlign: 'center',
                    marginTop: '-40px'
                }}>
                    Circle an images
                </Typography>
            </div>  
            <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>

            <Box 
                style={{ 
                    display:'flex',  
                    flexDirection:'row',
                    justifyContent:'center',
                    flexWrap:'wrap'
                }}

            >
                <SelectImage2
                    displayLoader={displayLoader}
                    onSelectFile={onSelectFile}
                    selectedImage={selectedImageUrl}
                    resultImage={resultImage}
                    onDownload={onDownload}
                    reset={reset}
                />
            </Box>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop: '10px' }}>
                {selectedImageUrl && !resultImage && 
                    <Button disabled={displayLoader} onClick={edit} variant="contained">Circle image</Button>}
            </div>
        </>
    )

}

export default ImageCircle;