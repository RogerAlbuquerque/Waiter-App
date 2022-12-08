import styled from 'styled-components/native';

/*
  "KeyboardAvoidingView" É uma propriedade que funciona igual uma view normal, porém faz com que seja possível adicionar no componente
  uma propriedade chamada "behavior", e passar para ela o valor "padding"(para IOS) ou "heigth" (para android). Basicamente isso vai fazer
  com que ao abrir o teclado do celular ele não fique cobrindo algum item da tela, ele da um padding no item para ele subir um pouco.

  */
export const Overlay = styled.KeyboardAvoidingView`

background: rgba(0, 0, 0, 0.6);
flex: 1;
align-items: stretch;
justify-content: center;

padding: 0 24px;
`;

export const ModalBody = styled.View`

  background:#fafafa;
  border-radius: 8px;
  padding: 24px;

`;

export const Header = styled.View`

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

`;

export const Form = styled.View`

    margin-top: 32px;

`;

/* TextInput é um campo de texto ded um formulário no react-native */
export const Input = styled.TextInput`
  background: #ffffff;
  border: 1px solid rgba(204, 204, 204, 0.5);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;

`;


