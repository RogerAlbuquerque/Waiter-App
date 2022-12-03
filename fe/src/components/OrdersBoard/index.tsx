import { useState } from 'react';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string
  title: string
  orders: Order[];


  //Essas duas abaixo são formas diferentes de declarar um elemento que é um ARRAY DE OBJETOS
  // orders:Array<{
  //   _id:string;
  // }>
  // orders:{
  //   _id:string;
  // }[];
}


export function OrdersBoard({icon,title, orders}: OrdersBoardProps){
  const [isModalVisible,setIsModalVisible] = useState(false);

  function handleOpenModal (){

    setIsModalVisible(true);
  }

  return(

    <Board>
      <OrderModal visible={isModalVisible}/>

      <header>
        <span><img src={icon} alt="Ícone"  width='20'/></span>
        <strong>{title} </strong>
        <span>({orders.length})</span>
      </header>


      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order)=> (
            <button type='button' key={order._id} onClick={handleOpenModal}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}

    </Board>
  );
}
