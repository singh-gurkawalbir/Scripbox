import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useCollection = (c) => {
  const [docs, setDocs] = useState(null);

  useEffect(() => {
    let ref = collection(db, c);

    const unsub= onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        // console.log(doc.data())
        results.push({ id: doc.id, ...doc.data() });
      });
      //   console.log(results)
      setDocs(results);
    });

    return ()=> unsub()
  }, [c]);

  return {docs}
};
