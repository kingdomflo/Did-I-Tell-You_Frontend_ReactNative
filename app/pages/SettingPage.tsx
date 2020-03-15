import React, { PureComponent } from 'react';
import { View, Text, Button } from 'react-native';
import i18n from "i18n-js";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../storeActions';

export interface Props { logout(): void }
class SettingPage extends PureComponent<Props> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>{i18n.t('Menu.Setting')}</Text>
        <Button onPress={this.props.logout} title='Logout' />
      </View>
    )
  }

}

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