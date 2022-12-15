import { useEffect, useState } from 'react';

import { OrdersBoard } from '../OrdersBoard';
import { Container} from './styles';
import Relogio from '../../assets/images/relogio.svg';
import Cozinheiro from '../../assets/images/cozinheiro.svg';
import Check from '../../assets/images/check.svg';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';



export function Orders(){
  const [orders, setOrders] = useState<Order[]>([]);

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

  return(
    <>
      <Container>

        <OrdersBoard
          icon={Relogio}
          title="Fila de espera"
          orders={orders}
          onCancelOrder={handleCancelOrder}

        />
        <OrdersBoard
          icon={Cozinheiro}
          title="Em preparação"
          orders={inProduction}
          onCancelOrder={handleCancelOrder}
        />
        <OrdersBoard
          icon={Check}
          title="Pronto"
          orders={done}
          onCancelOrder={handleCancelOrder}
        />
      </Container>
    </>
  );
}
