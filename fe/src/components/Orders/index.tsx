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
  return(
    <>
      <Container>

        <OrdersBoard
          icon={Relogio}
          title="Fila de espera"
          orders={orders}

        />
        <OrdersBoard
          icon={Cozinheiro}
          title="Em preparação"
          orders={orders}
        />
        <OrdersBoard
          icon={Check}
          title="Pronto"
          orders={orders}
        />
      </Container>
    </>
  );
}
