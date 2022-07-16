import { Avatar, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import makeStyles from "@mui/styles/makeStyles";
import FolderIcon from '@mui/icons-material/Folder';
import { Box } from "@mui/system";

type Props = {
    title: string
}
const useStyles = makeStyles({
    spacing:{
        paddingBottom: '5px'
    }
})
const ToolsCard = (props: Props): JSX.Element =>{
    
    const classes = useStyles()
    const { title } = props

    return(
        <>
            <Card sx={{ 
                cursor: 'pointer', 
                '&:hover': {  
                        opacity: '0.5',
                    },
                    zIndex: 100 
                }} 
                style={{ height: '120px', width: '200px', zIndex: 10,  }} variant="outlined"
            >           
                <CardContent>
                  <Box sx={{ display:'flex', justifyContent: 'center',  }}>
                    <Avatar variant="rounded">
                        <FolderIcon />
                    </Avatar>
                  </Box>
                </CardContent>    

                <CardActions sx={{ 
                    MuiCardActions:{
                        display:'flex',
                        justifyContent: 'center'
                    }
                }} >
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0px' }}>
                        <Typography variant="body2">
                            {title}
                        </Typography>
                    </div>
                </CardActions> 

            </Card>

        </>
    )
}

export default ToolsCard;