import React, { PureComponent } from 'react';
import { View, Text, Button } from 'react-native';
import i18n from "i18n-js";

export interface Props { }
export default class SettingPage extends PureComponent<Props> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  _logout = () => {

  }

  render() {
    return (
      <View>
        <Text>{i18n.t('Menu.Setting')}</Text>
        <Button onPress={this._logout} title='Logout' />
      </View>
    )
  }

}