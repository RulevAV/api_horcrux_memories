import React from "react";
import {NavLink} from "react-router-dom";

const CreatorItem = (role:string,name:string,Link:string)=>{
    return {role,name,Link}
}

const AllItemsMenu = [
    CreatorItem("Administrator","Администратор","Admin"),
    CreatorItem("Moderator","Модератор","Moderator"),
];

type PropsType = {
    roles : Array<string>
}

export const Menu:React.FC<PropsType> = ({roles})=>{

    if(!roles) return null;

    const ItemsMenu = AllItemsMenu.filter(item => roles.includes(item.role));
    const ItemsMenuUI = ItemsMenu.map((u,index)=>{
        return <li key={index} className="nav-item">
            <NavLink className="nav-link active" to={"/"+u.Link}>{u.name}</NavLink>
        </li>
    })
    return  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {ItemsMenuUI}
    </ul>
}
