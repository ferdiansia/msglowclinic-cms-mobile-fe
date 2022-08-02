import { ReactNode } from 'react';

import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import { ABOUT_US_ROUTE, BANNER_ROUTE, ECOMMERCE, ECOMMERCE_ITEMS_CATEGORY, ECOMMERCE_ITEMS_GROUP, HOME_ROUTE } from 'src/const/route-url';

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
        link: `${BANNER_ROUTE}`
      },
      {
        name: 'About Us',
        icon: InfoTwoToneIcon,
        link: `${ABOUT_US_ROUTE}`
      },
      // {
      //   name: 'Ecommerce',
      //   icon: AddShoppingCartTwoToneIcon,
      //   link: `${ECOMMERCE}`,
      //   items: [
      //     {
      //       name: 'Items Group',
      //       link: `${ECOMMERCE_ITEMS_GROUP}`,
      //     },
      //     {
      //       name: 'Items Category',
      //       link: `${ECOMMERCE_ITEMS_CATEGORY}`,
      //     }
      //   ]
      // }
    ]
  }
];

export default menuItems;
