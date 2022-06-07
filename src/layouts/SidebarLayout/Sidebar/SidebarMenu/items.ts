import { ReactNode } from 'react';

import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import {
  BANNER_ROUTE,
  HOME_ROUTE,
  MAIN_BANNER_ROUTE,
  PROMO_BANNER_ROUTE
} from 'src/const/route-url';

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
        link: `${HOME_ROUTE}`,
        icon: HomeTwoToneIcon
      },
      {
        name: 'Banner',
        icon: AddPhotoAlternateTwoToneIcon,
        link: `${BANNER_ROUTE}`,
        items: [
          {
            name: 'Main Banner',
            link: `${MAIN_BANNER_ROUTE}`
          },
          {
            name: 'Promo Banner',
            link: `${PROMO_BANNER_ROUTE}`
          }
        ]
      }
    ]
  }
];

export default menuItems;
