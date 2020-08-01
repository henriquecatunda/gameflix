import React ,{useState, useEffect} from 'react';
import PageDefault from '../../../components/PageDefaulf';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import ButtonLink from '../../../components/ButtonLink';


function CadastroCategoria() {


  const valoresIniciais ={

    nome:'',
    discricao:'',
    cor: '#000',
  }


  const [categorias, setCategorias ]= useState([]);
  const [valores, setValues ]= useState(valoresIniciais);

  function setValue(chave,valor) {

    setValues({
      ...valores,
      [chave]:valor,
    })
  }

  function funcaoHander (infosDoEvento){
   
    setValue(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value);
  }

useEffect(() => {
    console.log('alo alo');

    const URL_TOP ='http://localhost:8080/categorias';
    fetch(URL_TOP)
     .then(async(respostaDoServidor)=> {

      const resposta = await respostaDoServidor.json();
      setCategorias([
        ...resposta,
      ]);
     });

}, []);


    return (
      <PageDefault>
        <h1>Cadastro de Categoria: {valores.nome}</h1>
  
        <form onSubmit={function handSubmit(infosDoEvento){

            infosDoEvento.preventDefault();

            setCategorias([
              ...categorias,
              valores
            ]);

            setValues(valoresIniciais)
        }}>
  

          <FormField 
            label="Nome da Categoria:"
            type="text"
            name="nome"
            value={valores.nome}
            onChange={funcaoHander}

          />

            <FormField
            label="Discricao:"
            type="textarea"
            name="discricao"
            value={valores.discricao}
            onChange={funcaoHander}
            />

            <FormField
            label="Cor:"
            type="color"
            name="cor"
            value={valores.cor}
            onChange={funcaoHander}
            />

          <ButtonLink>
            Cadastrar
          </ButtonLink>
        </form>
  
        { categorias.length === 0 && (<div>
            {}
            Loading..

        </div>)}

            <ul>
                {categorias.map((categoria, indice) => {

                  return (
                    <li key={`${categoria} ${indice}`}>
                      {categoria.nome}
                    </li>
                  )
                })}
            </ul>
  
        <Link to="/">
          Ir para home
        </Link>
      </PageDefault>
    )
  }

export default CadastroCategoria;