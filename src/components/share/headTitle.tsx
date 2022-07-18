import { Typography } from "@mui/material"


type Props = {
    title: string,
    caption?: string
}
const HeadTitle = (props: Props) => {

    const { title, caption } = props

    return(
        <div style={{ display: 'flex', flexDirection:'column'}}>
            <Typography variant="h6">{title}</Typography>
            {caption && <Typography variant="caption">({caption})</Typography>}
        </div>
    )

}

export default HeadTitle;
