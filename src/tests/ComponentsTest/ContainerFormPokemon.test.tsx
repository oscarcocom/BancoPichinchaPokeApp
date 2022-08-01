import { render, renderHook } from "@testing-library/react";
import { useState, useRef } from "react";
import { ContainerFormPokemon } from "../../Components/Pages/UIMenu/ContainerFormPokemon";

const { result } = renderHook(() => {
  const [{ IdPomenon, Name, Imagen }, setFormCrud] = useState({
    IdPomenon: 0,
    Name: "",
    Imagen: "",
  });
  const InputName = useRef<HTMLInputElement>(null);
  const InputImagen = useRef<HTMLInputElement>(null);
  const [ApiLoader, setApiLoader] = useState(false);
  const [Ataque, setAtaque] = useState(50);
  const [Defensa, setDefensa] = useState(50);
  const [{ Visible, Message }, setPokePopMessage] = useState({
    Visible: false,
    Message: "",
  });
  const [{ CurrentMethod, responseStatus }, setApiMethod] = useState({
    CurrentMethod: "Post",
    responseStatus: "OK",
  });

  return {
    setFormCrud,
    IdPomenon,
    Name,
    Imagen,
    InputName,
    InputImagen,
    ApiLoader,
    Ataque,
    setAtaque,
    Defensa,
    setDefensa,
    setApiMethod,
    setApiLoader,
    setPokePopMessage,
  };
});

const HandleFormCrud = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
  result.current.setFormCrud((f) => ({
    ...f,
    [e.target.name]: e.target.value,
  }));
};
const NewPokenon = async () => {

  result.current.setApiMethod( (f) =>({
    ...f,
    CurrentMethod:"Post"
  }))
};

describe("Test a componente ContainerFormPokemon", () => {
  test(" Mostrar componente contenedor en el UI ", () => {
 const {container}= render(
      <ContainerFormPokemon
        HandleMethod="Post"
        InputName={result.current.InputName}
        Name="Caterpie"
        HandleFormCrud={HandleFormCrud}
        InputImagen={result.current.InputImagen}
        Imagen={result.current.Imagen}
        ApiLoader={result.current.ApiLoader}
        Ataque={result.current.Ataque}
        setAtaque={result.current.setAtaque}
        Defensa={result.current.Defensa}
        setDefensa={result.current.setDefensa}
        setApiLoader={result.current.setApiLoader}
        setPokePopMessage={result.current.setPokePopMessage}
        IdPomenon={result.current.IdPomenon}
        setApiMethod={result.current.setApiMethod}
        NewPokenon={NewPokenon}
      />
    );

    expect(container).toMatchSnapshot()
  

  });

 
});
