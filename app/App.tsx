import React, { PureComponent } from 'react';
import 'react-native-gesture-handler';

import { MOCK, API_URL } from 'react-native-dotenv';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import storeReducer from './store';
import Index from './pages/Index';

import { openDatabase } from 'react-native-sqlite-storage';

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

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}
