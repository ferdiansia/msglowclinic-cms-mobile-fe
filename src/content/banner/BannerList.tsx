import { Card } from '@mui/material';
import { memo, useEffect } from 'react';
import { IBannerType } from 'src/models/banner.model';
import { getAllBanner } from 'src/redux/banner/bannerSlice';
import { useAppDispatch } from 'src/redux/store';
import { IBannerForm } from './BannerForm';
import BannerListTable from './BannerListTable';

export interface IBannerListProps {
  hasDelete?: boolean;
  title: IBannerType;
  handleOpenModalDelete: (id: string) => void;
  handleOpenModalEdit: (id: IBannerForm) => void;
}

function BannerList(props: IBannerListProps) {
  console.log('BannerList')
  const dispatch = useAppDispatch();

  const getAllData = async () => {
    await dispatch(
      getAllBanner({
        slug: `${props.title}-banner`,
        type: 'collection',
        relations: 'file'
      })
    );
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.title]);

  return (
    <Card>
      <BannerListTable
        handleDelete={props.handleOpenModalDelete}
        handleOpenEdit={props.handleOpenModalEdit}
        hasDelete={!!props.hasDelete}
      />
    </Card>
  );
}

export default memo(BannerList);
