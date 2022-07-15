import { useContext, useState } from "react";
import {  Box, FormControlLabel, List, ListItem, ListItemText, Switch, Tab, Tabs } from "@mui/material";
import {useRouter} from 'next/router';
import Link from 'next/link';
import { Tabs as TabList } from "../../constants/GlobalConstants";
import DarkModeContext from "../../context/DarkModeContext";
 
type Props = {
    onListItemClick?: () => void
}
const TabMenu = (props: Props) =>{

    const { onListItemClick } = props
    const router = useRouter()
    const {  handleDarkModeChange } = useContext(DarkModeContext);

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
        <>
            <List>
                {TabList.map((tab: { label: string, route: string }) => (
                    <Link key={tab.route} href={tab.route} passHref>
                        <Box sx={{ 
                width: { lg: '100vw' },  
              }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  textColor='inherit'
                  indicatorColor="secondary"
                >
                  <Tab label="Item One" />
                  <Tab label="Item Two" />
                  <Tab label="Item Three" />
                  <Tab label="Item Four" />
                  <Tab label="Item Five" />
                  <Tab label="Item Six" />
                  <Tab label="Item Seven" />
                </Tabs>
              </Box>
                    </Link>
                ))}
            </List>
        </>
      );
 } 

export default TabMenu;