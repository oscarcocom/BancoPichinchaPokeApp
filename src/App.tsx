import { useState, useCallback, useRef } from "react";
import "./css/App.css";
import { FiSearch } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever, MdOutlineSave } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import { TbLoader } from "react-icons/tb";
import PokeRange from "./Components/Pages/UIMenu/PokeRange";
import { Ataque, Defensa, Search } from "./Interfaces";
import { PokeAutocomplete } from "./Components/Pages/UIMenu/PokeAutocomplete";
import { TopLevel } from './Interfaces/pokemon-Api';
import pokeApi from './Api/getApi';
import { LoadCrud, PokePopMessage, TopLevelPost } from './Interfaces/Pokemon-Api-post';
import { PokeNotification } from "./Components/Pages/UIMenu/PokeNotification";

function App() {
  // formCrud
  const [ApiLoader, setApiLoader] = useState<LoadCrud>(false);
  const [{Visible,Message}, setPokePopMessage] = useState<PokePopMessage>({
    Visible:false,
    Message:"Operación POST exitosa, Nuevo pokemon creado !, Ahora puede buscar nuevo registro"
  });
  const [Ataque, setAtaque] = useState<Ataque>(50);
  const [Defensa, setDefensa] = useState<Defensa>(50);
  const [SearchInput, setSearchInput] = useState<Search>("");
  const [{ Name, Imagen }, setFormCrud] = useState({
    Name: "",
    Imagen: "",
  });

  console.log(Name);

  const HandleFormCrud = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormCrud((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  // AddPokemon-------

  //  referimos al input para enfocar
  const ContenedorAddPokemon = useRef<HTMLDivElement>(null);
  const InputName = useRef<HTMLInputElement>(null);
  const InputImagen = useRef<HTMLInputElement>(null);
  //pop de alerta

  const NewPokenon = async () => {
    setAtaque(0);
    setDefensa(0);
    setFormCrud({
      Name: "",
      Imagen: "",
    });
    await InputName.current?.focus();
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

  const ChargerToForm = () => {
    setAtaque(attack);
    setDefensa(Defense);
    setFormCrud({
      Name: name,
      Imagen: Image,
    });
  };
  const HandleCrudPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setApiLoader(true)
    
    if ([Name,Imagen].includes("")) {
        
        setPokePopMessage({
          Visible:true,
          Message:"Hay campos Input vacio"
        })
        setApiLoader(false)
        return; 
    }
    if( Ataque <= 0 ){

      setPokePopMessage({
        Visible:true,
        Message:"El pokemon debe tener un ataque arriba de 0"
      })
      setApiLoader(false)
      return;
    }
    if( Defensa <= 0 ){
      
      setPokePopMessage({
        Visible:true,
        Message:"El pokemon debe tener una Defensa arriba de 0"
      })
      setApiLoader(false)
      return;
    }


    const Load = async() => await pokeApi.post<TopLevelPost>(`?idAuthor=1`,{
      idAuthor:1,
      name: Name,
      image: Imagen,
      attack: Ataque,
      defense: Defensa,
      hp: 100,
      type: "Dragon"
    }).then((pokeData)=>{
      console.log(pokeData)
      setPokePopMessage({
        Visible:true,
        Message:`Operación POST exitosa con estatus de operación: ${pokeData.status} ${pokeData.statusText} `
      })
    
    }).catch((error)=>{
      // console.error(error)
      setPokePopMessage({
        Visible:true,
        Message:`Error sucedido ${error}`
      })
    
 
    }).finally(()=>setApiLoader(false));
   
    Load()

 
   
  };
  const HandleCrudPut = () => {


  };

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
      < PokeNotification
       Visible={Visible}
       Message={Message}
       setPokePopMessage={setPokePopMessage}
      />
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

            {/* Hice este functional component con la capacidad de bucar por ID o nombre de pokemon */}
            {/* I made this component to search by name or Id pokemon */}
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
              <span onClick={NewPokenon}>Nuevo</span>
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
              {/*
              IMPORTANTE !!
              Siempre pensando en las reglas de NO framework de estilos o componentes prefabricados, en esta parte hice uso de una libreria de animacion,  esta libreria solo anima el texto y divs y no es un auxiliar CSS en el maquetado, el cual fue hecho 100% css a mano, decidi usarlo como propuesta propia ya que me parecio una buena idea de uso, saludos ! :)
              All along thinked in the rules of never use framework of styles for original design so I decided use in this part of my code a library to do text animated and not as css helper ! :) */}
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
                <span onClick={ChargerToForm}>
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
            <form onSubmit={HandleCrudPost} className="FormAddPokemon">
              <div ref={ContenedorAddPokemon} className="FormContent">
                {/* inputs */}
                <div className="inputsBox columna-s-12 columna-8">
                  {/* Nombre */}

                  <div className="NombreAdd  columna-s-12 columnna-6">
                    <label htmlFor="Nombre">Nombre:</label>
                    <input
                      ref={InputName}
                      value={Name}
                      name="Name"
                      placeholder="Nombre"
                      onChange={HandleFormCrud}
                    />
                  </div>
                  <div className="ImgAdd  columna-s-12 columnna-6">
                    <label htmlFor="Nombre">Imagen:</label>
                    <input
                      ref={InputImagen}
                      value={Imagen}
                      name="Imagen"
                      placeholder="Url"
                      onChange={HandleFormCrud}
                    />
                  </div>

                  {/* url */}
                </div>

                {/* ranges */}
                <div className="RangesBox columna-s-12 columna-8">
                  <div className="ataque">
                    <label htmlFor="">Ataque: {Ataque} </label>
                    <PokeRange
                      value={Ataque}
                      onChange={(e: any) => setAtaque(e.target.value)}
                    />{" "}
                    <label htmlFor="">100</label>
                  </div>

                  <div className="defensa ">
                    <label htmlFor="">Defensa: {Defensa} </label>
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
                 {
                 
                ApiLoader?
                    <button disabled className="LoaderBotton">
                      <TbLoader className="icons" />
                      <span>Cargando</span>
                    </button>
                    : 
                    <button>
                    <MdOutlineSave  className="icons" />
                    <span>Guardar</span>
                  </button>
                    }
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
