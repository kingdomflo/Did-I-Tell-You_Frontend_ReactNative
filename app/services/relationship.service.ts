import { MOCK_GET_RELATIONSHIPS, MOCK_GET_RELATIONSHIP } from "../mocks/relationship.mock";
import AsyncStorage from '@react-native-community/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';

export default class RelationshipService {
  baseUrl: string;
  mock: any;

  constructor() {
    this.baseUrl = 'relationship/';
    this.mock = process.env.REACT_APP_MOCK;
  }

  async getAllRelationship() {
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
                console.log(res.rows.item(i));
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

  async getOneRelationship(id: number) {
    // return this.mock ? MOCK_GET_RELATIONSHIP : this.baseService.get(`${this.baseUrl}${id}`);
  }

}