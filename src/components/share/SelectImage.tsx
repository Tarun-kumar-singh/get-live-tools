import { Button } from "@mui/material";
import AppLoader from "./appLoader";
import Image from 'next/image'

type Props = {
    onSelectFile: (e: any) => void,
    displayLoader: boolean,
    selectedImageUrl: string,
    onDownload: () => void,
    reset: () => void
}
const SelectImage = (props:Props) =>{

    const { displayLoader, reset, onSelectFile, onDownload, selectedImageUrl } = props

    return(
        <>
            <div>
                {selectedImageUrl && 
                    <div style={{ marginTop: 0 }}>
                        <Button disabled={displayLoader} onClick={reset} variant="text">Upload another image</Button> 
                    </div>
                }
            </div>
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width: '200px', height: '250px', border: '2px black', borderStyle: 'dotted'}}>
                   <>
                        {!selectedImageUrl && !displayLoader && <Button disabled={displayLoader} variant="contained" component="label">
                            {displayLoader ? 'Uploading...' : 'Upload image'}
                            <input hidden onChange={onSelectFile} accept="image/*" multiple type="file" />
                        </Button>}
                   
                  
                    {selectedImageUrl && 
                        <>
                            <Image
                                src={selectedImageUrl}
                                alt="Image is not displyaing"
                                width={200}
                                height={250}
                            />
                        </>
                    }
                    </>
                            <div style={{ position:'absolute'}}>
                                {displayLoader && <AppLoader />}
                            </div>
            </div>
            <div>
                {
                    selectedImageUrl && 
                        <Button disabled={displayLoader} onClick={onDownload}>Downlaod</Button>
                }   
            </div>
        </>
    )
}

export default SelectImage;