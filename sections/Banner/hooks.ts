import { ICategory } from '@/utils/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { Tables } from '@/utils/enums';

export const userBannerHook = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getCategories = useCallback(() => {
    try {
      const q = query(
        collection(db, Tables.categories),
        where('deleted', '==', false),
        orderBy('createdAt', 'desc'),
      );
      const clientsLister = onSnapshot(q, (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ICategory[];
        setCategories(data);
      });
      return () => clientsLister();
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
  };
};
