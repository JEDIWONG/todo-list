import "../style/header.css"
import logo from "../assets/logo.svg"

function header(){
    return(
        <>  
            <div className="header-container">
                <div className="header-logo">

                    <img src={logo}></img>
                    <h3>Mission Today</h3>
                    
                </div>

                <p>
                    "Prepare Your Day With A ToDo-List, Simple & Fast"
                </p>
            </div>
        </>
    )
}

export default header