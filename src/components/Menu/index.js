import React from "react";
import Logo from '../../assets/img/gameflix.png';
import './Menu.css';
import ButtonLink from "../ButtonLink";

function Menu(){

    return (
        <nav className="Menu">
            <a  href="/">
                 <img  className="Logo" src={Logo} alt="gameflix"/> 
            </a>

            <ButtonLink as='a' className="ButtonLink" href="/">
                Novo video
            </ButtonLink>
          
        </nav>
    ); 
}

export default Menu;