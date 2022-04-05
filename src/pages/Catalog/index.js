import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import FeatherIcons from 'react-native-vector-icons/Feather';

import * as CartActions from '../../store/modules/cart/actions';

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
  const dispatch = useDispatch();
  const productsCart = useSelector(({ cart }) => cart);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await api.get('/products');

      setProducts(data);
    };
    loadProducts();
  }, []);

  const cartSize = useMemo(() => {
    return productsCart.length || 0;
  }, [productsCart]);

  const handleAddToCart = (id) => {
    dispatch(CartActions.addToCartRequest(id));
  };

  const renderItem = ({ item }) => {
    return (
      <Product>
        <ProductImage source={{ uri: item.image_url }} />
        <ProductTitle>{item.title}</ProductTitle>
        <PriceContainer>
          <ProductPrice>{formatValue(item.price)}</ProductPrice>
          <ProductButton
            onPress={() => {
              handleAddToCart(item.id);
            }}
          >
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
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={renderItem}
        />
      </ProductContainer>
      {cartSize > 0 && <FloatingCart />}
    </Container>
  );
};

export default Catalog;
