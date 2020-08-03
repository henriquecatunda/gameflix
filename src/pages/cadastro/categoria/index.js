import React ,{useState, useEffect} from 'react';
import PageDefault from '../../../components/PageDefaulf';
import { Link, useHistory } from 'react-router-dom';
import FormField from '../../../components/FormField';
import ButtonLink from '../../../components/ButtonLink';
import useForm from '../../../hooks/useForm';
import {Pagediv, CategoriasCadastrada} from './style';
import categoriasRepository from '../../../repositories/categorias'
import {PageCategoria} from '../video/style'

function CadastroCategoria() {
  const valoresIniciais ={

    titulo:'',
    discricao:'',
    cor: '',
  }

  const {funcaoHander, valores, clearForm} = useForm(valoresIniciais);
  const history = useHistory();
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

function handSubmit(event) {
  event.preventDefault();
  const categoriaUpperCase = categorias.map((categoria) => {
    let categoriaUpper = categoria.titulo.toUpperCase();
    categoriaUpper = categoriaUpper.replace(/\s/g, '');
    return categoriaUpper;
  });

  let valueUpper = valores.titulo.toUpperCase();
  valueUpper = valueUpper.replace(/\s/g, '');

  if (categoriaUpperCase.includes(valueUpper)) {
    alert('Categoria já existente');
    clearForm();
  } else {
    setCategorias([
      ...categorias,
      valores,
    ]);
    categoriasRepository.create({
      titulo: valores.titulo,
      cor: valores.cor,

    });
    clearForm();
    history.push('/cadastro/video');
  }
}


    return (
      <PageDefault paddingAll={0}>

         <Pagediv>
        

        <h1>Cadastro de Categoria: {valores.titulo}</h1>
  
        <form onSubmit={handSubmit}>

            {/* infosDoEvento.preventDefault();

            setCategorias([
              ...categorias,
              valores
            ]);

            clearForm(valoresIniciais);
        }}>
   */}

          <FormField 
            label="titulo da Categoria"
            type="text"
            name="titulo"
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