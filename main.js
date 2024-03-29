// @flow

import Expo from 'expo';
import { StackNavigator } from 'react-navigation';

import SenderListScreen from './screens/SenderListScreen';
import SenderCreateScreen from './screens/SenderCreateScreen';

import CommandListScreen from './screens/CommandListScreen';
import CommandOnScreen from './screens/CommandOnScreen';
import CommandOffScreen from './screens/CommandOffScreen';
import CommandLimitsScreen from './screens/CommandLimitsScreen';
import CommandPinScreen from './screens/CommandPinScreen';
import CommandSimpleScreen from './screens/CommandSimpleScreen';

import ResponseToggleOutputScreen from './screens/ResponseToggleOutputScreen';
import ResponseLimitsScreen from './screens/ResponseLimitsScreen';
import ResponsePinScreen from './screens/ResponsePinScreen';
import ResponsePortStatusScreen from './screens/ResponsePortStatusScreen';
import ResponseTechnicalStatusScreen from './screens/ResponseTechnicalStatusScreen';

const App = StackNavigator({
  SenderList: { screen: SenderListScreen },
  SenderCreate: { screen: SenderCreateScreen },

  CommandList: {screen: CommandListScreen},

  CommandOn: {screen: CommandOnScreen},
  CommandOff: {screen: CommandOffScreen},
  CommandLimits: {screen: CommandLimitsScreen},
  CommandPin: {screen: CommandPinScreen},
  CommandSimple: {screen: CommandSimpleScreen},

  ResponseToggleOutput: {screen: ResponseToggleOutputScreen},
  ResponseLimits: {screen: ResponseLimitsScreen},
  ResponsePin: {screen: ResponsePinScreen},
  ResponsePortStatus: {screen: ResponsePortStatusScreen},
  ResponseTechnicalStatus: {screen: ResponseTechnicalStatusScreen}
});

Expo.registerRootComponent(App);