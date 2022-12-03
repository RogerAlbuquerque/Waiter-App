import { ModalBody, Overlay } from './styles';

interface OrderModalProps {
  visible: boolean;
}
export function OrderModal({visible}: OrderModalProps){
  if(!visible){
    return null;
  }

  return(
    <Overlay>
      <ModalBody>
        <h1>OrderModal</h1>
      </ModalBody>
    </Overlay>
  );
}
