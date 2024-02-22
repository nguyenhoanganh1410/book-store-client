import { ICategory } from '@/utils/interfaces';
import { useEffect, useState } from 'react';
const DM_01 = '/images/danh_muc_01.png';
const DATA_CATEGORIES = [
  {
    id: 'banner_01',
    name: 'Sản phẩm 01',
    imageUrl: DM_01,
  },
  {
    id: 'banner_01',
    name: 'Sản phẩm 01',
    imageUrl: DM_01,
  },
  {
    id: 'banner_01',
    name: 'Sản phẩm 01',
    imageUrl: DM_01,
  },
  {
    id: 'banner_01',
    name: 'Sản phẩm 01',
    imageUrl: DM_01,
  },
  {
    id: 'banner_01',
    name: 'Sản phẩm 01',
    imageUrl: DM_01,
  },
  {
    id: 'banner_01',
    name: 'Sản phẩm 01',
    imageUrl: DM_01,
  },
  {
    id: 'banner_01',
    name: 'Sản phẩm 01',
    imageUrl: DM_01,
  },
  {
    id: 'banner_01',
    name: 'Sản phẩm 01',
    imageUrl: DM_01,
  },
  {
    id: 'banner_01',
    name: 'Sản phẩm 01',
    imageUrl: DM_01,
  },
  {
    id: 'banner_01',
    name: 'Sản phẩm 01',
    imageUrl: DM_01,
  },
];
export const userBannerHook = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    setCategories(DATA_CATEGORIES);
  }, []);

  return {
    categories,
  };
};
