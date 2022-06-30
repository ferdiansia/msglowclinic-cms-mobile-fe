import { Container, Grid } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { memo, useCallback, useState } from 'react';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  removeBanner,
  selectEntitiesBanner
} from 'src/redux/banner/bannerSlice';
import { useAppDispatch } from 'src/redux/store';
import { useAlert } from 'react-alert';
import ModalDeleteComponent from 'src/components/Modal/modal-delete.component';
import { useSelector } from 'react-redux';
import PageHeader from './PageHeader';
import ItemsGroupList from './itemsGroupList';
import ItemsGroupModalForm from './form/itemsGroupModalForm';

function ItemsGroup() {
  const [openModalDelete, setOpenModelDelete] = useState<boolean>(false);
  const [openModalAdd, setOpenModelAdd] = useState<boolean>(false);
  const bannerEntities = useSelector(selectEntitiesBanner);

  const [selectedId, setSelectedId] = useState<string>(null);
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const onSubmit = () => {
    console.log('check');
  };

  const handleOpenModal = () => {
    setOpenModelAdd(true);
  };

  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title={`List Group Items`}
          handleOpenModalForm={handleOpenModal}
          hasCreate={true}
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
            <ItemsGroupList />
          </Grid>
        </Grid>
      </Container>

      <ItemsGroupModalForm
        open={openModalAdd}
        handleClose={() => setOpenModelAdd(false)}
        onSubmit={onSubmit}
        defaultValue={{}}
        loading={false}
      />

      {/* <ModalDeleteComponent
        open={openModalDelete}
        handleClose={handleCloseModalDelete}
        title={`Anda yakin ingin menghapus banner ${bannerEntities[selectedId]?.title}`}
        content={`Dengan menghapus banner "${bannerEntities[selectedId]?.title}" maka
      data banner akan hilang secara permanen.`}
        onClick={() => {
          handleDeleteClick();
        }}
        loading={props.loading}
      /> */}
    </>
  );
}

export default memo(ItemsGroup);
