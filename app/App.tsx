import React, { PureComponent } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './pages/HomePage';
import RelationshipPage from './pages/RelationshipPage';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MOCK, API_URL } from 'react-native-dotenv';
import Auth0 from 'react-native-auth0';
import i18n from "i18n-js";
import en from "./i18n/en.json";
import fr from "./i18n/fr.json";

const Tab = createBottomTabNavigator();

const credentials = require('../auth0-configuration');
const auth0 = new Auth0(credentials);

export interface Props { navigation: any };
export interface States { accessToken: any, offline: boolean, currentLanguage: string, acceptedLanguage: string[] };
export default class App extends PureComponent<Props, States> {

  constructor(props: any) {
    super(props);
    this.state = {
      accessToken: null,
      offline: true,
      currentLanguage: "fr",
      acceptedLanguage: ["en", "fr", "no"] // will be nl, de, sw and fi later
    };

    console.log('Mock?', MOCK, 'Api URL?', API_URL);
  }

  _onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email'
      })
      .then((credentials: any) => {
        console.log('someone is login', credentials);
        this.setState({ accessToken: credentials.accessToken, offline: false });
      })
      .catch((error: any) => console.log(error));
  };

  _offlineMode = () => {
    this.setState({ accessToken: 'todo', offline: true });
  }

  _changeLang = (lang: string) => {
    this.setState({ currentLanguage: lang });
    i18n.locale = this.state.currentLanguage;
  }

  render() {
    i18n.locale = this.state.currentLanguage;
    i18n.defaultLocale = "en";
    i18n.fallbacks = true;
    i18n.translations = { en, fr };
    // const loggedIn = this.state.accessToken === null ? false : true;

    return this.state.accessToken === null ? (
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
                } else {
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
          </Tab.Navigator>
        </NavigationContainer>
      );
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


