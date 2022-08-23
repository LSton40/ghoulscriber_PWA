import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  
  try {
    const jate_db = await openDB('jate', 1);
    const transaction = jate_db.transaction('jate', 'readwrite');
    const store = transaction.objectStore('jate');
    const result = await store.put({jate: content});

    return result;
  } catch (error) {
    console.error('putDb not implemented')
  }
  
};

export const getDb = async () => {

  try {
    const jate_db = await openDB('jate', 1);
    const transaction = jate_db.transaction('jate', 'readwrite');
    const store = transaction.objectStore('jate')
    return await store.getAll().values;

  } catch (error) {
    console.error('getDb not implemented')
  }
};

initdb();
