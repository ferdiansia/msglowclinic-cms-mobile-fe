import { Card } from '@mui/material';
import { memo, useEffect } from 'react';
import { IBannerType } from 'src/models/banner.model';
import { getBannerByType } from 'src/redux/banner/bannerSlice';
import { useAppDispatch } from 'src/redux/store';
import { IBannerForm } from './BannerForm';
import BannerListTable from './BannerListTable';

export interface IBannerListProps {
  hasDelete?: boolean;
  title: IBannerType;
  handleOpenModalDelete: (index: number) => void;
  handleOpenModalEdit: (id: IBannerForm) => void;
}

function BannerList(props: IBannerListProps) {
  const dispatch = useAppDispatch();

  const getAllData = async () => {
    await dispatch(
      getBannerByType({
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
        type={props.title}
      />
    </Card>
  );
}

export default memo(BannerList);
