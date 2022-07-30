import React,{FC} from "react";
import { PokePopMessage } from '../../../Interfaces/Pokemon-Api-post';

interface Props{
    Visible:boolean,
    Message:string,
    setPokePopMessage:(paramFlag: any) => void;
}

export const PokeNotification:FC<Props> = ({Visible,Message, setPokePopMessage}) => {
  return (
    <div>
  {
    Visible?
    <div className=" ShowPokeNotification">
        {/*
              IMPORTANTE !!
              Siempre pensando en las reglas de NO framework de estilos o componentes prefabricados, en esta parte hice uso de una libreria de animacion, esta libreria solo anima el texto y divs y no es un auxiliar CSS en el maquetado, el cual fue hecho 100% css a mano, decidi usarlo como propuesta propia ya que me parecio una buena idea de uso, saludos ! :)
              All along thinked in the rules of never use framework of styles for original design so I decided use in this part of my code a library to do text animated and not as css helper ! :) */}
        <div className=" animate__animated animate__swing popup">
          <h2>Poke Notificación!</h2>
          <a className="close" 
             onClick={()=>setPokePopMessage({
              Visible:false,
              Message:"Operacion hecha"
             })}
             href="#">
            &times;
          </a>
          <div className="content">
          {Message}
          </div>
        </div>
      </div>:null
      
  }
      
    </div>
  );
};
