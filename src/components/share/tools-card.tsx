import { Card, CardActionArea, Typography } from "@mui/material"
import makeStyles from "@mui/styles/makeStyles";

type Props = {
    title: string
}
const useStyles = makeStyles({
    root : { 
    }
})
const ToolsCard = (props: Props): JSX.Element =>{
    
    const classes = useStyles()
    const { title } = props

    return(
        <>
            <Card className={classes.root}  style={{ height: '80px', width: '200px', zIndex: 10,  }} variant="outlined">           
               <CardActionArea>
                <div style={{  display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="caption">
                            {title}
                        </Typography>
                </div>
               </CardActionArea>         
            </Card>

        </>
    )
}

export default ToolsCard;