import { useState } from 'react';
import { toast } from 'react-toastify';

import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string
  title: string
  orders: Order[];
  onCancelOrder: (ordersId: string) => void;


  //Essas duas abaixo são formas diferentes de declarar um elemento que é um ARRAY DE OBJETOS
  // orders:Array<{_id:string;}>

  // orders:{_id:string;}[];
}


export function OrdersBoard({icon,title, orders, onCancelOrder}: OrdersBoardProps){
  const [isModalVisible,setIsModalVisible] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [selectedOrder,setSelectedOrder] = useState<null | Order>(null);

  function handleOpenModal (order:Order){

    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  function handleCloseModal(){
    setSelectedOrder(null);
    setIsModalVisible(false);
  }

  async function handleCancelOrder(){
    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder!.table} foi cancelado!`);
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return(

    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}

      />

      <header>
        <span><img src={icon} alt="Ícone"  width='20'/></span>
        <strong>{title} </strong>
        <span>({orders.length})</span>
      </header>


      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order)=> (
            <button type='button' key={order._id} onClick={()=> handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}

    </Board>
  );
}
