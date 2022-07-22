import { Button } from "@mui/material";
import { useState } from "react";
import AppLoader from "../share/appLoader";
import Image from 'next/image'
import Jimp from 'jimp';


type Props = {
    onBack: () => void
}
const ChangeFormat = (props: Props) =>{

    const { onBack } = props

    const [selectedFile, setSelectedFile] = useState<Blob | MediaSource | undefined>()
    const [previewImage, setPreviewImage] = useState<string>('')
    const [selectedImageBase64, setSelectedImageBase64] = useState<string>('')

    const [displayLoader, setDisplayLoader] = useState(false)
    const [imageType, setImageType] = useState('')

    const [selectedImageUrl, setSelectedImageUrl] = useState('')

    const onSelectFile = async(e: any) => {
        setDisplayLoader(true)
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            setDisplayLoader(false)
            return
        }
    
        setSelectedFile(e.target.files[0])
        setImageType((e.target.files[0].type).split('/')[1])
        const selectedImageURL = URL.createObjectURL(e.target.files[0])
        setSelectedImageUrl(selectedImageURL)
        setDisplayLoader(false)
 
    }
    
    const onClickBack = () =>{
        onBack()
    }

    const changeFormatType = async(type: string) =>{
        setDisplayLoader(true)
        const jimpRead = await Jimp.read(selectedImageUrl)
        
        jimpRead.getBase64(Jimp.MIME_JPEG, (err, src) =>{
            setSelectedImageBase64(src)
            setPreviewImage(src)
            setDisplayLoader(false)
        })

    }
    
    return(
        <>
            <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop:'5px', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>         
               
                <div>{imageType}</div>
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width: '200px', height: '250px', border: '2px black', borderStyle: 'dotted'}}>
                    {!previewImage ? 
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
                </div>

            </div>
        </>
    )
}

export default ChangeFormat;