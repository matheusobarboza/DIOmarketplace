import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import * as CartActions from '../../store/modules/cart/actions';

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
  const dispatch = useDispatch();
  const products = useSelector(({ cart }) => cart);

  const cartSize = useMemo(() => {
    return products.length || 0;
  }, [products]);

  const cartTotal = useMemo(() => {
    const cartAmount = products.reduce((acc, product) => {
      const totalPrice = acc + product.price * product.amount;
      return totalPrice;
    }, 0);

    return formatValue(cartAmount);
  }, [products]);

  const increment = (product) => {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  };

  const decrement = (product) => {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  };

  const removeFromCart = (id) => {
    dispatch(CartActions.removeFromCart(id));
  };

  const renderItem = ({ item }) => {
    return (
      <Product>
        <ProductImage source={{ uri: item.image_url }} />
        <ProductTitleContainer>
          <ProductTitle>{item.title}</ProductTitle>
          <ProductPriceContainer>
            <ProductSinglePrice>{formatValue(item.price)}</ProductSinglePrice>

            <TotalContainer>
              <ProductQuantity>( {`${item.amount}x`} )</ProductQuantity>

              <ProductPrice>
                {formatValue(item.price * item.amount)}
              </ProductPrice>
            </TotalContainer>
          </ProductPriceContainer>
        </ProductTitleContainer>
        <ActionContainer>
          <ActionButton onPress={() => increment(item)}>
            <FeatherIcon name="plus" color="#e83f5b" size={16} />
          </ActionButton>

          <ActionButton
            onPress={() =>
              item.amount > 1 ? decrement(item) : removeFromCart(item.id)
            }
          >
            <FeatherIcon name="minus" color="#e83f5b" size={16} />
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
        <FeatherIcon name="shopping-cart" color="#fff" size={24} />
        <TotalProductsText>
          {cartSize} {cartSize === 1 ? 'item' : 'itens'}
        </TotalProductsText>
        <SubTotalValue>{cartTotal}</SubTotalValue>
      </TotalProductsContainer>
    </Container>
  );
};

export default Cart;
