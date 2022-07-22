import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

type Props = {
    label: string,
    handleChange: (value: any) => void,
    menuData: Array<{label: string, value: any}>,
    value: any
}
const SelectMenuField = (props:Props) =>{

    const { label, handleChange, menuData, value } =  props

    return(
        <>
            <FormControl>
                <InputLabel >{label}</InputLabel>
                <Select
                    style={{ width: '200px' }}
                    size="small"
                    value={value}
                    label="Age"
                    onChange={(e) => handleChange(e.target.value)}
                >
                    {
                        menuData.map((el: any) => (
                            <MenuItem value={el.value}>{el.label}</MenuItem>
                        ))
                    }
                </Select>
                </FormControl>
        </>
    )

}

export default SelectMenuField;