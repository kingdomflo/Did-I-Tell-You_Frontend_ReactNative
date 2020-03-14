import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import i18n from "i18n-js";

export interface Props { }
export default class RelationshipPage extends PureComponent<Props> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>{i18n.t('Menu.Relationship')}</Text>
      </View>
    )
  }

}