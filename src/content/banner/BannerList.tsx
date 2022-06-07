import { Card } from '@mui/material';
import { useEffect } from 'react';
import { getAllBanner } from 'src/redux/banner/bannerSlice';
import { useAppDispatch } from 'src/redux/store';
import BannerListTable from './BannerListTable';

function BannerList(props: { title: 'promo' | 'main' }) {
  const dispatch = useAppDispatch();

  const getAllData = async () => {
    await dispatch(
      getAllBanner({ slug: `${props.title}-banner`, type: 'collection' })
    );
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.title]);
  return (
    <Card>
      <BannerListTable title={props.title} />
    </Card>
  );
}

export default BannerList;
