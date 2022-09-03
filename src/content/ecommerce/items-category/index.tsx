import { Container, Grid } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import ModalDeleteComponent from 'src/components/Modal/modal-delete.component';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  addItemCategory,
  removeItemCategory,
  updateItemCategory
} from 'src/redux/item-category/itemCategorySlice';
import { useAppSelector } from 'src/redux/store';

import { useAlert } from 'react-alert';

import PageHeader from '../items-group/PageHeader';
import ItemsCategoryModalForm from './form/itemsCategoryModalForm';
import { useAppDispatch } from 'src/redux/store';
import ItemsCategoryList from './itemsCategoryList';
import { unwrapResult } from '@reduxjs/toolkit';

function ItemsCategory() {
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalDelete, setOpenModelDelete] = useState<boolean>(false);
  const [data, setData] = useState({});

  const { entities: itemCategoryData, loading } = useAppSelector(
    (state) => state.item_category
  );

  const [selectedId, setSelectedId] = useState<string>(null);

  const handleOpenModal = useCallback((data?: any) => {
    setData(data);
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setData({});
    setOpenModal(false);
  }, []);

  const handleOpenModalDelete = useCallback((index: string) => {
    setSelectedId(index);
    setOpenModelDelete(true);
  }, []);

  const handleCloseModalDelete = useCallback(() => {
    setOpenModelDelete(false);
    setTimeout(() => {
      setSelectedId(null);
    }, 100);
  }, []);

  const handleDeleteClick = async () => {
    try {
      const actionResult = await dispatch(
        removeItemCategory({ id: selectedId })
      );
      const result = unwrapResult(actionResult);
      if (result) {
        alert.show('Data berhasil dihapus');
        handleCloseModalDelete();
      }
    } catch (err) {
      alert.show(err);
    }
  };

  const onSubmit = useCallback(
    async (formData) => {
      formData.relations = 'cover';
      const file = new FormData();
      if (!formData?.file?.id) {
        file.append('cover', formData.file);
      }
      delete formData.file;
      formData.is_enabled = !!formData.is_enabled ? 1 : 0;
      if (formData.parent_id) formData.parent_id = formData.parent_id.id;
      try {
        const actionResult = await dispatch(
          !formData?.id
            ? addItemCategory({ payload: formData, body: file })
            : updateItemCategory({ payload: formData, body: file })
        );
        const result = unwrapResult(actionResult);
        if (result) {
          handleCloseModal();
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
      <PageTitleWrapper>
        <PageHeader
          title={`Items Category`}
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
            <ItemsCategoryList
              handleOpenModalDelete={handleOpenModalDelete}
              handleOpenModalEdit={handleOpenModal}
            />
          </Grid>
        </Grid>
      </Container>

      <ItemsCategoryModalForm
        open={openModal}
        handleClose={() => handleCloseModal()}
        onSubmit={onSubmit}
        defaultValue={data}
        loading={loading}
      />

      <ModalDeleteComponent
        open={openModalDelete}
        handleClose={handleCloseModalDelete}
        title={`Anda yakin ingin menghapus kategori ini ${itemCategoryData?.[selectedId]?.title}`}
        content={`Dengan menghapus kategori "${itemCategoryData?.[selectedId]?.title}" maka
      data kategori akan hilang secara permanen.`}
        onClick={() => {
          handleDeleteClick();
        }}
        loading={loading}
      />
    </>
  );
}

export default memo(ItemsCategory);
