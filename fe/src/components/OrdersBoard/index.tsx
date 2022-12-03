import { Order } from '../../types/Order';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string
  title: string
  order: Order[];


  //Essas duas abaixo são formas diferentes de declarar um elemento que é um ARRAY DE OBJETOS
  // orders:Array<{
  //   _id:string;
  // }>
  // orders:{
  //   _id:string;
  // }[];
}


export function OrdersBoard({icon,title, order}: OrdersBoardProps){
  return(
    <Board>
      <header>
        <span><img src={icon} alt="Ícone"  width='20'/></span>
        <strong>{title} </strong>
        <span>(1)</span>
      </header>


      <OrdersContainer>
        <button type='button'>
          <strong>Mesa 2</strong>
          <span>2 itens</span>
        </button>

        <button type='button'>
          <strong>Mesa 2</strong>
          <span>2 itens</span>
        </button>
      </OrdersContainer>
    </Board>
  );
}
