import { Modal, ImageBackground, FlatList} from 'react-native';
import { Product } from '../../types/Product';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Image, CloseButton, Header, ModalBody, IngredientsContainer, Ingredient } from './styles';


interface ProductModalProps{
  visible: boolean;
  onClose:()=>void;
  product: null | Product;
}

export function ProductModal({visible, onClose, product}:ProductModalProps){


  if(!product){
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'   // Isso só funciona no IOS, é para subir o modal e ainda aparecer a página atrás e da de puxar o modal pra baixo
      onResponderEnd={onClose}        // Essa propriedade aqui também só funciona no IOS
    >
      <Image
        source={{
          uri: `http://192.168.1.8:3001/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={24} weight="600">{product.name}</Text>
          <Text color='#666' style={{marginTop: 8}}>{product.description}</Text>
        </Header>

        <IngredientsContainer>
          <Text weight='600' color='#666'>Ingredients</Text>

          <FlatList
            data={product.ingredients}
            keyExtractor={ingredient => ingredient._id}
            style={{marginTop: 16}}
            showsVerticalScrollIndicator={false}
            renderItem={({item: ingredient}) => (
              <Ingredient>
                <Text>{ingredient.icon}</Text>
                {/* {ingredient.icon === 'pizza'      && <Image style={{width: 18, height:20}} source={require('../../mocks/categoriesIcons/pizza.png')}/>} */}
                <Text size={14} color="#666" style={{marginLeft:20}}>{ingredient.name}</Text>
              </Ingredient>
            )}

          />
        </IngredientsContainer>
      </ModalBody>



    </Modal>
  );
}
