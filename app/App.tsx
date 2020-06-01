import React, { PureComponent } from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import { MOCK, API_URL } from 'react-native-dotenv';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import storeReducer from './store';
import Index from './pages/Index';

import i18n from "i18n-js";
import en from "./i18n/en.json";
import fr from "./i18n/fr.json";
import BaseService from './services/base.service';

const store = createStore(storeReducer);

export interface Props { navigation: any };
export interface States { currentLanguage: string, acceptedLanguage: string[] };

export default class App extends PureComponent<Props, States> {

  constructor(props: any) {
    super(props);
    this.state = {
      currentLanguage: "en",
      acceptedLanguage: ["en", "fr"] // will be no, nl, de, sw and fi later
    };
    console.log('Mock?', MOCK, 'Api URL?', API_URL);

    AsyncStorage.getItem('lang').then(data => {
      console.log(data);
      if (data) {
        this._changeLanguage(data);
      }
    });
  }

  async componentDidMount() {
    await BaseService.initTable();
  }

  _changeLanguage = async (language: string) => {
    console.log('hit main change language', language);
    if (this.state.acceptedLanguage.includes(language)) {
      this.setState({ currentLanguage: language });
      i18n.locale = this.state.currentLanguage;
      await AsyncStorage.setItem('lang', language);
    }
  }

  render() {
    i18n.locale = this.state.currentLanguage;
    i18n.defaultLocale = "en";
    i18n.fallbacks = true;
    i18n.translations = { en, fr };

    const screenProps = {
      changeLanguage: this._changeLanguage
    }

    return (
      <Provider store={store}>
        <Index screenProps={screenProps} />
      </Provider>
    )
  }
}
