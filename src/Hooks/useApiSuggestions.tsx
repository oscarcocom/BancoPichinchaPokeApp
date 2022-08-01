import { useState, useEffect } from "react";
import pokeApi from "../Api/getApi";
import { TopLevel } from "../Interfaces";

interface Data {
  data: any
  loading: boolean;
  status: boolean;
}

export const useApiSuggestions =  <T extends string >(responseStatus:T) => {
  const [{ data, loading, status }, setData] = useState<Data>({
    data: [],  
    loading: false,
    status: false,
  });

useEffect(() => {



    // console.log("Preparando sugerencias Ing osmar....");
    setData((state:any)=>({...state,loading:true}))
 
 const Load = async()=> await pokeApi.get<TopLevel>(`?idAuthor=1`).then((pokeData)=>{
    setData({data:pokeData.data,loading:false,status:true})
  }).catch((error)=>{
    console.error(error)
    setData((state:any)=>({...state,loading:false,status:false}))
  });
 
  Load()

  // Limpiamos desmontando el componente al finalizar la tarea
 return ()=>{
  setData({
    data: [],
    loading: false,
    status: false,
  })
 }




// Preparamos la bandera para cuando el usuario haga uso del CRUD y solicitemos una nueva consulta get
 }, [responseStatus])
 
// Retornamos nuestros datos del state 
  return { data, loading, status };
};
