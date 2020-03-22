import React, { PureComponent } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import i18n from "i18n-js";
import RelationshipService from "../services/relationship.service";
import { Relationship } from 'app/models/Relationship';

export interface Props { navigation: any }
export default class RelationshipPage extends PureComponent<Props> {
  state = {
    relationshipList: Array<Relationship>(),
    isLoading: true,
    showModal: false
  }

  _unsubscribe: any;

  relationshipService: RelationshipService;

  constructor(props: any) {
    super(props);
    this.relationshipService = new RelationshipService();
  }

  componentDidMount() {
    this.getAllRelationship();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getAllRelationship();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
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

  listViewItemSeparator = () => {
    return (
      <View style={styles.relationshipSeparator} />
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.relationshipList}
          ItemSeparatorComponent={this.listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.relationship}>{item.name}</Text>}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  relationshipSeparator: {
    height: 0.2,
    flex: 1,
    backgroundColor: '#808080',
    marginHorizontal: 20
  },
  relationship: {
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 20
  }
});