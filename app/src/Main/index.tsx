import { useState } from 'react';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { products } from '../mocks/products';
import { CartItem } from '../types/CartItems';
import { Container,CategoriesContainer, MenuContainer, Footer, FooterContainer } from './styles';


export function Main(){

  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      quantity: 1,
      product: products[0],
    },

    {
      quantity: 2,
      product: products[1],
    }
  ]);

  function handleSaveTable(table: string){
    setSelectedTable(table);
  }

  function handleCancerlOrder(){
    setSelectedTable('');
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
          <Menu />
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
