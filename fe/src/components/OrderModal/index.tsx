import closeIcon from '../../assets/images/close-icon.svg';

import relogio from '../../assets/images/relogio.svg';
import cozinheiro from '../../assets/images/cozinheiro.svg';
import check from '../../assets/images/check.svg';
import { Order } from '../../types/Order';

import { Actions, ModalBody, OrderDetails, Overlay } from './styles';
import { formatCurrency } from '../../utils/formaCurrency';
import { useEffect } from 'react';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose:()=> void;
  onCancelOrder: () => Promise<void>;
  onChangeOrderStatus:() => void;
  isLoading: boolean;
}

export function OrderModal({visible, order, onClose, onCancelOrder, isLoading, onChangeOrderStatus}: OrderModalProps){

  useEffect(()=>{ //Funcção para fechar o modal só apertando o "ESC"
    function handleKeyDown(event: KeyboardEvent){
      if(event.key === 'Escape'){
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    //Essa parte aqui é para remover o "eventListener" do teclado na hora de desmontar o useEffect e a aplicação
    //Não ficar mais escutando esse evento do teclado e consumindo recurso,ja que o modal não está mais na tela.
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },[onClose]);



  if(!visible || !order){
    return null;
  }

  // let total = 0;
  // order.products.forEach(({product, quantity})=> {
  //   total += product.price * quantity;
  // });

  const total = order.products.reduce((total, { product, quantity})=>{
    return total + (product.price * quantity);
  }, 0);


  return(
    <Overlay>
      <ModalBody>

        <header>
          <strong>Mesa {order.table}</strong>

          <button type='button' onClick={onClose}>
            <img src={closeIcon} alt="Ícone para fechar a janela" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>

            <span>
              {order.status === 'WAITING'       && <img src={relogio}    alt="" width='20 '/>}
              {order.status === 'IN_PRODUCTION' && <img src={cozinheiro} alt="" width='20 '/>}
              {order.status === 'DONE'          && <img src={check}      alt="" width='20 '/>}
            </span>
            <strong>
              {order.status === 'WAITING'       && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE'          && 'Pronto'}
            </strong>
          </div>
        </div>

        <OrderDetails>

          <strong>Itens</strong>
          <div className="order-items">
            {order.products.map(({ _id, product,quantity })=>(
              <div className="item" key={_id}>
                <img src={`https://waiterapp-api.onrender.com/uploads/${product.imagePath}`} alt={product.name} width='56' height='28.51'/>

                <span className="quantity">{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name} </strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong> {formatCurrency(total)}</strong>
          </div>

        </OrderDetails>

        <Actions>
          {order.status !== 'DONE' && (
            <button type='button' className='primary' disabled={isLoading} onClick={onChangeOrderStatus}>
              <span>
                {order.status === 'WAITING'       && <img src={cozinheiro}    alt="" width='20 '/>}
                {order.status === 'IN_PRODUCTION' && <img src={check} alt="" width='20 '/>}
              </span>
              <strong>
                {order.status === 'WAITING'       && 'Iniciar Produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
              </strong>
            </button>
          )}

          <button
            type='button'
            className='secondary'
            onClick={onCancelOrder}
            disabled={isLoading}
          >
            Cancelar pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
