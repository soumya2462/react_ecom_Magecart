import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Price } from '../../../../common';
import { Price as PricePojo, getPriceFromChildren } from '../../../../utils/products';
import { ProductType } from '../../../../types';

/**
 * @todo In future PriceContianer can show other information,
 * like with or without tax
 */
const PriceContainer = ({
  sku, // used in redux to access correct state
  price,
  productType,
  selectedProduct,
  children, // redux
  /**
   * @redux currency symbol to display along side price
   */
  currencySymbol,
  currencyRate,
}) => {
  const getPriceProps = () => {
    const priceProps = {
      basePrice: price,
    };
    if (productType === 'configurable' && children) {
      if (selectedProduct) {
        priceProps.basePrice = selectedProduct.price;
        return priceProps;
      }
      const { starting, ending } = getPriceFromChildren(children);
      if (starting === ending) {
        priceProps.basePrice = starting;
      } else {
        priceProps.startingPrice = starting;
        priceProps.endingPrice = ending;
      }
    }
    return priceProps;
  };

  return (
    <Price
      {...getPriceProps()}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
    />
  );
};

PriceContainer.propTypes = {
  selectedProduct: PropTypes.oneOfType([ProductType, undefined]),
  productType: PropTypes.string.isRequired,
  price: PropTypes.number,
  sku: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(ProductType), // redux
  currencySymbol: PropTypes.string.isRequired, // redux
  currencyRate: PropTypes.number.isRequired, // redux
};

PriceContainer.defaultProps = {
  children: [],
  selectedProduct: undefined,
  price: 0,
};

const mapStateToProps = ({ product, magento }, { sku }) => {
  const {
    current: {
      [sku]: {
        children
      }
    }
  } = product;
  const {
    displayCurrencySymbol: currencySymbol,
    displayCurrencyExchangeRate: currencyRate,
  } = magento.currency;

  return {
    currencySymbol,
    currencyRate,
    children,
  };
};

export default connect(mapStateToProps)(PriceContainer);
