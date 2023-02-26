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
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const rw = jateDb.transaction('jate', 'readwrite');
  const store = rw.objectStore('jate');
  const request = store.put({ jate: content })
  const result = await request;
  console.log('data updated successfully', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const rw = jateDb.transaction('jate', 'readonly');
  const store = rw.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
}

export const getOneDb = async (id) => {
  console.log('GET one from database');
  const jateDb = await openDB('jate', 1);
  const rw = jateDb.transaction('jate', 'readonly');
  const store = rw.objectStore('jate');
  const request = store.get(id);
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
