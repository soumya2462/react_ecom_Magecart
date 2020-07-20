import React, { useState, useEffect, useContext } from 'react';
import {
  UIManager,
  Platform,
  LayoutAnimation,
  View,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, Card } from '../../../../common';
import CategoryTree from '../CategoryTree/CategoryTree';
import { NAVIGATION_TO_CATEGORY_LIST_SCREEN } from '../../../../navigation';
import { setNewCategory } from '../../../../store/actions';
import { ThemeContext } from '../../../../theme';
import { SPACING } from '../../../../constants';

// TODO: Hide category which don't have product and children_data
const CategoryTreeItem = ({ category, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(0);

  useEffect(() => {
    // componentDidMount
    if (Platform.OS === 'android') {
      // eslint-disable-next-line no-unused-expressions
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  /*
    componentWillUpdate() {
      LayoutAnimation.easeInEaseOut();
    }
  */

  const onRowPress = () => {
    if (category.product_count !== 0) {
      dispatch(setNewCategory(category.id));
      navigation.navigate(NAVIGATION_TO_CATEGORY_LIST_SCREEN, {
        title: category.name,
        id: category.id
      });
    } else {
      setExpanded(!expanded);
    }
  };

  const renderExpandButton = () => {
    if (category.children_data.length) {
      const icon = expanded ? 'caret-up' : 'caret-down';
      return (
        <Icon
          style={styles.expandIcon(theme)}
          name={icon}
          color={theme.bodyTextColor}
          size={20}
          onPress={() => setExpanded(!expanded)}
        />
      );
    }
    return <></>;
  };

  const renderItem = () => (
    <Card
      onPress={onRowPress}
      style={styles.card(theme)}
    >
      <Text>{category.name}</Text>
      {renderExpandButton()}
    </Card>
  );

  const renderChildren = () => {
    if (expanded) {
      return <CategoryTree navigation={navigation} categories={category.children_data} />;
    }
    return null;
  };


  return (
    <View style={styles.container(theme)}>
      {renderItem()}
      {renderChildren()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    marginLeft: SPACING.large,
  }),
  card: theme => ({
    borderWidth: 0,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: theme.borderColor,
  }),
  expandIcon: theme => ({
    padding: 2,
    paddingRight: SPACING.large
  }),
});

CategoryTreeItem.propTypes = {
  category: PropTypes.object.isRequired,
};

CategoryTreeItem.defaultProps = {};

export default CategoryTreeItem;
