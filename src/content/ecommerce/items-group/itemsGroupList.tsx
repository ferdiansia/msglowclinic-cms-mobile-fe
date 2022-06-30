import { Card } from '@mui/material';
import { memo, useEffect } from 'react';
import { useAppDispatch } from 'src/redux/store';
import BannerListTable from './itemsGroupListTable';

// export interface IBannerListProps {
//   hasDelete?: boolean;
//   title: IBannerType;
//   handleOpenModalDelete: (id: string) => void;
//   handleOpenModalEdit: (id: IBannerForm) => void;
// }

function ItemsGroupList(props) {
  const dispatch = useAppDispatch();

  // const getAllData = async () => {
  //   await dispatch(
  //     getAllBanner({
  //       slug: `${props.title}-banner`,
  //       type: 'collection',
  //       relations: 'file'
  //     })
  //   );
  // };

  useEffect(() => {
    // getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.title]);

  return (
    <Card>
      <BannerListTable />
    </Card>
  );
}

export default memo(ItemsGroupList);
