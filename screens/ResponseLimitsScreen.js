import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ResponseNavigationOptions } from '../common/CommonViews';
import CommonStyles from '../common/CommonStyles';

export default function ResponseLimitsScreen(props) {
  const { response, command } = props.navigation.state.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{fancyText(command, response)}</Text>
    </View>)
}

function fancyText(command, response) {
  if (response.toLowerCase().includes('ok')) {
    return 'Updated limits \n' + (command.low ? 'Low: ' + command.low + '\n' : '') + (command.high ? 'High: ' + command.high : '')
  } else {
    console.error("Couldn't parse limits command");
    // couldn't parse, just return whatever the sender got us
    return response;
  }
}

ResponseLimitsScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        response: PropTypes.string.isRequired,
        command: PropTypes.shape({
          low: PropTypes.number,
          high: PropTypes.number,
          input: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

ResponseLimitsScreen.navigationOptions = ResponseNavigationOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyles.backgroundColor,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  }
});