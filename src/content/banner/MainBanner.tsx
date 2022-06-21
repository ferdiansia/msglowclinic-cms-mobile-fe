import { Container, Grid } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Banner from '.';
import { IBannerForm } from './BannerForm';
import BannerModalForm from './BannerModalForm';
import MainBannerCard from './MainBannerCard';
import PageHeader from './PageHeader';
import { useAlert } from 'react-alert';
import { IBannerType } from 'src/models/banner.model';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { formatDate } from 'src/utils/date-function';
import { addBanner, updateBanner } from 'src/redux/banner/bannerSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function MainBanner() {
  console.log('MainBanner');

  const [openModalForm, setOpenModalForm] = useState<boolean>(false);
  const { loading } = useAppSelector((state) => state.banners);

  const [data, setData] = useState<IBannerForm>(null);
  const alert = useAlert();
  const dispatch = useAppDispatch();

  const BANNER_CARD: IBannerType[] = ['main', 'about-us', 'commerce'];

  const handleCloseModalForm = useCallback(() => {
    setOpenModalForm(false);
    setTimeout(() => {
      setData(null);
    }, 100);
  }, []);

  const handleOpenModalForm = useCallback((data?: IBannerForm) => {
    if (data) setData(data);
    setOpenModalForm(true);
  }, []);

  const onSubmit = useCallback(
    async (formData: IBannerForm, type: IBannerType = 'promo') => {
      if (!formData?.slug) formData.slug = `${type}-banner`;
      if (formData.expired_at)
        formData.expired_at = formatDate(formData.expired_at);
      formData.relations = 'file';

      const file = new FormData();
      if (!formData?.file?.id) {
        file.append('file', formData.file);
      }
      delete formData.file;

      try {
        const actionResult = await dispatch(
          !formData?.id
            ? addBanner({ payload: formData, body: file })
            : updateBanner({ payload: formData, body: file })
        );
        const result = unwrapResult(actionResult);
        if (result) {
          handleCloseModalForm();
        }
      } catch (err) {
        alert.show(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Helmet>
        <title>Banner</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={'main'} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          {BANNER_CARD.map((v, i) => (
            <Grid item xs={4} key={`${i}-${v}-banner`}>
              <MainBannerCard
                handleEditData={handleOpenModalForm}
                type={v}
              ></MainBannerCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Banner
        loading={loading}
        handleOpenModal={handleOpenModalForm}
        type="promo"
      />

      <BannerModalForm
        open={openModalForm}
        handleClose={handleCloseModalForm}
        onSubmit={onSubmit}
        defaultValue={data}
        loading={loading}
      />
    </>
  );
}
export default memo(MainBanner);
