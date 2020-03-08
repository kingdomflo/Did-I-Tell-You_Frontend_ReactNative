import React, { PureComponent } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './HomePage';
import RelationshipPage from './RelationshipPage';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MOCK, API_URL } from 'react-native-dotenv';
import Auth0 from 'react-native-auth0';

const Tab = createBottomTabNavigator();

const credentials = require('../auth0-configuration');
const auth0 = new Auth0(credentials);

export interface Props { navigation: any };
export interface States { accessToken: any };
export default class App extends PureComponent<Props, States> {

  constructor(props: any) {
    super(props);
    this.state = { accessToken: null };

    console.log('Mock?', MOCK, 'Api URL', API_URL);
  }

  _onLogin = () => {
    console.log('hey login');
    auth0.webAuth
      .authorize({
        scope: 'openid profile email'
      })
      .then((credentials: any) => {
        console.log('ho one login', credentials);
        this.setState({ accessToken: credentials.accessToken });
      })
      .catch((error: any) => console.log(error));

    // TODO Mock that
    // this.setState({ accessToken: 'todo' });
  };

  render() {
    const loggedIn = this.state.accessToken === null ? false : true;

    return this.state.accessToken === null ? (
      <View style={styles.container}>
        <Text style={styles.header}> DITY - Login </Text>
        <Text>
          You are{loggedIn ? ' ' : ' not '}logged in . </Text>
        <Button onPress={this._onLogin}
          title={loggedIn ? 'Log Out' : 'Log In'} />
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
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Relationship" component={RelationshipPage} />
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});


