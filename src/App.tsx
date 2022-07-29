import { useState, useCallback } from "react";
import "./css/App.css";
import { FiSearch } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever, MdOutlineSave } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import PokeRange from "./Components/Pages/UIMenu/PokeRange";
import { Ataque, Defensa, Search } from "./Interfaces";
import { PokeAutocomplete } from "./Components/Pages/UIMenu/PokeAutocomplete";
import { useHandleForm } from "./Hooks/useHandleForm";

function App() {
  // formCrud
  const [Ataque, setAtaque] = useState<Ataque>(50);
  const [Defensa, setDefensa] = useState<Defensa>(50);
  const [SearchInput, setSearchInput] = useState<Search>("");
  const [{ Name, Imagen }, setFormCrud] = useState({
    Name: "Name",
    Imagen: "Url",
  });

  console.log(Name)

  const HandleFormCrud = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormCrud((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };
  // Flag de sugerencias

  const [Show, setShow] = useState(false);

  // state Table

  const [{ name, Image, attack, Defense }, setTableDate] = useState({
    name: "Waiting...",
    Image: "",
    attack: "Waiting...",
    Defense: "Waiting...",
  });

  const CrudUptade = () => {};
  const CrudDelete = () => {};

  const LaunchSugges = useCallback(() => {
    setShow(true);
  }, []);
  const handleSearchInput = (event: { target: HTMLInputElement }) => {
    LaunchSugges();
    setSearchInput(event.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="SearchBox columna-3 columna-s-12">
            <label htmlFor="labelSearch">Listado de pokemones</label>

            <div className="InputSearchContent">
              <input
                type="text"
                placeholder="Buscar"
                value={SearchInput}
                onChange={handleSearchInput}
              />
              <FiSearch className="iconSearch" />
            </div>
            <PokeAutocomplete
              input={SearchInput}
              setSearchInput={setSearchInput}
              Show={Show}
              setShow={setShow}
              setTableDate={setTableDate}
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
              {/* name,LastName,attack,Defense */}
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Ataque</th>
              <th>Defensa</th>
              <th>Acciones</th>
            </tr>
            <tr>
              <td className="animate__animated  animate__flash animate__delay-1s animate__slow animate__repeat-2">
                {name}
              </td>
              <td className="imgTable">
                {!!Image ? (
                  <img className="imgTble" alt="pokemonTbls" src={Image} />
                ) : (
                  <FaImage />
                )}
              </td>
              <td className="animate__animated  animate__flash  animate__delay-1s animate__slow animate__repeat-2">
                {attack}
              </td>
              <td className="animate__animated  animate__flash animate__delay-1s animate__slow animate__repeat-2">
                {Defense}
              </td>
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
            <form className="FormAddPokemon">
              <div className="FormContent">
                {/* inputs */}
                <div className="inputsBox columna-s-12 columna-8">
                  {/* Nombre */}

                  <div className="NombreAdd  columna-s-12 columnna-6">
                    <label htmlFor="Nombre">Nombre:</label>
                    <input

                    value={Name}
                    name="Name"
                    placeholder={Name}
                    onChange={HandleFormCrud}
                    />
                  </div>
                  <div className="ImgAdd  columna-s-12 columnna-6">
                    <label htmlFor="Nombre">Imagen:</label>
                    <input
                      value={Imagen}
                      name="Imagen"
                      placeholder={Imagen}
                      onChange={HandleFormCrud}

                    />
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
              <div className="FormContent">
                {/* Footer botones */}
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
