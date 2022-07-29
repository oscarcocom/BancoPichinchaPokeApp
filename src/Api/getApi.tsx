import axios from "axios";

const pokeApi=axios.create({
    baseURL:'https://bp-pokemons.herokuapp.com/',
    
})


export default pokeApi; 