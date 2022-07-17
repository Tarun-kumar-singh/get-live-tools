import { OutlinedInput } from "@mui/material";

type Props = {
    placeholder?: string, 
    rows?: number, 
    onChange: (value: string) => void, 
    value: string
}
const MultilineTextFiled = (props: Props) => {

    const { placeholder, rows, onChange, value } = props

    return(
        <>
           <OutlinedInput 
                value={value}
                placeholder={placeholder || "Please enter text"}  
                multiline 
                rows={rows || 11} 
                sx={{
                    width:{
                        lg: '60%',
                        xs: '90%'
                    },
                    textAlign: 'center'
                }}
                onChange={(e) => onChange(e.target.value) }
            />
        </>
    )

}

export default MultilineTextFiled;