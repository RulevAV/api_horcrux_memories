import React from 'react'
import {NavLink} from "react-router-dom";
import {Burger} from "./Burger/Burger";
import {Menu} from "./ItemsMenu/ItemsMenu";

type TypeProps= {
    state:{
        isAuthenticated:boolean,
        roles : Array<string>
    },
    Logout:()=>void,
}


const Navbar:React.FC<TypeProps> = ({state,Logout}) =>{

    return  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <NavLink className="navbar-brand " to={"/"} >SPA_HorcruxMemories</NavLink>
            <Burger/>
            <div className="collapse navbar-collapse" id="navbar">
                <Menu roles={state.roles}/>

                {!state.isAuthenticated
                    ?<NavLink className="btn btn-outline-light" to={'/login'}> Войти</NavLink>
                    :<NavLink className="btn btn-outline-light" to={'/login'} onClick={Logout}> Выйти</NavLink>
                }
            </div>
        </div>
    </nav>
}

export default Navbar;