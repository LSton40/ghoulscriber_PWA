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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
  try {
    const jate_db = await openDB('jate', 1);
    const transaction = jate_db.transaction('jate', 'readwrite');
    const store = transaction.objectStore('jate');
    const result = await store.add({jate: content});

    return result;
  } catch (error) {
    console.error('putDb not implemented')
  }
  
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  try {
    const jate_db = await openDB('jate', 1);
    const transaction = jate_db.transaction('jate', 'readwrite');
    const store = transaction.objectStore('jate')
    return await store.getAll();

  } catch (error) {
    console.error('getDb not implemented')
  }
};

initdb();
