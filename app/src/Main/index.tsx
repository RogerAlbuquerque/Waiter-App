import { useState } from 'react';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { CartItem } from '../types/CartItems';
import { Product } from '../types/Product';
import { Container,CategoriesContainer, MenuContainer, Footer, FooterContainer } from './styles';


export function Main(){

  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([

  ]);

  function handleSaveTable(table: string){
    setSelectedTable(table);
  }

  function handleCancerlOrder(){
    setSelectedTable('');
  }

  function handleAddToCart(product: Product){
    if(!selectedTable){
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);
      /*Esse "findeIndex" vai procurar se o item que ta tentando ser adicionado, ja está no carrinho, se ja tiver ele vai retornar a posição do item,
      ou seja o sesu index, se ele não estiver no carrinho vai ser retornado -1*/

      if(itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      };

      return newCartItems;
    });
  }

  return(
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancerlOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>


        <MenuContainer>
          <Menu onAddToCart= {handleAddToCart}/>
        </MenuContainer>

      </Container>


      <Footer>
        <FooterContainer>

          {!selectedTable && (
            <Button onPress={()=> setIsTableModalVisible(true)}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart cartItems={cartItems}/>
          )}

        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={()=>setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
