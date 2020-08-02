import React, {  useState } from 'react';

function useForm(valoresIniciais){

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
    };
  
    function clearForm(){
  
      setValues(valoresIniciais)
    };
    
  
    return {
      valores,
      funcaoHander,
      clearForm,
    };
    
  
  }

  export default useForm;