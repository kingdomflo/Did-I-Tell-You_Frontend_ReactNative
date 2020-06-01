import { openDatabase } from 'react-native-sqlite-storage';
import { MOCK, API_URL } from 'react-native-dotenv';
import { Relationship } from "app/models/Relationship";
import RelationshipService from "./relationship.service";

export default class BaseService {
  baseUrl = API_URL;
  mock = process.env.REACT_APP_MOCK;

  static async initTable() {
    const db = await openDatabase({ name: 'Dity.db', location: 'default' });
    await db.transaction((t) => {
      t.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='relationships'",
        [],
        (tr, res) => {
          console.log('item:', res.rows);
          if (res.rows.length === 0 || MOCK) {
            t.executeSql('DROP TABLE IF EXISTS relationships', []);
            t.executeSql(
              'CREATE TABLE IF NOT EXISTS relationships(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), isSync BOOLEAN)',
              []
            );
          }
        }
      );
    });

    // Init data in dev mode
    if (MOCK) {
      // Init relationship
      const relationshipOne: Relationship = {
        id: 0,
        name: 'Samy Gnu'
      }
      await RelationshipService.postOneRelationship(relationshipOne);

      const relationshipTwo: Relationship = {
        id: 0,
        name: 'King Fury'
      }
      await RelationshipService.postOneRelationship(relationshipTwo);

    }
  }

}