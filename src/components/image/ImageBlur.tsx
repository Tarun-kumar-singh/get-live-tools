import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import Image from 'next/image'
import Jimp from 'jimp';

type Props = {
    onBack: () => void
}
const ImgeBlur = (props: Props) =>{

    const { onBack } = props
    const [selectedFile, setSelectedFile] = useState()
    const [previewImage, setPreviewImage] = useState<string>('')

    useEffect(() =>{
        console.log(previewImage)
    }, [previewImage])

    const onClickBack = () =>{
        onBack()
    }

    const onSelectFile = async(e: any) => {
       
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        
        setSelectedFile(e.target.files[0])
        const selectedImageURL = URL.createObjectURL(e.target.files[0])
        makeBlur(selectedImageURL, 50)
 
    }

    const makeBlur = async(imageURL: string, bluredValue: number) =>{
        const image = await Jimp.read(imageURL);
        const bluredImage = image.blur(bluredValue);
 
        bluredImage.getBase64(Jimp.MIME_JPEG, (err, src) =>{
            setPreviewImage(src)
        })
    }
    

    const downloadImageFromBase64 = (base64Data: string) =>{
        var a = document.createElement("a"); //Create <a>
        a.href = base64Data; //Image Base64 Goes here
        a.download = "Image.png"; //File name Here
        a.click(); //Downloaded file
    
    }

    return(
        <>
            <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>
         
            <div style={{ display: 'flex', justifyContent: 'center', marginTop:'10px' }}> 
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width: '200px', height: '250px', border: '2px black', borderStyle: 'dotted'}}>
                    {!previewImage ? 
                        <Button variant="contained" component="label">
                            Upload image
                            <input hidden onChange={onSelectFile} accept="image/*" multiple type="file" />
                        </Button> : 
                        <Image
                            src={previewImage}
                            alt="Picture of the author"
                            width={200}
                            height={250}
                        />
                    }  
                </div>
            </div>

            <div style={{ marginLeft: '3%' }}>
                <Button onClick={() => downloadImageFromBase64(previewImage)} variant='outlined'>Download</Button>
            </div>
        </>
    )
}

export default ImgeBlur;