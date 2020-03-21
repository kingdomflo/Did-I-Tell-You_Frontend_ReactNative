import React, { PureComponent } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';

import HomePage from '../pages/HomePage';
import RelationshipPage from '../pages/RelationshipPage';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Auth0 from 'react-native-auth0';
import i18n from "i18n-js";
import en from "../i18n/en.json";
import fr from "../i18n/fr.json";
import SettingPage from '../pages/SettingPage';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../storeActions';

const Tab = createBottomTabNavigator();
const credentials = require('../../auth0-configuration');
const auth0 = new Auth0(credentials);

export interface Props { navigation: any, login(token: any): void, store: any };
export interface States { accessToken: any, currentLanguage: string, acceptedLanguage: string[] };
export interface Props { }
class IndexPage extends PureComponent<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      accessToken: null,
      currentLanguage: "en",
      acceptedLanguage: ["en", "fr"] // will be no, nl, de, sw and fi later
    };

    AsyncStorage.getItem('lang').then(data => {
      console.log(data);
      if (data) {
        this._changeLang(data);
      }
    });
  }

  _onLogin = async () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email offline_access'
      })
      .then(async (credentials: any) => {
        credentials.offline = false;
        credentials.connected = true;
        console.log('someone is login', credentials);
        this.props.login(credentials);
        await AsyncStorage.setItem('auth', JSON.stringify(credentials));
        await AsyncStorage.setItem('online', JSON.stringify(true));
        this.setState({ accessToken: credentials });
      })
      .catch((error: any) => console.log(error));
  };

  _offlineMode = async () => {
    const fakeCredential = {
      offline: true,
      connected: true
    }
    this.props.login(fakeCredential);
    await AsyncStorage.setItem('auth', JSON.stringify(fakeCredential));
    await AsyncStorage.setItem('online', JSON.stringify(false));
    this.setState({ accessToken: fakeCredential });
  }

  _changeLang = async (lang: string) => {
    if (this.state.acceptedLanguage.includes(lang)) {
      this.setState({ currentLanguage: lang });
      i18n.locale = this.state.currentLanguage;
      await AsyncStorage.setItem('lang', lang);
    }
  }

  render() {
    i18n.locale = this.state.currentLanguage;
    i18n.defaultLocale = "en";
    i18n.fallbacks = true;
    i18n.translations = { en, fr };

    return this.props.store.auth.connected === false ?
      (
        <View style={styles.container}>
          <Text style={styles.header}> {i18n.t('General.TitleApp')}</Text>
          <View style={styles.buttonContainer}>
            <Button onPress={this._onLogin}
              title={i18n.t('General.Login')} />
            <Button onPress={this._offlineMode}
              title={i18n.t('General.OfflineMode')} />
          </View>
          <View style={styles.langButtonContainer}>
            <Button onPress={this._changeLang.bind(this, 'fr')} title='FR' />
            <Button onPress={this._changeLang.bind(this, 'en')} title='EN' />
          </View>
        </View >
      ) : (
        <NavigationContainer>
          <Tab.Navigator
            // tslint:disable-next-line: jsx-no-lambda
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'home'
                    : 'home';
                } else if (route.name === 'Relationship') {
                  iconName = focused ? 'user' : 'user';
                } else if (route.name === 'Setting') {
                  iconName = focused ? 'gear' : 'gear';
                }
                else {
                  iconName = 'bookmark'
                }
                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Home" component={HomePage} options={{ tabBarLabel: i18n.t('Menu.Home') }} />
            <Tab.Screen name="Relationship" component={RelationshipPage} options={{ tabBarLabel: i18n.t('Menu.Relationship') }} />
            <Tab.Screen name="Setting" component={SettingPage} options={{ tabBarLabel: i18n.t('Menu.Setting') }} />
          </Tab.Navigator>
        </NavigationContainer>
      )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around'
  },
  langButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});


const mapStateToProps = (state: any) => {
  const { store } = state
  return { store }
};

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    login,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);