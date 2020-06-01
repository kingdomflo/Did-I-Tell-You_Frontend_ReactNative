import React, { FunctionComponent } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import i18n from "i18n-js";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../storeActions';

import { Container } from "../styles";

export interface Props { navigation: any, route: any, logout(): void, screenProps: any }

const SettingPage: FunctionComponent<Props> = props => {

  function onPressButtonChangeLang(lang: string) {
    console.log('change lang', lang);
    props.route.params.changeLanguage(lang);

    // TODO try to change lang whitout logout to impact the change everywhere
    props.logout();
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button onPress={props.logout} title='Logout' color={'red'} />
      </View>
      <View style={styles.button}>
        <Button
          onPress={e => { onPressButtonChangeLang("fr") }}
          title="Français"
        />
      </View>
      <View style={styles.button}>
        <Button
          onPress={e => { onPressButtonChangeLang("en") }}
          title="English"
        />
      </View>
    </View>
  )
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