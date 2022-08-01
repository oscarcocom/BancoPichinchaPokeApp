
import { renderHook } from '@testing-library/react';
import { useApiSuggestions } from '../../Hooks/useApiSuggestions';


describe("Prubas en el Hook de sugerencias", () => {
  test("test debe restornar los valores booleanos utilizados como flag ", () => {
  // renderHook(()=>useApiSuggestions("Reaload Data"))
  const {result}=renderHook(()=>useApiSuggestions("OK"));

  const loading = result.current.loading;
  const status = result.current.status;

  expect(loading).toBe(true);
  expect(status).toBe(false); 


  });
});
     