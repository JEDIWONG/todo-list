import { Outlet } from "react-router-dom"
import Header from "./component/header"

function Layout(){
    return(
        <>
            <Header></Header>
            <Outlet></Outlet>
        </>
    )
}

export default Layout