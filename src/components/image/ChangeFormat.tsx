import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AppLoader from "../share/appLoader";
import Image from 'next/image'
import Jimp from 'jimp';
import SelectMenuField from "../share/form/SelectMenuField";
import { ObjectType } from "../../types/comman/object";

const menuData: Array<{label: string, value: any}> = [
    { label: 'PNG', value: Jimp.MIME_PNG},
    { label: 'JPEG', value: Jimp.MIME_JPEG},
    { label: 'GIF', value: Jimp.MIME_GIF},
    { label: 'TIF', value: Jimp.MIME_TIFF}
]

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

    const [changeFormatValue, setChangeFormatValue] = useState('')

    useEffect(() =>{
        console.log(changeFormatValue)
      }, [changeFormatValue])

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
        console.log(Jimp.MIME_JPEG)
        setSelectedImageUrl(selectedImageURL)
        setDisplayLoader(false)
 
    }
    
    const onClickBack = () =>{
        onBack()
    }

    const changeFormatType = async(type: string) =>{
        setDisplayLoader(true)
        const jimpRead = await Jimp.read(selectedImageUrl)
        
        jimpRead.getBase64(changeFormatValue, (err, src) =>{
            setSelectedImageBase64(src)
            setPreviewImage(src)
            setDisplayLoader(false)
            downloadImageFromBase64(src, `Image.${type.split('/')[1]}`)
        })

    }

    const downloadImageFromBase64 = (base64Data: string, name: string) =>{
        console.log(name)
        var a = document.createElement("a"); //Create <a>
        a.href = base64Data; //Image Base64 Goes here
        a.download = name; //File name Here
        a.click(); //Downloaded file
    }
    
    return(
        <>
            <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop:'5px', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>         
               
                <div>{imageType}</div>
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

                <Stack direction='column' style={{ marginTop: '20px' }}>
                    <SelectMenuField
                        menuData={menuData}
                        value={changeFormatValue}
                        handleChange={(value) => setChangeFormatValue(value)}
                        label='Selct format'
                    />
                    <Button style={{marginTop: '20px'}} size="small" disabled={!changeFormatValue} onClick={() => changeFormatType(changeFormatValue)}> Download</Button>
                </Stack>     
                
            </div>
        </>
    )
}

export default ChangeFormat;