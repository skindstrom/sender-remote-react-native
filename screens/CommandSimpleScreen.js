import Expo from 'expo';
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Modal, Button} from 'react-native';
import t from 'tcomb-form-native';

import CommonStyles from '../common/CommonStyles';
import SmsProgress from '../components/SmsProgress';

const Form = t.form.Form;

export default class CommandSimpleScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          sender: PropTypes.object.isRequired,
          title: PropTypes.string.isRequired,
          commandHeader: PropTypes.string.isRequired,
          responseScreen: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  };

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerStyle: {
      marginTop: Expo.Constants.statusBarHeight
    }
  });

  constructor(props) {
    super(props);

    this.state = { sendingCommand: false, 
      formValue: { pin: props.navigation.state.params.sender.pin }
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.sendingCommand}
          onRequestClose={() => this.setState({ sendingCommand: false })}>
          <SmsProgress
            responseCallback={(response) => {
              this.setState({ sendingCommand: false });
              navigation.navigate(navigation.state.params.responseScreen,
                {
                  response
                });
            }}
            cancelCallback={() => this.setState({ sendingCommand: false })}
            to={navigation.state.params.sender.number}
            msg={this.createMessage(this.state.formValue)} />
        </Modal>
        <Form
          ref='form'
          type={formModel}
          options={formOptions}
          value={this.state.formValue}
          onChange={(value) => this.setState({formValue: value})}/>
        <Button title='Send' onPress={() => this.setState({ sendingCommand: true })} />
      </View>
    )
  }

  createMessage({pin}) {
    if (pin) {
      return this.props.navigation.state.params.commandHeader + ' ' + pin;
    }
    return '';
  }
}

const formModel = t.struct({
  pin: t.String
});

const formOptions = {
  fields: {
    pin: { keyboardType: 'numeric', secureTextEntry: true }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: CommonStyles.backgroundColor
  }
});