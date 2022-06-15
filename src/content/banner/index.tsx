import { Container, Grid } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { memo, useCallback, useState } from 'react';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  removeBanner,
  selectEntitiesBanner,
} from 'src/redux/banner/bannerSlice';
import { useAppDispatch } from 'src/redux/store';
import { IBannerForm } from './BannerForm';
import BannerList from './BannerList';
import PageHeader from './PageHeader';
import { useAlert } from 'react-alert';
import ModalDeleteComponent from 'src/components/Modal/modal-delete.component';
import { useSelector } from 'react-redux';
import { IBannerType } from 'src/models/banner.model';

export interface IBannerProps {
  type: IBannerType;
  handleOpenModal: (id?: IBannerForm) => void
  loading: boolean
}

function Banner(props: IBannerProps) {
  console.log("Banner")
  const [openModalDelete, setOpenModelDelete] = useState<boolean>(false);
  const bannerEntities = useSelector(selectEntitiesBanner);

  const [selectedId, setSelectedId] = useState<string>(null);
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const filterTypeHasDeleteCreate = ['promo'];

  const handleCloseModalDelete = useCallback(() => {
    setOpenModelDelete(false);
    setTimeout(() => {
      setSelectedId(null);
    }, 100);
  }, []);

  const handleOpenModalDelete = useCallback((id: string) => {
    setSelectedId(id);
    setOpenModelDelete(true);
  }, []);

  const handleDeleteClick = async () => {
    try {
      const actionResult = await dispatch(removeBanner(selectedId));
      const result = unwrapResult(actionResult);
      if (result) {
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
              handleOpenModalEdit={props.handleOpenModal}
            />
          </Grid>
        </Grid>
      </Container>

      <ModalDeleteComponent
        open={openModalDelete}
        handleClose={handleCloseModalDelete}
        title={`Anda yakin ingin menghapus banner ${bannerEntities[selectedId]?.title}`}
        content={`Dengan menghapus banner "${bannerEntities[selectedId]?.title}" maka
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
