import styled from 'styled-components/native';
import { Platform, StatusBar} from 'react-native';
// "Platform" é usado para identifica r o SO do celular
// "StatusBar" é ussado para pegar dados da barra de status dos celulares, como por exempo o seu tamanho


const isAndroid = Platform.OS === 'android';

//Isso aqui é a mesma ideia do reactjs
export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  height:100%;
  background-color: #fafafa ;
  flex:1;
`;

export const CategoriesContainer = styled.View`
  height: 73px;
  margin-top: 34px;

`;


export const MenuContainer = styled.View`
flex: 1;

`;


export const Footer = styled.View`
  min-height: 110px;
  background-color: #fff;
  padding: 16px 24px;

`;


export const FooterContainer = styled.SafeAreaView`

`;


