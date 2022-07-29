import { FC } from "react";
import { useApiSuggestions } from "../../../Hooks/useApiSuggestions";


type Props = {
  input: string;
  setSearchInput: (paramsPokeSearch: string) => void;
  Show:boolean;
  setShow:(paramFlag: boolean) => void;
};
type Swps = boolean;
type flagToChange = boolean;

export const PokeAutocomplete: FC<Props> = ({ input, setSearchInput,setShow,Show }) => {
  const { data, loading, status } = useApiSuggestions<flagToChange>(true);
 
const SelectPokeOption =(selected:string)=>{
  setShow(false)
  setSearchInput(selected)
}
console.log(Show)

  return (
    <div className="Autocomplete">
      {Show ? data.filter((fil:any)=>fil.name.toLowerCase().indexOf(input.toLowerCase()) > -1).map((items:any) => (
            <div key={items.id} className="Option" onClick={()=>SelectPokeOption(items.name)}>
              <span className="textItem">{items.name}</span>
              <span className="imageItem">
                <img
                  src={items.image}
                  alt="Pokemon"
                />
              </span>
            </div>
          )) 
          : null
      }

      
    </div>
  );
};
