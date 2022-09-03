import { Container, Grid } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { memo, useCallback, useState } from 'react';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  removeBanner
  // selectEntitiesBanner
} from 'src/redux/banner/bannerSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { IBannerForm } from './BannerForm';
import BannerList from './BannerList';
import PageHeader from './PageHeader';
import { useAlert } from 'react-alert';
import ModalDeleteComponent from 'src/components/Modal/modal-delete.component';
// import { useSelector } from 'react-redux';
import { IBannerSlug, IBannerType } from 'src/models/banner.model';

export interface IBannerProps {
  type: IBannerType;
  handleOpenModal: ({ slug: IBannerType }) => void;
  handleOpenModalEdit: (id?: IBannerForm) => void;
  loading: boolean;
}

function Banner(props: IBannerProps) {
  const [openModalDelete, setOpenModelDelete] = useState<boolean>(false);
  // const bannerEntities = useSelector(selectEntitiesBanner);
  const { mainBannerData } = useAppSelector((state) => state.banners);

  const [selectedId, setSelectedId] = useState<number>(null);
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const filterTypeHasDeleteCreate: IBannerType[] = [
    'promo',
    'about-us-gallery'
  ];

  const handleCloseModalDelete = useCallback(() => {
    setOpenModelDelete(false);
    setTimeout(() => {
      setSelectedId(null);
    }, 100);
  }, []);

  const handleOpenModalDelete = useCallback((index: number) => {
    setSelectedId(index);
    setOpenModelDelete(true);
  }, []);

  const handleDeleteClick = async () => {
    try {
      const slug: IBannerSlug = `${props.type}-banner`;
      const id = mainBannerData[slug][selectedId]?.id;
      const actionResult = await dispatch(removeBanner({ type: slug, id: id }));
      const result = unwrapResult(actionResult);
      if (result) {
        alert.show('Data berhasil dihapus');
        handleCloseModalDelete();
      }
    } catch (err) {
      alert.show(err);
    }
  };

  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title={props.type}
          handleOpenModalForm={props.handleOpenModal}
          hasCreate={filterTypeHasDeleteCreate.includes(props.type)}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <BannerList
              title={props.type}
              handleOpenModalDelete={handleOpenModalDelete}
              hasDelete={filterTypeHasDeleteCreate.includes(props.type)}
              handleOpenModalEdit={props.handleOpenModalEdit}
            />
          </Grid>
        </Grid>
      </Container>

      <ModalDeleteComponent
        open={openModalDelete}
        handleClose={handleCloseModalDelete}
        title={`Anda yakin ingin menghapus banner ${
          mainBannerData?.[`${props.type}-banner`]?.[selectedId]?.title
        }`}
        content={`Dengan menghapus banner "${
          mainBannerData?.[`${props.type}-banner`]?.[selectedId]?.title
        }" maka
      data banner akan hilang secara permanen.`}
        onClick={() => {
          handleDeleteClick();
        }}
        loading={props.loading}
      />
    </>
  );
}

export default memo(Banner);
