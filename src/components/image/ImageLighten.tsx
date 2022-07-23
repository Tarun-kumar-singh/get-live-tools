import { Typography, Button, Stack, Slider } from "@mui/material"
import Jimp from "jimp"
import { useState } from "react"
import AppLoader from "../share/appLoader"
import SelectMenuField from "../share/form/SelectMenuField"
import SelectImage from "../share/SelectImage"

type Props = {
    onBack: () => void
}
const LightenImage = (props: Props) => {

    const { onBack } = props

    const [displayLoader, setDisplayLoader] = useState(false)
    const [imageType, setImageType] = useState('')

    const [selectedImageUrl, setSelectedImageUrl] = useState('')
    const [changeFormatValue, setChangeFormatValue] = useState('')

    const [resultImage, setResultImage] = useState('')
    const [silderValue, setSliderValue] = useState<any>('')

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
 
           
        const jimpRead = await Jimp.read(selectedImageURL)
        const resultImg = jimpRead.threshold({ max: 0 });

        resultImg.getBase64(e.target.files[0].type, (err, src) =>{
            setResultImage(src)
            setDisplayLoader(false)
        })

    }
    
    const onClickBack = () =>{
        onBack()
    }

    const downloadImageFromBase64 = (base64Data: string, name: string) =>{
        var a = document.createElement("a"); //Create <a>
        a.href = base64Data; //Image Base64 Goes here
        a.download = name; //File name Here
        a.click(); //Downloaded file
    }

    const reset = () =>{
        setImageType('')
        setSelectedImageUrl('')
        setResultImage('')
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
       const resultImg = jimpRead.threshold({ max: val })
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
                    Lighten image
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
                <Slider
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
                    />
                </div>
            </div>
        </>
    )

}

export default LightenImage;