import { fork } from 'redux-saga/effects';

import accountSagas from './account/accountSagas';
import authSagas from './auth/authSagas';
import cartSagas from './cart/cartSagas';
import magentoSagas from './magento/magentoSagas';
import homeSagas from './home/homeSagas';
import categoryTreeSagas from './categoryTree/categoryTreeSagas';
import categoryListSagas from './categoryList/categoryListSagas';
import checkoutSagas from './checkout/checkoutSagas';
import productSagas from './product/productSagas';
import searchSagas from './search/searchSagas';

/**
 * rootSaga
 */
export default function* root() {
  yield fork(magentoSagas);
  yield fork(homeSagas);
  yield fork(categoryTreeSagas);
  yield fork(authSagas);
  yield fork(accountSagas);
  yield fork(cartSagas);
  yield fork(categoryListSagas);
  yield fork(checkoutSagas);
  yield fork(productSagas);
  yield fork(searchSagas);
}
