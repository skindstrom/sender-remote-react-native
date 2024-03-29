import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';

import CommonStyles from '../common/CommonStyles';

 export default function ResponseToggleOutput(props) {
   return (
     <View style={styles.container}>
       <Text style={styles.text}>{props.response}</Text>
     </View>
    )
}

ResponseToggleOutput.propTypes = {
  response: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonStyles.backgroundColor
  },
  text: {
    fontSize: 18
  }
});