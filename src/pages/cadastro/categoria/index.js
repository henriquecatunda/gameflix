import React ,{useState, useEffect} from 'react';
import PageDefault from '../../../components/PageDefaulf';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import ButtonLink from '../../../components/ButtonLink';
import useForm from '../../../hooks/useForm';
import {Pagediv, CategoriasCadastrada} from './style';
import {PageCategoria} from '../video/style'

function CadastroCategoria() {
  const valoresIniciais ={

    nome:'',
    discricao:'',
    cor: '',
  }

  const {funcaoHander, valores, clearForm} = useForm(valoresIniciais);

  const [categorias, setCategorias ]= useState([]);

  useEffect(() => {
    console.log('alo alo');

    const URL_TOP = window.location.hostname.includes('localhost') ? 'http://localhost:8080/categorias'
    : 'https://devgameflix.herokuapp.com/categorias';
    fetch(URL_TOP)
     .then(async(respostaDoServidor)=> {

      const resposta = await respostaDoServidor.json();
      setCategorias([
        ...resposta,
      ]);
     });

}, []);


    return (
      <PageDefault paddingAll={0}>

         <Pagediv>
        

        <h1>Cadastro de Categoria: {valores.titulo}</h1>
  
        <form onSubmit={function handSubmit(infosDoEvento){

            infosDoEvento.preventDefault();

            setCategorias([
              ...categorias,
              valores
            ]);

            clearForm(valoresIniciais);
        }}>
  

          <FormField 
            label="titulo da Categoria"
            type="text"
            name="nome"
            value={valores.titulo}
            onChange={funcaoHander}

          />

            <FormField
            label="Discricao"
            type="textarea"
            name="discricao"
            value={valores.discricao}
            onChange={funcaoHander}
            />

            <FormField
            label="Cor"
            type="color"
            name="cor"
            value={valores.cor}
            onChange={funcaoHander}
            />

          <ButtonLink>
            Cadastrar
          </ButtonLink>
        </form>
  
        <PageCategoria>
        <Link to="/">
          Ir para Home
        </Link>
        </PageCategoria>
        
        </Pagediv>

        <CategoriasCadastrada>

          { categorias.length === 0 && (<div>
              {}
              Loading..

          </div>)}


            <ul>
                  {categorias.map((categoria) => {

                    return (
                      <li key={`${categoria.id}` }>
                        {categoria.titulo}
                      </li>
                    )
                  })}
              </ul>
        
        </CategoriasCadastrada>
      </PageDefault>
    )
  }

export default CadastroCategoria;