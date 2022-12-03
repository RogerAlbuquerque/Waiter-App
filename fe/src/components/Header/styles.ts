import styled from 'styled-components';

// Esses "Container" pode ser usado igual um componente, e tambḿe igual uma tag, pois o lugar que ele estiver vai receber
// Exatamente a tag que está após o ponto do "styled", que nesse caso é a tag "header"
export const Container = styled.header`
  background: #D73035;
  display: flex;
  justify-content: center;
  height: 198px;
  align-items: center;


`;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details{
    h1 {
      color: #fff;
      font-size: 32px;

    }

    h2 {
      color: #fff;
      font-weight: 400;
      font-size: 16px;
      opacity: 0.9;
      margin-top: 6px;
    }

  };


`;
