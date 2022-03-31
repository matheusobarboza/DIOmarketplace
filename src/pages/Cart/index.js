import React, { useState, useMemo } from 'react';
import { View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  TotalProductsText,
  SubTotalValue,
} from './styles';

import formatValue from '../../utils/formatValue';
import EmptyCart from '../../components/EmptyCart/inde';

const Cart = () => {
  const [products, setProduct] = useState([
    {
      id: '1',
      title: 'Assinatura Trimestral',
      image_url:
        'https://res.cloudinary.com/robertosousa1/image/upload/v1594492578/dio/quarterly_subscription_yjolpc.png',
      price: 150,
      quantity: 1,
    },
    {
      id: '2',
      title: 'Assinatura Trimestral',
      image_url:
        'https://res.cloudinary.com/robertosousa1/image/upload/v1594492578/dio/quarterly_subscription_yjolpc.png',
      price: 150,
      quantity: 2,
    },
  ]);

  const cartSize = useMemo(() => {
    return products.length || 0;
  }, [products]);

  const cartTotal = useMemo(() => {
    const cartAmount = products.reduce((acc, product) => {
      const totalPrice = acc + product.price * product.quantity;
      return totalPrice;
    }, 0);

    return formatValue(cartAmount);
  }, [products]);

  const renderItem = ({ item }) => {
    return (
      <Product>
        <ProductImage source={{ uri: item.image_url }} />
        <ProductTitleContainer>
          <ProductTitle>{item.title}</ProductTitle>
          <ProductPriceContainer>
            <ProductSinglePrice>{formatValue(item.price)}</ProductSinglePrice>

            <TotalContainer>
              <ProductQuantity>( {`${item.quantity}x`} )</ProductQuantity>

              <ProductPrice>
                {formatValue(item.price * item.quantity)}
              </ProductPrice>
            </TotalContainer>
          </ProductPriceContainer>
        </ProductTitleContainer>
        <ActionContainer>
          <ActionButton onPress={() =>{}}>
            <FeatherIcon name='plus' color='#e83f5b' size={16} />
          </ActionButton>

          <ActionButton onPress={() =>{}}>
            <FeatherIcon name='minus' color='#e83f5b' size={16} />
          </ActionButton>
        </ActionContainer>
      </Product>
    );
  };

  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          KeyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyCart />}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={renderItem}
        />
      </ProductContainer>
      <TotalProductsContainer>
        <FeatherIcon name='shopping-cart' color="#fff" size={24} />
        <TotalProductsText>{cartSize} {cartSize === 1 ? 'item' : 'itens'}</TotalProductsText>
        <SubTotalValue>{cartTotal}</SubTotalValue>
      </TotalProductsContainer>
    </Container>
  );
};

export default Cart;
