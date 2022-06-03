import { ReactNode } from 'react';

import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'Home',
        link: '/dashboards/home',
        icon: HomeTwoToneIcon
      },
      {
        name: 'Banner',
        link: '/dashboards/banner',
        icon: AddPhotoAlternateTwoToneIcon
      }
    ]
  }
];

export default menuItems;
