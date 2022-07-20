import { Button } from "@mui/material"
import { useState } from "react"
import Image from 'next/image'


type Props = {
    onBack: () => void
}
const ImgeBlur = (props: Props) =>{

    const { onBack } = props
    const [selectedFile, setSelectedFile] = useState()
    const [previewImage, setPreviewImage] = useState<any>()

    const onClickBack = () =>{
        onBack()
    }

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
console.log(e.target.files[0])
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])

        setPreviewImage(URL.createObjectURL(e.target.files[0]));

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

        </>
    )
}

export default ImgeBlur;