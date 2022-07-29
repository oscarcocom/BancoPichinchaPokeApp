import { useState,useCallback } from "react";
import "./css/App.css";
import { FiSearch } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever,MdOutlineSave } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import PokeRange from "./Components/Pages/UIMenu/PokeRange";
import { Ataque, Defensa, Search } from "./Interfaces";
import { PokeAutocomplete } from "./Components/Pages/UIMenu/PokeAutocomplete";
import { useHandleForm } from './Hooks/useHandleForm';




function App() {
  const [Ataque, setAtaque] = useState<Ataque>(50);
  const [Defensa, setDefensa] = useState<Defensa >(50);
  const [SearchInput, setSearchInput] = useState<Search>("")
  const {values, handleInputChange, reset}=useHandleForm({
   Name:"",
   Image:""
  }) as any
  const [Show, setShow] = useState(false);
   

  const LaunchSugges= useCallback(
    () => {
      setShow(true)
    },
    [],
  )
  const handleSearchInput = (event: { target: HTMLInputElement; })=>{
    LaunchSugges()
    setSearchInput(event.target.value)
  }
  
 

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="SearchBox columna-3 columna-s-12">
            <label htmlFor="labelSearch">Listado de pokemones</label>

            <div className="InputSearchContent">
              <input type="text" placeholder="Buscar" value={SearchInput} onChange={handleSearchInput} />
              <FiSearch className="iconSearch" />
            </div>
            <PokeAutocomplete
            input={SearchInput}
            setSearchInput={setSearchInput}
            Show={Show}
            setShow={setShow}
            />
          </div>

          <div className="ButtonBox columna-3 columna-s-12">
            <button>
              <MdAdd className="icons" />
              <span>Nuevo</span>
            </button>
          </div>
        </div>

        <div className="table">
          <table>
            <tr>
              <th>Nombre</th>
              <th>Lastname</th>
              <th>Ataque</th>
              <th>Defensa</th>
              <th>Acciones</th>
            </tr>
            <tr>
              <td>lvunsue</td>
              <td>
                <img />
              </td>
              <td>65</td>
              <td>38</td>
              <td className="CrudTable">
                <span>
                  <AiOutlineEdit />
                </span>
                <span>
                  <MdDeleteForever />
                </span>
              </td>
            </tr>
          </table>
        </div>
        <div className="AddPokemon">
          <div className="fila">
            <div className="titleAddBox columna-s-12 columna-6">
              <h4>Nuevo Pokemon</h4>
            </div>
          </div>
          <div className="fila">
            {/* inputs */}
            <div className="inputsBox columna-s-12 columna-8">
              {/* Nombre */}

              <div className="NombreAdd  columna-s-12 columnna-6">
                <label htmlFor="Nombre">Nombre:</label>
                <input placeholder="Ingresa nombre" />
              </div>
              <div className="ImgAdd  columna-s-12 columnna-6">
                <label htmlFor="Nombre">Imagen:</label>
                <input placeholder="url" />
              </div>

              {/* url */}
            </div>

            {/* ranges */}
            <div className="RangesBox columna-s-12 columna-8">
             
              <div className="ataque">

                <label htmlFor="">Ataque: 0 </label>
                <PokeRange
                  value={Ataque}
                  onChange={(e: any) => setAtaque(e.target.value)}
                />{" "}
                <label htmlFor="">100</label>
              </div>

              <div className="defensa ">
                <label htmlFor="">Defensa: 0 </label>
                <PokeRange
                  value={Defensa}
                  onChange={(e: any) => setDefensa(e.target.value)}
                />{" "}
                <label htmlFor="">100</label>
              </div>
            </div>
          </div>

          <div className="Footer fila">
            <div className="ButtonBoxFooter columna-8 columna-s-8">

          
            <button>
              <MdOutlineSave className="icons" />
              <span>Guardar</span>
            </button>
            <button>
              <RiCloseLine className="icons" />
              <span>Cancelar</span>
            </button>
          
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
