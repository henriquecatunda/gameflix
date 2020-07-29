import React from "react";
import {Link} from 'react-router-dom';
import Logo from '../../assets/img/gameflix.png';
import './Menu.css';
import ButtonLink from "../ButtonLink";

function Menu(){

    return (
        <nav className="Menu">
            <Link  to="/">
                 <img  className="Logo" src={Logo} alt="gameflix"/> 
            </Link>

            <ButtonLink as={Link} className="ButtonLink" to="/cadastro/video">
                Novo video
            </ButtonLink>
          
        </nav>
    ); 
}

export default Menu;