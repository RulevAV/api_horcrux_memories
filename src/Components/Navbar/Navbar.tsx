import React, {useState} from 'react'
import {NavLink} from "react-router-dom";

type PropsType = {
    Logout: ()=>void,
    authCookie: ()=>void,
    isAuthenticated: boolean
    roles:Array<string>
}

const Navbar:React.FC<PropsType> = ({...props}) =>{
    useState(()=>{
        props.authCookie();
    });
    let Administrator= props.roles?.filter((item:string) => item === "Administrator");
    let Moderator= props.roles?.filter((item:string) => item === "Moderator");

    return  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <NavLink className="navbar-brand " to={"/"} >SPA_HorcruxMemories</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                   {!!Administrator.length?<li className="nav-item">
                        <NavLink className="nav-link active" to={"/Admin"}>Администратор</NavLink>
                    </li>:null
                    }
                    {!!Moderator.length?<li className="nav-item">
                        <NavLink className="nav-link active" to={"/Moderator"}>Модератор</NavLink>
                    </li>:null
                    }
                </ul>

                {!props.isAuthenticated
                    ?<NavLink className="btn btn-outline-light" to={'/login'} > Войти</NavLink>
                    :<button onClick={props.Logout} className="btn btn-outline-light"> Выйти</button>

                }
            </div>
        </div>
    </nav>

}




export default Navbar;