import React from 'react'
import {NavLink} from "react-router-dom";

const Navbar = (props) =>{

    return  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand @FontSize" aria-current="page" asp-area="" asp-controller="Home"
               asp-action="Index">SPA_HorcruxMemories</a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* @if (User.Identity.IsAuthenticated)
                        {
                            <li className="nav-item">
                                <a className="nav-link active @FontSize" aria-current="page" asp-area="Admin"
                                   asp-controller="Home" asp-action="Index">Администратор</a>
                            </li>
                        }*/}

                    {/*  @* <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        *@*/}
                </ul>
                {/*  @if (User.Identity.IsAuthenticated)
                    {
                        <span className="text-white pe-1 @FontSize">Привет, @User.Identity.Name</span>
                        <a class="btn btn-outline-light  @FontSize" aria-current="page" asp-area="" asp-controller="Account" asp-action="Logout"> Выход</a>
                    }
                    else
                    {
                        <a className="btn btn-outline-light @FontSize" aria-current="page" asp-area=""
                           asp-controller="Account" asp-action="Login"> Войти</a>

                    }
                    @**/}
                {!props.isAuthenticated
                    ?<NavLink className="btn btn-outline-light" to={'/login'} > Войти</NavLink>
                    :<button onClick={props.Logout} className="btn btn-outline-light" to={'/'} > Выйти</button>

                }
            </div>
        </div>
    </nav>
}




export default Navbar;