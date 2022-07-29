import {useState } from "react";




export const useHandleForm = ( initialState = {}) => {

  const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }



 const  handleInputChange=(event: React.ChangeEvent<HTMLInputElement>) => {

     return  setValues({
            ...values,
            [ event.target.name ]: event.target.value
        }) ;

    }

    return [ values, handleInputChange, reset ];


}
