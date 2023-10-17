import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { OrdersBoard } from '../OrdersBoard';
import { Container} from './styles';
import Relogio from '../../assets/images/relogio.svg';
import Cozinheiro from '../../assets/images/cozinheiro.svg';
import Check from '../../assets/images/check.svg';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';



export function Orders(){
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect (()=> {
    const socket = socketIo(import.meta.env.VITE_API_URI, {
      transports: ['websocket'],
    });
    /** Teste */

    socket.on('orders@new', (order)=>{

      setOrders(prevState => prevState.concat(order));

    });

  },[]);


  useEffect(()=>{
    api.get('/orders')
      .then(({ data }) =>{
        setOrders(data);
      });
  },[]);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string){
    setOrders((prevState) => prevState.filter(order => order._id !== orderId));
  }

  /*
    Esse "Order['status']" ta dizendo basicamente que a variável "status" tem o mesmo tipo que o campo 'status' dentro da
    tipagem de "Order", dava pra escrever a tipagem disso aqui também, mas o código ficaria muito grande
  */
  function handleOrderStatuschange(orderId: string, status: Order['status']){
    setOrders((prevState) => prevState.map((order) =>(
      order._id === orderId ? { ...order, status} : order
    )));
  }

  return(
    <>
      <Container>
        {waiting.length <= 0 ?
          <div style={{display:'flex', flexDirection:'column'}}>
            <h2>Loading orders ...</h2>
            <p>Wait a moment</p>
          </div>
          :
          <>
            <OrdersBoard
              icon={Relogio}
              title="Fila de espera"
              orders={waiting}
              onCancelOrder={handleCancelOrder}
              onChangeOrderStatus={handleOrderStatuschange}

            />
            <OrdersBoard
              icon={Cozinheiro}
              title="Em preparação"
              orders={inProduction}
              onCancelOrder={handleCancelOrder}
              onChangeOrderStatus={handleOrderStatuschange}
            />
            <OrdersBoard
              icon={Check}
              title="Pronto"
              orders={done}
              onCancelOrder={handleCancelOrder}
              onChangeOrderStatus={handleOrderStatuschange}
            />
          </>
        }
      </Container>
    </>
  );
}
