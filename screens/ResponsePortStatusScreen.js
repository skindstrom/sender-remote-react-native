import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { ResponseNavigationOptions } from '../common/CommonViews';
import CommonStyles from '../common/CommonStyles';
import { getValues } from '../common/PortStatusParser';

export default function ResponsePortStatusScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {createSections(getValues(props.navigation.state.params.response))}
      </ScrollView>
    </View>
  )
}

function createSections(values) {
  let sections = [];
  for (const val of values) {
    let header;
    if (val.type == 'in') {
      header = 'Input ' + val.portNumber;
    } else {
      header = 'Output ' + val.portNumber;
    }

    let textStyles = [styles.sectionText];
    if (val.alarm) {
      textStyles.push(styles.alarmText)
    }

    sections.push(
      <View key={header} style={styles.section}>
        <Text style={styles.sectionHeader}>
          {header}
        </Text>
        <Text style={textStyles}>
          {val.value}
        </Text>
      </View>)
  }

  return sections;
}

ResponsePortStatusScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        response: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

ResponsePortStatusScreen.navigationOptions = ResponseNavigationOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyles.backgroundColor
  },
  scrollView: {
    padding: 10
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16
  },
  alarmText: {
    color: '#ff0033'
  }
});