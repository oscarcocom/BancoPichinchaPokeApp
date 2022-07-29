import styled from 'styled-components'

type propsRange= any;
const PokeRange = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  height: 7px;
  width: 13rem;
  border-radius: 40px;
  background: ${(props:propsRange) =>
    `linear-gradient(to right, rgb(89, 31, 196) 0%, #6f00ff ${props.value}%, #977fcc9e ${props.value}%, #977fcc85  0%);`};


  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-image: radial-gradient(circle, #4934b0 40%, #162cd4);
    border-radius: 50%;
    
  }

  ::-moz-range-thumb {
    width: 24px;
    height: 18px;
    -moz-appearance: none;
    background-image: radial-gradient(circle, #282895 40%, #271696 45%);
    border-radius: 50%;
   
  }
`;

export default PokeRange;