import { FlatList } from 'react-native';
import { CartItem } from '../../types/CartItems';
import { Item, ProductContainer, Actions, Image } from './styles';

interface CartProps{
cartItems: CartItem[];
}

export function Cart({cartItems}: CartProps){
  return (
    <FlatList
      data={cartItems}
      keyExtractor={cartItem => cartItem.product._id}
      showsVerticalScrollIndicator={false}
      renderItem={({item: cartItem})=> (
        <Item>
          <ProductContainer>
            <Image source={{
              uri: `http://192.168.1.8:3001/uploads/${cartItem.product.imagePath}`,
            }}/>
          </ProductContainer>
          <Actions></Actions>
        </Item>

      )}
    />
  );
}
