import { Avatar, Card, CardActionArea, CardActions, CardContent, SvgIconProps, Typography } from "@mui/material"
import makeStyles from "@mui/styles/makeStyles";
import FolderIcon from '@mui/icons-material/Folder';
import { Box } from "@mui/system";

type Props = {
    title: string,
    Icon?: any,
    onToolCardClick?: (data: any) => void
}
const useStyles = makeStyles({
    spacing:{
        paddingBottom: '5px'
    }
})
const ToolsCard = (props: Props): JSX.Element =>{
    
    const classes = useStyles()
    const { Icon, onToolCardClick, title } = props

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
                onClick={onToolCardClick}
           >           
                <CardContent>
                  <Box sx={{ display:'flex', justifyContent: 'center',  }}>
                    <Avatar sx={{ width: '100%', height: '55px', bgcolor: '#0ddca6' }} variant="rounded">
                     { Icon ||  title[0].toUpperCase()}
                    </Avatar>
                  </Box>
                </CardContent>    

                <CardActions>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        width: '100%'
                    }}>
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