import { Typography, Button, Slider } from "@mui/material"
import Jimp from "jimp"
import { useState } from "react"
import { downloadImageFromBase64 } from "../../utils/image"
import SelectImage from "../share/SelectImage"

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
           
        const jimpRead = await Jimp.read(selectedImageURL)
        const resultImg = jimpRead.circle()
        resultImg.getBase64(e.target.files[0].type, (err, src) =>{
            setResultImage(src)
            setDisplayLoader(false)
        })

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

    const sliderValueChange = (e: any, val: any) =>{
        console.log(val)
        setSliderValue(val)
    }
    const onCommitSliderValue = (e: any, value: any) =>{
        setDisplayLoader(true)
        lightenImage(selectedImageUrl, value)
    }

    const lightenImage = async(imgUrl: string, val:any) =>{
       const jimpRead = await Jimp.read(imgUrl)
       const resultImg = jimpRead.threshold({ max: val, autoGreyscale: false })
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

            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection: 'column', gap: '10px'}}>
                <SelectImage
                    displayLoader={displayLoader}
                    onSelectFile={onSelectFile}
                    selectedImageUrl={resultImage}
                    onDownload={onDownload}
                    reset={reset}
                />
                <div>
                </div>
                {selectedImageUrl && <Slider
                       onChange={sliderValueChange}
                        size="small"
                        value={silderValue}
                        min={0}
                        max={255}
                        step={1}
                        valueLabelDisplay="on"
                        sx={{
                            width: {
                                lg: '40%',
                                xs: '80%'
                            }
                        }}
                        onChangeCommitted={onCommitSliderValue}
                    />}
            </div>
        </>
    )

}

export default ImageCircle;