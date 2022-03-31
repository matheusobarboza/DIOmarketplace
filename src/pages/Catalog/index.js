import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';

import FeatherIcons from 'react-native-vector-icons/Feather';

import FloatingCart from '../../components/FloatingCart';

import formatValue from '../../utils/formatValue';
import api from '../../services/api';

import {
  Container,
  ProductContainer,
  ProductImage,
  ProductList,
  Product,
  ProductTitle,
  PriceContainer,
  ProductPrice,
  ProductButton,
  ProductButtonText,
} from './styles';

const Catalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await api.get('/products');

      setProducts(data);
    }
    loadProducts();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Product>
        <ProductImage source={{ uri: item.image_url }} />
        <ProductTitle>{item.title}</ProductTitle>
        <PriceContainer>
          <ProductPrice>{formatValue(item.price)}</ProductPrice>
          <ProductButton onPress={() => {}}>
            <ProductButtonText>adicionar</ProductButtonText>
            <FeatherIcons size={30} name="plus-circle" color="#d1d7e9" />
          </ProductButton>
        </PriceContainer>
      </Product>
    );
  };

  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={ renderItem }
        />
      </ProductContainer>
      <FloatingCart />
    </Container>
  );
};

export default Catalog;
