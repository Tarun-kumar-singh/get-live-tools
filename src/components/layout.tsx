import DekstopDrawer from './Drawer/DekstopDrawer';

const Layout = (props: any) => {
  
    const { children, ...restprops } = props;
    
    return (
      <>
        <DekstopDrawer
          {...restprops}
        >
          {children}
        </DekstopDrawer> 
      </>
    );

}

export default Layout;
