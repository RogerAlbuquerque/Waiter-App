import { FlatList } from 'react-native';


import { CategoryContainer, Icon } from './styles';
import { Image } from 'react-native';
import { useState } from 'react';
import { Text } from '../Text';
import { Category } from '../../types/Category';

interface CategoriesProps{
  categories: Category[];
  onSelectCategory: (categoryId: string) => Promise <void>;
}

export function Categories({categories, onSelectCategory}: CategoriesProps){

  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string){
    const category = selectedCategory === categoryId ? '' : categoryId;

    onSelectCategory(category);
    setSelectedCategory(category);
  }

  return (


    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={category => category._id}
      contentContainerStyle = {{paddingRight: 24}}
      renderItem={({item: category})=>{
        const isSelected = selectedCategory === category._id;
        return(

          <CategoryContainer onPress={() => handleSelectCategory(category._id)}>

            <Icon style={{opacity: isSelected ? 1 : 0.5}}>
              {category.icon == 'pizza'      && <Image source={require('../../mocks/categoriesIcons/pizza.png')}/>}
              {category.icon == 'bebida'    && <Image source={require('../../mocks/categoriesIcons/bebidas.png')}/>}
              {category.icon == 'Hamburguer' && <Image source={require('../../mocks/categoriesIcons/hamburguer.png')}/>}
              {category.icon == 'promo'      && <Image source={require('../../mocks/categoriesIcons/promo.png')}/>}
            </Icon>

            <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>{category.name}</Text>

          </CategoryContainer>

        );
      }
      }

    />





  );
}
