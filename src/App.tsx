import { useState } from "react";
import "./css/App.css";
import { FiSearch } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever,MdOutlineSave } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";



import PokeRange from "./Components/Pages/UIMenu/PokeRange";
function App() {
  const [Ataque, setAtaque] = useState(50);
  const [Defensa, setDefensa] = useState(50);

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="SearchBox columna-3 columna-s-12">
            <label htmlFor="labelSearch">Listado de pokemones</label>

            <div className="InputSearchContent">
              <input type="text" placeholder="Buscar" />
              <FiSearch className="iconSearch" />
            </div>
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
