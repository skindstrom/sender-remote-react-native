import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableHighlight, Text } from 'react-native';

import { getCommands } from '../data/CommandRepository';
import { Separator } from '../common/CommonViews';
import CommonStyles from '../common/CommonStyles';

export default class CommandListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.sender.name,
      headerStyle: {
        marginTop: Expo.Constants.statusBarHeight
      }
    };
  };

  constructor(props) {
    super(props);

    this.state = { commands: [] };

    this.getCommands = this.getCommands.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    this.getCommands();
  }

  render() {
    return <FlatList
      style={styles.list}
      data={this.state.commands}
      renderItem={this.renderItem}
      keyExtractor={this.keyExtractor}
      ItemSeparatorComponent={Separator}
    />
  }

  keyExtractor(command) {
    return command.type;
  }

  renderItem({ item }) {
    const { navigation } = this.props;
    return (
      <TouchableHighlight style={CommonStyles.ListItemStyle.container}
        underlayColor='#d3d3d3'
        onPress={() => {
          let destination = null;
          let params = {};
          switch (item.type) {
            case 'on':
              destination = 'CommandOn';
              break;
            case 'off':
              destination = 'CommandOff';
              break;
            case 'limits':
              destination = 'CommandLimits';
              break;
            case 'pin':
              destination = 'CommandPin';
              break;
            case 'status':
              destination = 'CommandSimple';
              params = {
                title: 'Status Command',
                commandHeader: 'STATUS',
                responseScreen: 'ResponsePortStatus'
              };
              break;
            case 'temperature':
              destination = 'CommandSimple';
              params = {
                title: 'Temperature Command',
                commandHeader: 'TEMP',
                responseScreen: 'ResponsePortStatus'
              };
              break;
            case 'humidity':
              destination = 'CommandSimple';
              params = {
                title: 'Humidity Command',
                commandHeader: 'HUMID',
                responseScreen: 'ResponsePortStatus'
              };
              break;
            case 'measurements':
              destination = 'CommandSimple';
              params = {
                title: 'Measurements Command',
                commandHeader: 'MEAS',
                responseScreen: 'ResponsePortStatus'
              };
              break;
            case 'sw':
              destination = 'CommandSimple';
              params = {
                title: 'Technical Status Command',
                commandHeader: 'SW',
                responseScreen: 'ResponseTechnicalStatus'
              };
              break;
          }

          if (destination) {
            navigation.navigate(destination, {
              ...params,
              sender: navigation.state.params.sender,
              command: item
            });
          } else {
            alert('Clicked: ' + JSON.stringify(item))
          }
        }}>
        <Text style={CommonStyles.ListItemStyle.text}>{item.description}</Text>
      </TouchableHighlight>
    )
  }

  async getCommands() {
    try {
      const commands = await getCommands();
      this.setState({ commands });
    } catch (error) {
      console.log('Error fetching commands: ' + error);
    }
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: CommonStyles.backgroundColor
  }
});