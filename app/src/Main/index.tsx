import { useEffect, useState } from 'react';

import { ActivityIndicator } from 'react-native';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { CartItem } from '../types/CartItems';
import { Product } from '../types/Product';

import { Container,CategoriesContainer, MenuContainer, Footer, FooterContainer, CenteredContainer } from './styles';

import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/Category';
import { api } from '../utils/api';


export function Main(){

  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {

    // axios.get('http://192.168.1.8:3001/categories').then((response)=>{
    //   setCategories(response.data);
    // });

    // DESSE JEITO VAI SER FEITO UMA REQUEST POR VEZ

    // axios.get('http://192.168.1.8:3001/products').then((response)=>{
    //   setProducts(response.data);
    // });

    //Aqui as duas requests vão ser feitas juntas
    Promise.all([
      api.get('/categories'),
      api.get('/products'),
    ]).then(([categoriesResponse, productResponse])=> { /* Os dados das requisições podem ser acessados em arrays agora, cada posição de acordo com a
                                                           posição de chamada da requisição. Sabendo disso, é possível então invés de pegar as posições
                                                           acessando "response[0]" da pra desestruturar isso  */
      setCategories(categoriesResponse.data);
      setProducts(productResponse.data);
      setIsLoading(false);
    });

  },[]);

  async function handleSelectCategory(categoryId: string){
    // const route =`/categories/${categoryId}/products`;
    const route = !categoryId ? '/products' : `/categories/${categoryId}/products`;

    setIsLoadingProducts(true);
    /*O "data" desse jeito é uma forma de desestrutura a resposta da requisição, então ele ja vai pegar direto o "data" tipo como  se fosse "response.data" */
    const { data } = await api.get(route);


    setProducts(data);
    setIsLoadingProducts(false);

  }

  function handleSaveTable(table: string){
    setSelectedTable(table);
  }

  function handleResetOrder(){
    setSelectedTable('');
    setCartItems([]);
  }

  function hadleConfirmOrder(){
    setSelectedTable('');
    setCartItems([]);
  }


  function handleAddToCart(product: Product){
    if(!selectedTable){
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);
      /*
      Esse "findeIndex" fazer um loop em todos os elementos da array que nesse caso é o "prevState" que faz referência a todos os itens do state cartItem.
      Nesse loop ele vai ver se existe algum product que tem o _id igual ao ?_id do produto que veio na função, se tiver, a const vai ter o valor do index
      desse product e caso ele  não encontre a const vai ficar com o valor de -1
      */

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

  function handleDecrementCartItem(product: Product){

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if(item.quantity === 1){

        newCartItems.splice(itemIndex,1);   /* O "splice" ele vai pegar o elemento na posição "itemIndex" e remover até o elemento da posição 1,
                                               nesse caso será somente ele mesmo */

        return newCartItems;
      }


      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;


    });
  }



  return(
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator color="#D73035" size="large"/>
          </CenteredContainer>
        ): (
          <>
            <CategoriesContainer>
              <Categories categories={categories} onSelectCategory={handleSelectCategory}/>
            </CategoriesContainer>

            {isLoadingProducts?(
              <CenteredContainer>
                <ActivityIndicator color="#D73035" size="large"/>
              </CenteredContainer>
            ):(
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu onAddToCart= {handleAddToCart} products={products}/>
                  </MenuContainer>
                ):(
                  <CenteredContainer>
                    <Empty />
                    <Text color='#666' style={{marginTop: 24}}>
                      Nenhum produto foi encontrado!
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}



          </>
        ) }

      </Container>


      <Footer>
        <FooterContainer>

          {!selectedTable && (
            <Button onPress={()=> setIsTableModalVisible(true)} disabled={isLoading}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              selectedTable={selectedTable}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
            />
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
