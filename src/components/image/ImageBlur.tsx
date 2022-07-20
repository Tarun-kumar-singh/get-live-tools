import { Button } from "@mui/material"


type Props = {
    onBack: () => void
}
const ImgeBlur = (props: Props) =>{

    const { onBack } = props
    const onClickBack = () =>{
        onBack()
    }
    
    return(
        <>
            <div style={{ marginLeft: '3%' }}>
                <Button onClick={onClickBack} variant='outlined'>Back</Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop:'10px' }}> 
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width: '200px', height: '250px', border: '2px black', borderStyle: 'dotted'}}>
                    <Button size="small" variant="contained">
                        Upload image
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>   
                </div>
            </div>

        </>
    )
}

export default ImgeBlur;