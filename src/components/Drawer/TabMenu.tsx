import { useContext, useEffect, useState } from "react";
import {  Box, List, Tab, Tabs } from "@mui/material";
import {useRouter} from 'next/router';
import { Tabs as TabList } from "../../constants/GlobalConstants";
import DarkModeContext from "../../context/DarkModeContext";
 
type Props = {
    onListItemClick?: () => void
}
const TabMenu = (props: Props) =>{

    const router = useRouter()
    const {  handleDarkModeChange } = useContext(DarkModeContext);

    const [value, setValue] = useState(0);

    useEffect(() =>{
     const tabIndex =  TabList.findIndex(el => el.route === router.pathname)
     setValue(tabIndex !== -1 ? tabIndex : 0)
    }, [])

    useEffect(() =>{
      const tabIndexValue = getRouteIndex(router.pathname)
      setValue(tabIndexValue !== -1 ? tabIndexValue : 0 )
    }, [router.pathname])

    const getRouteIndex = (route: string): number  =>{
      const tabIndex =  TabList.findIndex(el => el.route === route)
      return tabIndex
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number, route: string) => {
      if(newValue === value){
        router.back()
        return
      }
      setValue(newValue);
      router.push(route)
    };

    return (
        <>
            <List>
              <Box sx={{ width: { lg: '100vw' } }}>
                <Tabs
                  value={value}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  textColor='inherit'
                  indicatorColor="secondary"
                >
                {TabList.map((tab: { label: string, route: string }, index: number) =>{

                return  (
                    <Tab 
                      key={tab.label} 
                      onClick={(e): any => handleChange(e, index, tab.route)} 
                      label={tab.label} 
                    />
                )
                })}
                </Tabs>
              </Box>
            </List>
        </>
      );
 } 

export default TabMenu;