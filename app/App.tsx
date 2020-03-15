import React, { PureComponent } from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';

import { MOCK, API_URL } from 'react-native-dotenv';
import Auth0 from 'react-native-auth0';
import i18n from "i18n-js";
import en from "./i18n/en.json";
import fr from "./i18n/fr.json";

import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import storeReducer from './store';
import Index from './pages/Index';

const store = createStore(storeReducer);

export interface Props { navigation: any };
export interface States { };

export default class App extends PureComponent<Props, States> {

  constructor(props: any) {
    super(props);
    this.state = {
    };
    console.log('Mock?', MOCK, 'Api URL?', API_URL);
  }

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}
