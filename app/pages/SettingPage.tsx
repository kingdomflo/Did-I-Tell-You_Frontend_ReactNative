import React, { PureComponent } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import i18n from "i18n-js";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../storeActions';
import AsyncStorage from '@react-native-community/async-storage';

import { Container } from "../styles";

export interface Props { navigation: any, route: any, logout(): void, screenProps: any }
class SettingPage extends PureComponent<Props> {
  constructor(props: any) {
    super(props);
  }

  _onPressButtonChangeLang = (lang: string) => {
    console.log('change lang', lang);
    this.props.route.params.changeLanguage(lang);

    // TODO try to change lang whitout logout to impact the change everywhere
    this.props.logout();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button onPress={this.props.logout} title='Logout' color={'red'} />
        </View>
        <View style={styles.button}>
          <Button
            onPress={this._onPressButtonChangeLang.bind(this, "fr")}
            title="Français"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={this._onPressButtonChangeLang.bind(this, "en")}
            title="English"
          />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    ...Container.container
  },
  button: {
    marginVertical: 10
  }
})

const mapStateToProps = (state: any) => {
  const { store } = state
  return { store }
};

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    logout,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);