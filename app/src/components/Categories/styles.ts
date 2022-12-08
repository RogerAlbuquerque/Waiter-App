import styled from 'styled-components/native';
import { Platform } from 'react-native';

const isAndroid = Platform.OS ==='android';

export const Category = styled.View`
justify-content: center;
align-items: center;
margin: 24px;

`;


//No react-native, todos os elementos ja tem "display flex" por padrão, mesmo que não seja indicado
export const Icon = styled.View`
  background-color: #fff;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0px 2px 1px rgba(0,0,0,${isAndroid ? 1 : 0.1});
  elevation: 2;
  //Esse elevation é para a sombra poder pegar no android, e a condicional em cima é porque "1" é muito forte no IOS e 1.0 é muito fraco no android

`;
