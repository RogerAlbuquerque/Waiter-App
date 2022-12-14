import { Modal, ImageBackground, FlatList} from 'react-native';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formaCurrency';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Image, CloseButton, Header, ModalBody, IngredientsContainer, Ingredient, Footer, FooterContainer, PriceContainer} from './styles';




interface ProductModalProps{
  visible: boolean;
  onClose:()=>void;
  product: null | Product;
  onAddToCart: (product:Product)=> void;
}

export function ProductModal({visible, onClose, onAddToCart, product}:ProductModalProps){


  if(!product){
    return null;
  }

  function handleAddToCart(){
    onAddToCart(product!);    /*Essa exclamação serve para dizer para o typescript que mesmo que uma variável possar nula, isso nunca vai acontecer e
                              que ele pode deixar ela passar sem marcar com erro*/
    onClose();
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


        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight='600' color='#666'>Ingredients</Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={ingredient => ingredient._id}
              style={{marginTop: 16}}
              showsVerticalScrollIndicator={false}
              renderItem={({item: ingredient}) => (
                <Ingredient>

                  {/* <Text>{ingredient.icon}</Text> */}

                  {ingredient.icon === 'batata' && <Image style={{width: 20, height:22}} source={require('../../mocks/ingredientsIcons/batata.png')}/>}
                  {ingredient.icon === 'bebida' && <Image style={{width: 20, height:22}} source={require('../../mocks/ingredientsIcons/bebida.png')}/>}
                  {ingredient.icon === 'carne'  && <Image style={{width: 20, height:22}} source={require('../../mocks/ingredientsIcons/carne.png')}/>}
                  {ingredient.icon === 'ovo'    && <Image style={{width: 20, height:22}} source={require('../../mocks/ingredientsIcons/ovo.png')}/>}
                  {ingredient.icon === 'pao'    && <Image style={{width: 20, height:22}} source={require('../../mocks/ingredientsIcons/pao.png')}/>}
                  {ingredient.icon === 'queijo' && <Image style={{width: 20, height:22}} source={require('../../mocks/ingredientsIcons/queijo.png')}/>}
                  {ingredient.icon === 'tomate' && <Image style={{width: 20, height:22}} source={require('../../mocks/ingredientsIcons/tomate.png')}/>}

                  <Text size={14} color="#666" style={{marginLeft:20}}>{ingredient.name}</Text>
                </Ingredient>
              )}

            />
          </IngredientsContainer>
        )}


      </ModalBody>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color='#666'>Preço</Text>
            <Text size={20} weight="600">{formatCurrency(product.price)}</Text>
          </PriceContainer>

          <Button onPress={handleAddToCart}> Adiciona ao pedido</Button>
        </FooterContainer>
      </Footer>



    </Modal>
  );
}
