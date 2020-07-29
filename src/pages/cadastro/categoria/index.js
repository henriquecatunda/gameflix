import React from 'react';
import PageDefault from '../../../components/PageDefaulf';
import { Link } from 'react-router-dom';

function CadastroCategoria(){

    return (
        <PageDefault>

          <h1>  Cadastro de video </h1>  

            <Link to="/"> 
                Ir para home
            </Link>
        </PageDefault>
        
    )
}

export default CadastroCategoria;