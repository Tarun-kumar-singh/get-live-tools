import { Box, Button } from "@mui/material";
import AppLoader from "./appLoader";
import Image from 'next/image'

type Props = {
    onSelectFile: (e: any) => void,
    displayLoader: boolean,
    selectedImage: any,
    resultImage: any
    onDownload: () => void,
    reset: () => void
}
const SelectImage2 = (props:Props) =>{

    const { displayLoader, reset, onSelectFile, onDownload, resultImage, selectedImage } = props

    return(
        <>

        <Box 
            style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                flexWrap:'wrap', 
                gap: '4px'
            }}
            >

            <div style={{ display:'flex', alignItems:'center', flexDirection: 'column'}}>
                <div>
                    {selectedImage && 
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
                        height: '250px', 
                        border: '2px black', 
                        borderStyle: 'dotted'
                    }}
                    sx={{
                        width: { lg: '25vw', xs: '80vw' },
                    }}
                    >
                    <>
                            {!selectedImage && !displayLoader && <Button disabled={displayLoader} variant="contained" component="label">
                                {displayLoader ? 'Uploading...' : 'Upload image'}
                                <input hidden onChange={onSelectFile} accept="image/*" multiple type="file" />
                            </Button>}
                    
                    
                        {selectedImage && 
                            <>
                                <Image
                                    src={selectedImage}
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
                </Box>
            </div>
            
            {/* Result image */}
            {resultImage && <div style={{ display:'flex', alignItems:'center', flexDirection: 'column'}}>
                <Box 
                    style={{ 
                        display:'flex', 
                        justifyContent:'center', 
                        alignItems:'center', 
                        height: '250px', 
                        border: '2px black', 
                        borderStyle: 'dotted'
                    }}
                    sx={{
                        width: { lg: '25vw', xs: '80vw' },
                    }}
                    >                   
                    <>  
                        {resultImage && 
                            <>
                                <Image
                                    src={resultImage}
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
                </Box>
                <div>
                    {
                        resultImage && 
                            <Button disabled={displayLoader} onClick={onDownload}>Downlaod</Button>
                    }   
                </div>
            </div>}

        </Box>

        </>
    )
}

export default SelectImage2;