import { render, renderHook } from "@testing-library/react"
import { PokeAutocomplete } from '../../Components/Pages/UIMenu/PokeAutocomplete';
import { useState } from 'react';

//APLICACION TDD 
// RED AL NO MATCH CON SCREEN
//GREEN AL MATCH
// REFACTOR DONE

describe('Prueba de snapshoot al componente <PokeAutocomplete>', () => {

   const {result}= renderHook(()=>{
        const [SearchInput, setSearchInput] = useState("");
        const [Show, setShow] = useState(false);
        const [{Id, name, Image, attack, Defense }, setTableDate] = useState({
            Id:0,
            name: "Waiting...",
            Image: "",
            attack: "Waiting...",
            Defense: "Waiting...",
          });
          const [{CurrentMethod,responseStatus}, setApiMethod] = useState({
            CurrentMethod: "Post",
            responseStatus:"OK"
          });
        

        return{
            SearchInput,
            setSearchInput,
            Show,
            setShow,
            setTableDate,
            responseStatus
        }
    })


test('Mostrar sugerencias del API', () => { 



  const{container}=render(<PokeAutocomplete 
        input={ result.current.SearchInput}
        setSearchInput={  result.current.setSearchInput}
        setShow={   result.current.setShow}
        Show={   result.current.Show}
        setTableDate={   result.current.setTableDate}
        responseStatus={  result.current.responseStatus}
        />)


       expect(container).toMatchSnapshot() 
 })

 })