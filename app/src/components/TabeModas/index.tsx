import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Overlay, ModalBody, Header, Form, Input } from './styles';

export function TableModal(){
  return (
    <Modal
      transparent
    >
      <Overlay behavior={Platform.OS ==='android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight='600'>Informar a mesa</Text>

            <TouchableOpacity>
              <Close color='#666'/>
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor="#666"
              keyboardType='number-pad'
            />
            <Button onPress={()=> alert('Salvou')}>
              Salvar
            </Button>
          </Form>

        </ModalBody>
      </Overlay>
    </Modal>
  );
}
