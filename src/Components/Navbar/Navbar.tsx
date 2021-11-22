import React, {useEffect, useState} from 'react'
import {NavLink} from "react-router-dom";
import {TypeProps} from "./NavbarContainer";

const Burger = () =>{
    return <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                   data-bs-target="#navbar" aria-controls="navbar"
                   aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
}

const CreatorItem = (role:string,name:string,Link:string)=>{
    return {role,name,Link}
}

const AllItemsMenu = [
    CreatorItem("Administrator","Администратор","Admin"),
    CreatorItem("Moderator","Модератор","Moderator"),
];

const CreatorLogo = () => Promise.resolve("SPA_HorcruxMemories");

const itemsLink = (roles:Array<string>) =>{
    if(!roles) return null;

    const ItemsMenu = AllItemsMenu.filter(item => roles.includes(item.role));
    const ItemsMenuUI = ItemsMenu.map((u,index)=>{
        return <li key={index} className="nav-item">
            <NavLink className="nav-link active" to={"/"+u.Link}>{u.name}</NavLink>
        </li>
    })
    return ItemsMenuUI;
}

const Navbar:React.FC<TypeProps> = ({data,Logout,RefreshAuthCookie}) =>{

    useEffect(()=>{
        RefreshAuthCookie?.();//добавить обновление при изменении ролей

    },[]);

    let ItemsLink = itemsLink(data.roles);

    return  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            {<NavLink className="navbar-brand " to={"/"} >SPA_HorcruxMemories</NavLink>}

            <Burger/>
            <div className="collapse navbar-collapse" id="navbar">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {ItemsLink}
                </ul>

                {!data.isAuthenticated
                    ?<NavLink className="btn btn-outline-light" to={'/login'}> Войти</NavLink>
                    :<NavLink className="btn btn-outline-light" to={'/login'} onClick={Logout}> Выйти</NavLink>
                }
            </div>
        </div>
    </nav>
}

export default Navbar;