import { FlatList } from 'react-native';

import {categories} from '../../mocks/categories';
import { Category, Icon } from './styles';
import { Image } from 'react-native';


export function Categories(){
  return (



    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={category => category._id}
      contentContainerStyle = {{paddingRight: 24}}
      renderItem={({item: category})=>(
        <Category>

          <Icon>
            {category.icon == 'pizza'      && <Image source={require('../../mocks/categoriesIcons/pizza.png')}/>}
            {category.icon == 'bebidas'    && <Image source={require('../../mocks/categoriesIcons/bebidas.png')}/>}
            {category.icon == 'hamburguer' && <Image source={require('../../mocks/categoriesIcons/hamburguer.png')}/>}
            {category.icon == 'promo'      && <Image source={require('../../mocks/categoriesIcons/promo.png')}/>}
          </Icon>

        </Category>
      )}

    />





  );
}
