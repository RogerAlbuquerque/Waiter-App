import { OrdersBoard } from '../OrdersBoard';
import { Container} from './styles';
import Relogio from '../../assets/images/relogio.svg';
import Cozinheiro from '../../assets/images/cozinheiro.svg';
import Check from '../../assets/images/check.svg';
import { Order } from '../../types/Order';

const orders: Order[] = [
  {
    '_id': '6789a98aasdfa9879qwefq987qw98q9w8',
    'table':'123',
    'status':'WAITING',
    'products':[
      {
        'product':{
          'name': 'Pizza quatro queijos',
          'imagePath': '1234123413-quatro-queijos.png',
          'price':40,
        },
        'quantity':3,
        '_id': '1123413k23kopl123l2l3l4k3l5'
      },
      {
        'product':{
          'name': 'Coca Cola',
          'imagePath': '1234123413-quatro-queijos.png',
          'price':7,
        },

        'quantity':2,
        '_id': '12341324qweret34sg3g354'
      }

    ],
  }
];

export function Orders(){
  return(
    <>
      <Container>

        <OrdersBoard
          icon={Relogio}
          title="Fila de espera"
          order={orders}

        />
        <OrdersBoard
          icon={Cozinheiro}
          title="Em preparação"
          order={[]}
        />
        <OrdersBoard
          icon={Check}
          title="Pronto"
          order={[]}
        />
      </Container>
    </>
  );
}
