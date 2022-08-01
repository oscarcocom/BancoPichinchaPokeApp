import { FC } from "react";
import { useApiSuggestions } from "../../../Hooks/useApiSuggestions";

type Props = {
  input: string;
  setSearchInput: (paramsPokeSearch: string) => void;
  Show: boolean;
  setShow: (paramFlag: boolean) => void;
  setTableDate: (paramDte: any) => void;
  responseStatus: string;
};

type flagToReloadSuggestion = string;

export const PokeAutocomplete: FC<Props> = ({
  input,
  setSearchInput,
  setShow,
  Show,
  setTableDate,
  responseStatus,
}) => {
  const { data } =
    useApiSuggestions<flagToReloadSuggestion>(responseStatus);

  const SelectPokeOption = (selected: any) => {
    setShow(false);
    setSearchInput(selected.name);
    setTableDate({
      Id: selected.id,
      name: selected.name,
      Image: selected.image,
      attack: selected.attack,
      Defense: selected.defense,
    });
  };


  return (
    <div className="Autocomplete">
      {Show
        ? data
            .filter((fil: any) =>  {
              if (
                fil.name.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
                fil.id === input
              )
                return fil;
            })
            .map((items: any) => (
              <div
                key={items.id}
                className="Option"
                onClick={() => SelectPokeOption(items)}
              >
                <span className="textItem">{items.name}</span>
                <span className="imageItem">
                  <img src={items.image} alt="Pokemon" />
                </span>
              </div>
            ))
        : null}
    </div>
  );
};
