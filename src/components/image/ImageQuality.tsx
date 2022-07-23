import { Typography, Button, FormGroup, FormControlLabel, Checkbox, Box } from "@mui/material"
import { useState } from "react"
import Jimp from 'jimp';
import { downloadImageFromBase64 } from "../../utils/image";
import Image from 'next/image'
import AppLoader from "../share/appLoader";

type Props = {
    onBack: () => void
}
const ImageQuality = (props: Props) => {

    const { onBack } = props

    const [displayLoader, setDisplayLoader] = useState(false)
    const [imageType, setImageType] = useState('')

    const [selectedImageUrl, setSelectedImageUrl] = useState('')
    const [selctedImageProperty, setSelctedImageProperty] = useState({} as any)

    const [resultImage, setResultImage] = useState('')


    const onSelectFile = async(e: any) => {
        setDisplayLoader(true)
        if (!e.target.files || e.target.files.length === 0) {
            setDisplayLoader(false)
            return
        }

        const selectedImage = e.target.inneright
        console.log(selectedImage)

        setImageType(e.target.files[0].type)
        const selectedImageURL: any = URL.createObjectURL(e.target.files[0])
        console.log(selectedImageURL.innerHeight)
        setSelectedImageUrl(selectedImageURL)
        
        const jimpRead = await Jimp.read(selectedImageURL)
        const res = jimpRead.quality(0)
        res.getBase64(e.target.files[0].type, (err, src) =>{
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
            <div>
                {selectedImageUrl && 
                    <div style={{ marginTop: 0 }}>
                        <Button disabled={displayLoader} onClick={reset} variant="text">Upload another image</Button> 
                    </div>
                }
            </div>
            <Box 
                style={{ 
                    display:'flex', 
                    justifyContent:'center', 
                    alignItems:'center', 
                    height: '300px', 
                    border: '2px black', 
                    borderStyle: 'dotted'
                }}
                sx={{
                    width: {
                        lg: '45vw',
                        xs: '80vw'
                    }
                }}
                >
                    {!selectedImageUrl ? 
                        <Button disabled={displayLoader} variant="contained" component="label">
                                {displayLoader ? 'Uploading...' : 'Upload image'}
                            <input hidden onChange={onSelectFile} accept="image/*" multiple type="file" />
                        </Button> : 
                        <>
                            <Image
                                src={selectedImageUrl}
                                alt="Image is not displyaing"
                                width={200}
                                height={250}
                            />
                            <div style={{ position:'absolute'}}>
                                {displayLoader && <AppLoader />}
                            </div>
                        </>
                    }
            </Box>
            <div>
                {
                    selectedImageUrl && 
                        <Button disabled={displayLoader} onClick={onDownload}>Downlaod</Button>
                }   
            </div>
               
            </div>
        </>
    )

}


export default ImageQuality;