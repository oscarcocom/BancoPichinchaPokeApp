import {FC} from 'react'
import { RiCloseLine } from "react-icons/ri";
import { TbLoader } from "react-icons/tb";
import PokeRange from './PokeRange';
import {MdOutlineSave } from "react-icons/md";
import { TopLevelPost, TopLevelPut } from '../../../Interfaces/Pokemon-Api-post';
import pokeApi from '../../../Api/getApi';

interface ProposContainer{
    HandleMethod:string,
    InputName:any,
    Name:string,
    HandleFormCrud:(params:any)=>void,
    InputImagen:any,
    Imagen:string,
    ApiLoader:any;
    setAtaque:(param:any)=>void,
    Ataque:any,
    setDefensa:(param:any)=>void,
    Defensa:any,
    setApiLoader:(param:any)=>void,
    setPokePopMessage:(param:any)=>void;
    IdPomenon:number,
    setApiMethod:(param:any)=>void;
    NewPokenon:(param:any)=>void;
  
}
export const ContainerFormPokemon:FC<ProposContainer>=(
    {
        HandleMethod="Post",
        InputName,
        Name,
        HandleFormCrud,
        InputImagen,
        Imagen,
        ApiLoader,
        Ataque,
        setAtaque,
        Defensa,
        setDefensa,
        setApiLoader,
        setPokePopMessage,
        IdPomenon,
        setApiMethod,
        NewPokenon
                                        
    
    }) => {




        const HandleCrudPost = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
        
            setApiLoader(true);
        
            if ([Name, Imagen].includes("")) {
              setPokePopMessage({
                Visible: true,
                Message: "Hay campos Input vacio",
              });
              setApiLoader(false);
              return;
            }
            if (Ataque <= 0) {
              setPokePopMessage({
                Visible: true,
                Message: "El pokemon debe tener un ataque arriba de 0",
              });
              setApiLoader(false);
              return;
            }
            if (Defensa <= 0) {
              setPokePopMessage({
                Visible: true,
                Message: "El pokemon debe tener una Defensa arriba de 0",
              });
              setApiLoader(false);
              return;
            }
        
            const Load = async () =>
              await pokeApi
                .post<TopLevelPost>(`?idAuthor=1`, {
                  idAuthor: 1,
                  name: Name,
                  image: Imagen,
                  attack: Ataque,
                  defense: Defensa,
                  hp: 100,
                  type: "Dragon",
                })
                .then((pokeData) => {

                  setApiMethod((f:any)=>({
                    ...f,
                    responseStatus:"POST ALL DONE !"
                  }));
                  console.log(pokeData);
                  setPokePopMessage({
                    Visible: true,
                    Message: `Operación POST exitosa con estatus de operación: ${pokeData.status} ${pokeData.statusText}, ya puede buscar su nuevo pokemon ${Name}  en la Api texteando en el input de busqueda `,
                  });
                

               

                })
                .catch((error) => {
                  // console.error(error)
                  setPokePopMessage({
                    Visible: true,
                    Message: `Error sucedido ${error}`,
                  });
                })
                .finally(() => {
               
               
                  setApiLoader(false)
                });
        
            Load();
                // RESETEAMOS LA DATA SIN PERDER EL METODO REST PARA ACTUALIZAR LAS SUGERENCIAS
                //I RESET STATE FLAG TO GET NEW DATA
            setApiMethod((f:any)=>({
              ...f,
              responseStatus:"OK"
            }));  
          };
          const HandleCrudPut =  (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
        
            setApiLoader(true);
        
            if ([Name, Imagen].includes("")) {
              setPokePopMessage({
                Visible: true,
                Message: "Hay campos Input vacio",
              });
              setApiLoader(false);
              return;
            }
            if (Ataque <= 0) {
              setPokePopMessage({
                Visible: true,
                Message: "El pokemon debe tener un ataque arriba de 0",
              });
              setApiLoader(false);
              return;
            }
            if (Defensa <= 0) {
              setPokePopMessage({
                Visible: true,
                Message: "El pokemon debe tener una Defensa arriba de 0",
              });
              setApiLoader(false);
              return;
            }
        
            const Load = async () =>
              await pokeApi
                .put<TopLevelPut>(`${IdPomenon}`, {
                  name: Name,
                  image: Imagen,
                  attack: Ataque,
                  defense: Defensa,
                  hp: 100,
                  type: "Dragon",
                  idAuthor: 1
                })
                .then((pokeData) => {
                  console.log(pokeData);
                  

                  setApiMethod((f:any)=>({
                    ...f,
                    responseStatus:"PUT ALL DONE !"
                  }));

                  setPokePopMessage({
                    Visible: true,
                    Message: `Operación PUT exitosa con estatus de operación: ${pokeData.status} ${pokeData.statusText},ya puede verificar su actualizacion para el pokemon ${Name} en la Api texteando en el input de busqueda  `,
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
                  // RESETEAMOS LA DATA SIN PERDER EL METODO REST
                
                  setApiLoader(false)
                  
                  });
        
            Load();
               // RESETEAMOS LA DATA SIN PERDER EL METODO REST PARA ACTUALIZAR LAS SUGERENCIAS
                //I RESET STATE FLAG TO GET NEW DATA
                setApiMethod((f:any)=>({
                  ...f,
                  responseStatus:"OK"
                }));  
          };
        

  return (
   <>
   
       <div className="fila">
            <div className="titleAddBox columna-s-12 columna-6">
              
                {
                    HandleMethod==="Post"?
                   <h4>Nuevo Pokemon</h4> 
                    : 
                    <h4 >Ahora se actualiza al pokemon : <p style={{ display:"inline-block", color:"purple"}}>{Name}</p></h4>
                }
                
            </div>
          </div>
          <div className="fila">
            <form onSubmit={HandleMethod==="Post"?HandleCrudPost:HandleCrudPut } className="FormAddPokemon">
              <div  className="FormContent">
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
                    <button onClick={NewPokenon} >
                      <RiCloseLine className="icons" />
                      <span >Cancelar</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
   </>
  )
}
