import { Button, Switch } from "@mui/material"
import { useState } from "react"
import AppLoader from "../share/appLoader"
import Image from 'next/image'
import Jimp from 'jimp';

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
        console.log(editedImage)
        editedImage.getBase64(imageType, (err, src) =>{
            console.log(src)
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

    return(
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop:'5px', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>         
            {selectedImageUrl && <div style={{ marginTop: 0 }}>
                    <Button disabled={displayLoader} onClick={reset} variant="text">Upload another image</Button> 
                </div>}
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width: '200px', height: '250px', border: '2px black', borderStyle: 'dotted'}}>
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
                </div>
                {
                selectedImageUrl && 
                    <Button onClick={onDownload}> Downlaod blank and white</Button>
                }            
                </div>        
        </>
    )

}

export default BlackNWhite;
