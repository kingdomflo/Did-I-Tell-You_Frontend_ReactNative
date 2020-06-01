import { MOCK_GET_RELATIONSHIPS, MOCK_GET_RELATIONSHIP } from "../mocks/relationship.mock";
import AsyncStorage from '@react-native-community/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';
import { Relationship } from "app/models/Relationship";

export default class RelationshipService {
  baseUrl = 'relationship/';
  mock = process.env.REACT_APP_MOCK;

  static async getAllRelationship() {
    let result;
    let online;
    await AsyncStorage.getItem('online').then(data => {
      online = data === 'true';
    });

    if (online) {
      // return this.mock ? MOCK_GET_RELATIONSHIPS : this.baseService.get(this.baseUrl);
      result = MOCK_GET_RELATIONSHIPS;
    } else {
      const db = await openDatabase({ name: 'Dity.db', location: 'default' });

      result = new Promise((resolve, reject) => {
        db.transaction((t: any) => {
          t.executeSql(
            'SELECT * FROM relationships',
            [],
            (tr: any, res: any) => {
              const temp = [];
              for (let i = 0; i < res.rows.length; ++i) {
                temp.push(res.rows.item(i));
              }
              const toReturn = {
                data: temp,
                status: 200
              }
              resolve(toReturn);
            }
          );
        });
      })
    }

    return result;
  }

  static async getOneRelationship(id: number) {
    // return this.mock ? MOCK_GET_RELATIONSHIP : this.baseService.get(`${this.baseUrl}${id}`);
  }

  static async postOneRelationship(relationship: Relationship) {
    const db = await openDatabase({ name: 'Dity.db', location: 'default' });

    await db.transaction((t) => {
      t.executeSql(
        'INSERT INTO relationships (name, isSync) VALUES (?, ?)',
        [relationship.name, false]
      );
    });
  }

}