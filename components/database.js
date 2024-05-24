import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('example.db');

export const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS photos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        uri TEXT NOT NULL
      );`
    );
  });
};

export const insertPhoto = (userId, uri) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO photos (userId, uri) values (?, ?);',
        [userId, uri],
        (_, result) => {resolve(result), console.log(result)},
        (_, error) => reject(error)
      );
    });
  });
};

export const getPhotosByUser = userId => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM photos WHERE userId = ?;',
        [userId],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => reject(error)
      );
    });
  });
};
