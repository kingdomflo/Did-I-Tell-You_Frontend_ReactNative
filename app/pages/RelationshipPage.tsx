import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import i18n from "i18n-js";
import RelationshipService from "../services/relationship.service";
import { Relationship } from 'app/models/Relationship';

export interface Props { navigation: any };

const RelationshipPage = () => {

  const [relationshipList, setRelationshipList] = useState([] as Relationship[]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log('hello relationship page');
    getAllRelationship();
  }, []);

  function getAllRelationship() {
    const relationshipService = new RelationshipService();
    relationshipService.getAllRelationship()
      .then((response: any) => {
        setRelationshipList(response.data)
        console.log('success', response);
      })
      .catch((error: any) => {
        console.log('error', error.response);
      })
      .then(() => {
        console.log("finish");
        setLoading(false);
      });
  }

  function listViewItemSeparator() {
    return (
      <View style={styles.relationshipSeparator} />
    );
  };


  return (
    <View>
      {loading ?
        <Text>Load</Text>
        :
        <FlatList
          data={relationshipList}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.relationship}>{item.name}</Text>}
        />}
    </View>
  );
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

export default RelationshipPage;