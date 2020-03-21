import React, { PureComponent } from 'react';
import { View, Text, FlatList } from 'react-native';
import i18n from "i18n-js";
import RelationshipService from "../services/relationship.service";
import { Relationship } from 'app/models/Relationship';

export interface Props { }
export default class RelationshipPage extends PureComponent<Props> {
  state = {
    relationshipList: Array<Relationship>(),
    isLoading: true,
    showModal: false
  }

  relationshipService: RelationshipService;

  constructor(props: any) {
    super(props);
    this.relationshipService = new RelationshipService();
  }

  componentDidMount() {
    this.getAllRelationship();
  }

  getAllRelationship() {
    this.relationshipService.getAllRelationship()
      .then((response: any) => {
        this.setState({
          relationshipList: response.data
        });
        console.log('success', response);
      })
      .catch((error: any) => {
        console.log('error', error.response);
      })
      .then(() => {
        console.log("finish");
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    return (
      <View>
        <Text>{i18n.t('Menu.Relationship')}</Text>
        <FlatList
          data={this.state.relationshipList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      </View>
    )
  }

}