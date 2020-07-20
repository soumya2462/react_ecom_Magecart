import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { GenericTemplate, Text, Button } from '../../common';
import { NAVIGATION_TO_ORDER_DETAIL_SCREEN } from '../../navigation';
import { resetCheckoutState } from '../../store/actions';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { SPACING } from '../../constants';

// TODO: Extract strings in strings.js
const OrderAcknowledgementScreen = ({
  navigation,
  route,
  resetCheckoutState: _resetCheckoutState,
}) => {
  const { status = Status.ERROR, orderId, errorMessage = translate('orderScreen.orderNotPlace') } = route.params;
  const { theme } = useContext(ThemeContext);

  useEffect(() => (() => {
    // componentDidUnmount: Reset entire checkout state
    _resetCheckoutState();
  }), []);

  const renderFooter = () => (
    <View>
      <Button title={translate('orderScreen.viewOrderButton')} onPress={() => navigation.navigate(NAVIGATION_TO_ORDER_DETAIL_SCREEN, { orderId })} />
      <View style={styles.space(theme)} />
      <Button title={translate('orderScreen.continueButton')} onPress={() => navigation.popToTop()} />
    </View>
  );

  return (
    <GenericTemplate
      scrollable={false}
      status={status}
      errorMessage={errorMessage}
      footer={renderFooter()}
    >
      <View style={styles.container}>
        <Icon name="verified-user" size={30} color="#4caf50" />
        <Text type="subheading" bold>{translate('orderScreen.orderPlaced')}</Text>
        <Text>{translate('orderScreen.orderPlacedMessage')}</Text>
      </View>
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: theme => ({
    flex: 1,
    marginTop: SPACING.small,
  })
});

OrderAcknowledgementScreen.propTypes = {
  orderId: PropTypes.number.isRequired,
  resetCheckoutState: PropTypes.func.isRequired,
};

OrderAcknowledgementScreen.defaultProps = {};

export default connect(null, {
  resetCheckoutState,
})(OrderAcknowledgementScreen);
