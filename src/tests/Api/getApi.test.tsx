import pokeApi from "../../Api/getApi"


describe('Prueba a la instancia de API', () => { 

    test('retorna response', (Alldone) => { 

        pokeApi.get(`?idAuthor=1`).then((pokemons=>{
        expect(pokemons.status).toBe(200)
             Alldone()
        }))
     })
 })