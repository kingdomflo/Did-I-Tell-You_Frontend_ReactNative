import React, { PureComponent } from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import { MOCK, API_URL } from 'react-native-dotenv';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import storeReducer from './store';
import Index from './pages/Index';

import { openDatabase } from 'react-native-sqlite-storage';

import i18n from "i18n-js";
import en from "./i18n/en.json";
import fr from "./i18n/fr.json";

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

    const db = await openDatabase({ name: 'Dity.db', location: 'default' });

    await db.transaction((t) => {
      t.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='relationships'",
        [],
        (tr, res) => {
          console.log('item:', res.rows);
          if (res.rows.length === 0 || MOCK) {
            t.executeSql('DROP TABLE IF EXISTS relationships', []);
            t.executeSql(
              'CREATE TABLE IF NOT EXISTS relationships(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), isSync BOOLEAN)',
              []
            );
          }
        }
      );
    });

    // Init data in dev mode
    if (MOCK) {
      // Init relationship
      await db.transaction((t) => {
        t.executeSql(
          'INSERT INTO relationships (name, isSync) VALUES (?, ?)',
          ['Samy Gnu', false]
        );
      });
      await db.transaction((t) => {
        t.executeSql(
          'INSERT INTO relationships (name, isSync) VALUES (?, ?)',
          ['King Furry', false]
        );
      });
    }

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
