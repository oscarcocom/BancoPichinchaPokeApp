import { useState, useCallback, useRef } from "react";
import "./css/App.css";
import { FiSearch } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { Ataque, Defensa, Search } from "./Interfaces";
import { PokeAutocomplete } from "./Components/Pages/UIMenu/PokeAutocomplete";
import {
  LoadCrud,
  PokePopMessage
} from "./Interfaces/Pokemon-Api-post";
import { PokeNotification } from "./Components/Pages/UIMenu/PokeNotification";
import { ContainerFormPokemon } from "./Components/Pages/UIMenu/ContainerFormPokemon";
import pokeApi from './Api/getApi';
import { TopLevelDelete } from './Interfaces/Pokemon-Api-delete';

function App() {
  // formCrud
  const [ApiLoader, setApiLoader] = useState<LoadCrud>(false);
  const [{ Visible, Message }, setPokePopMessage] = useState<PokePopMessage>({
    Visible: false,
    Message:
      "",
  });
  const [Ataque, setAtaque] = useState<Ataque>(50);
  const [Defensa, setDefensa] = useState<Defensa>(50);
  const [SearchInput, setSearchInput] = useState<Search>("");
  const [{IdPomenon, Name, Imagen }, setFormCrud] = useState({
    IdPomenon:0,
    Name: "",
    Imagen: "",
  });

  const [{CurrentMethod,responseStatus}, setApiMethod] = useState({
    CurrentMethod: "Post",
    responseStatus:"OK"
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

  const InputName = useRef<HTMLInputElement>(null);
  const InputImagen = useRef<HTMLInputElement>(null);
  //pop de alerta

  const NewPokenon = async () => {
    setShow(false);
    setAtaque(0);
    setDefensa(0);
    setFormCrud({
      IdPomenon:0,
      Name: "",
      Imagen: "",
    });
    await InputName.current?.focus();

    setApiMethod( (f) =>({
      ...f,
      CurrentMethod:"Post"
    }))
  };

  // Flag de sugerencias

  const [Show, setShow] = useState(false);

  // state Table

  const [{Id, name, Image, attack, Defense }, setTableDate] = useState({
    Id:0,
    name: "Waiting...",
    Image: "",
    attack: "Waiting...",
    Defense: "Waiting...",
  });




  const ChargerToForm = () => {
    setShow(false);
    if(name == "Waiting..."){
      setPokePopMessage({
        Visible: true,
        Message:
          "La tabla sigue en espera de que usted selecione un pokemon ya que el status actual es waiting... ",
      })
  
      return;
     }
    setAtaque(attack);
    setDefensa(Defense);
    setFormCrud({
      IdPomenon:Id,
      Name: name,
      Imagen: Image,
    });

    setApiMethod( (f) =>({
      ...f,
      CurrentMethod:"Put"
    }))
  };

  const DeletePokemon = () => {
    setShow(false);
    setApiLoader(true);


   
    console.log(IdPomenon)


    if([name,Image].includes("Waiting...") ){
      setPokePopMessage({
        Visible: true,
        Message:
          "No hay seleccion que eliminar, La tabla sigue en espera de que usted selecione un pokemon ya que el status actual es waiting... ",
      })
      setApiLoader(false);
      return;
     }

 
  
     const Load = async () =>
     await pokeApi
       .delete<TopLevelDelete>(`${Id}`)
       .then((pokeData) => {
         console.log(pokeData);
         

         setApiMethod((f:any)=>({
           ...f,
           responseStatus:"DELETE ALL DONE !"
         }));

         setPokePopMessage({
           Visible: true,
           Message: `Operación DELETE exitosa con estatus de operación: ${pokeData.status} ${pokeData.statusText},ya puede verificar que el pokemon ${Name}  se elimino en la Api texteando en el input de busqueda para no encontrarlo `,
         });

  
      
    

       })
       .catch((error) => {
         // console.error(error)
         setPokePopMessage({
           Visible: true,
           Message: `Error sucedido ${error}`,
         });
         
       })
       .finally(() =>{
       
       
         setApiLoader(false)
         
         });

   Load();
      // RESETEAMOS LA DATA DE TODOS LOS STATES Y OBTENEMOS LA NUEVA SUGERENCIA ACTUALIZADA
       //I RESET STATE FLAG TO GET NEW DATA
       setApiMethod({
        CurrentMethod: "Post",
         responseStatus:"OK"
       });  
         setAtaque(0);
          setDefensa(0);
          setFormCrud({
            IdPomenon:0,
            Name: "",
            Imagen: "",
          });
       setTableDate({
        Id:0,
        name: "Waiting...",
        Image: "",
        attack: "Waiting...",
        Defense: "Waiting...",
      });

    
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
        <PokeNotification
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
              responseStatus={responseStatus}
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
                <span onClick={DeletePokemon}>
                  <MdDeleteForever />
                </span>
              </td>
            </tr>
          </table>
        </div>
        <div className="AddPokemon">
          <ContainerFormPokemon
            HandleMethod={CurrentMethod}
            InputName={InputName}
            IdPomenon={IdPomenon}
            Name={Name}
            HandleFormCrud={HandleFormCrud}
            InputImagen={InputImagen}
            Imagen={Imagen}
            ApiLoader={ApiLoader}
            Ataque={Ataque}
            setAtaque={setAtaque}
            Defensa={Defensa}
            setDefensa={setDefensa}
            setApiLoader={setApiLoader}
            setPokePopMessage={setPokePopMessage}
            setApiMethod={setApiMethod}
            
          />
        </div>
      </div>
    </>
  );
}

export default App;
