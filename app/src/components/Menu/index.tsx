import { useState } from 'react';
import { FlatList } from 'react-native';
import { formatCurrency } from '../../utils/formaCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import {ProductContainer , ProductImage, ProductDetails, Separator, AddToCartButton } from './styles';
import { Product } from '../../types/Product';

interface MenuProps{
  onAddToCart: (product:Product)=> void;
  products: Product[];
}


export function Menu({onAddToCart, products}: MenuProps){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectProduct, setSelectProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product){
    setIsModalVisible(true);
    setSelectProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={()=> setIsModalVisible(false)}
        product={selectProduct}
        onAddToCart={onAddToCart}
      />

      <FlatList
        data={products}
        style={{marginTop:32}}
        contentContainerStyle={{paddingHorizontal:24}}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({item: product})=>(
          <ProductContainer onPress={()=> handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `${process.env.URI_API}/uploads/${product.imagePath}`,
              }}
            />

            <ProductDetails>
              <Text weight='600'>{product.name}</Text>

              <Text size={14} color='#666' style={{paddingVertical: 8}}>{product.description}</Text>

              <Text size={14} weight='600'>{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
      {/* FINAL DA FLATLIST*/}

    </>
  );
}
