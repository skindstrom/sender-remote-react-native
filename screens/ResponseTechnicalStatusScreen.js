import Expo from 'expo';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { ResponseNavigationOptions } from '../common/CommonViews';
import CommonStyles from '../common/CommonStyles';
import { getValues } from '../common/TechnicalStatusParser';

export default function ResponseTechnicalStatusScreen(props) {
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
    let header = val.field;
    if (header.toLowerCase() == 'typ') {
      header = 'Type';
    }

    sections.push(
      <View key={header} style={styles.section}>
        <Text style={styles.sectionHeader}>
          {header}
        </Text>
        <Text style={styles.sectionText}>
          {val.value}
        </Text>
      </View>)
  }

  return sections;
}

ResponseTechnicalStatusScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        response: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

ResponseTechnicalStatusScreen.navigationOptions = ResponseNavigationOptions;

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
    marginBottom: 10
  },
  sectionText: {
    fontSize: 16
  }
});