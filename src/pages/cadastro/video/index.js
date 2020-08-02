import React ,{useEffect, useState, Children} from 'react'
import {Link, useHistory} from 'react-router-dom'
import PageDefault from '../../../components/PageDefaulf';
import FormField from '../../../components/FormField';
import ButtonLink from '../../../components/ButtonLink';
import useForm from '../../../hooks/useForm';
import videosRepository from '../../../repositories/videos'
import categoriasRepository from '../../../repositories/categorias'
import Logo2 from '../../../assets/img/mon1.svg';
import {PageFlex, Pagediv, Logodiv, PageCategoria} from './style';

function CadastroVideo(){

const history = useHistory();
const [categorias,setCategorias] = useState([]);
const categoryTitles = categorias.map(({titulo})=> titulo);
const {funcaoHander, valores} =  useForm({

    titulo: '',
    url: '',
    categoria: '',
    

});

useEffect(()=>{

  categoriasRepository
  .getAll()
  .then((categoriasFromServer)=>{
    setCategorias(categoriasFromServer);
  });
}, []);

console.log(categorias);

    return (
        <PageDefault paddingAll={0}>

            <PageFlex>

            <Logodiv>
                   <img  className="Logo2" src={Logo2} alt="gameflix" /> 

            </Logodiv>

       <Pagediv>
      
        <h1>  Cadastro de video </h1>  

       <form onSubmit={(event) => {
        event.preventDefault();

        const categoriaEscolhida= categorias.find((categoria)=>{
            return categoria.titulo === valores.categoria;
        })

        console.log(categoriaEscolhida)

        videosRepository.create({

          titulo:valores.titulo,
          url: valores.url,
          categoriaId: categoriaEscolhida.id,

        })

          .then(() => {
            console.log('cadastrado');
            history.push('/');
          });
       
    }}>
          <FormField
            label="Titulo do Video"
            name="titulo"
            value={valores.titulo}
            onChange={funcaoHander}

          />


            <FormField
            label="URL"
            name="url"
            value={valores.url}
            onChange={funcaoHander}

          />


            <FormField
            label="Categoria"
            name="categoria"
            value={valores.categoria}
            onChange={funcaoHander}
            suggestions={categoryTitles
            }

             
          />
        
            <ButtonLink type="submit">
                Cadastrar
            </ButtonLink>
         

          </form>
          <PageCategoria>
            <Link to="/cadastro/categoria"> 
                Cadastrar Nova Categoria
            </Link>
            </PageCategoria>
              </Pagediv>

            </PageFlex>
        </PageDefault>
        
    )
}

export default CadastroVideo;