import React, { useContext } from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import LoadingView from '../LoadingView/LoadingView';
import MessageView from '../MessageView/MessageView';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';

// NOTE: Can add functionality to show some fallback message in case of empty view
const GenericTemplate = ({
  children,
  footer,
  /**
   * If set true, `ScrollView` would be root element
   * rather than normal `View`
   */
  scrollable,
  status,
  errorMessage,
  style,
}) => {
  const { theme } = useContext(ThemeContext);
  const ViewGroup = scrollable ? ScrollView : View;

  if (status === Status.ERROR) {
    return <MessageView type="error" message={errorMessage} />;
  }

  if (status === Status.DEFAULT || status === Status.LOADING) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView style={styles.container(theme)}>
      <StatusBar
        barStyle={theme.appbar.barStyle}
        backgroundColor={theme.appbar.statusBarColor}
      />
      <ViewGroup style={[styles.content, style]}>
        {children}
      </ViewGroup>
      {footer}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.backgroundColor,
  }),
  content: {
    flex: 1,
  },
  stickyFooter: {
  },
});

GenericTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  footer: PropTypes.element,
  scrollable: PropTypes.bool.isRequired,
  status: PropTypes.oneOf(Object.values(Status)),
  errorMessage: PropTypes.string,
  style: PropTypes.object,
};

GenericTemplate.defaultProps = {
  status: Status.SUCCESS,
  errorMessage: '',
  style: {},
  footer: <></>
};

export default GenericTemplate;
