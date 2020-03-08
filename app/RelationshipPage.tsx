import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

export interface Props { }
export default class RelationshipPage extends PureComponent<Props> {
  constructor(props: any) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <View>
        <Text>Hello Relationship</Text>
      </View>
    )
  }

}