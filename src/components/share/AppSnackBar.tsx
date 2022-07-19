import { Snackbar } from "@mui/material";


type Props = {
    open: boolean
    onCloseSnackbarMessage: () => void,
    snackBarMessage: string
}
const AppSnackBar = (props: Props) =>{

    const { open, onCloseSnackbarMessage, snackBarMessage } = props

    return(
        <>
            <Snackbar
                open={open}
                    anchorOrigin={{ 
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                message={snackBarMessage}
                autoHideDuration={4000}
                onClose={onCloseSnackbarMessage}
            />
        </>
    )
}

export default AppSnackBar;