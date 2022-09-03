import { Card } from '@mui/material';
import { memo, useEffect } from 'react';
import { getItemCategory } from 'src/redux/item-category/itemCategorySlice';
import { useAppDispatch } from 'src/redux/store';
import ItemsCategoryListTable from './itemsCategoryListTable';

interface ItemsCategoryLisPropst {
  handleOpenModalEdit: (data) => void;
  handleOpenModalDelete: (data) => void;
}

function ItemsCategoryList(props: ItemsCategoryLisPropst) {
  const dispatch = useAppDispatch();

  const getAllData = async () => {
    await dispatch(
      getItemCategory({
        type: 'collection',
        relations: 'cover'
      })
    );
  };
  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <ItemsCategoryListTable
        edit={props.handleOpenModalEdit}
        handleDelete={props.handleOpenModalDelete}
      />
    </Card>
  );
}

export default memo(ItemsCategoryList);
