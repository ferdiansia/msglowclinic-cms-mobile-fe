import { Container, Grid } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from '../items-group/PageHeader';
import ItemsCategoryModalForm from './form/itemsCategoryModalForm';
import ItemsCategoryListTable from './itemsCategoryListTable';

function ItemsCategory() {
  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false);
  const handleOpenModalAdd = useCallback(() => {
    setOpenModalAdd(true);
  }, []);
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title={`Items Category`}
          handleOpenModalForm={handleOpenModalAdd}
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
            <ItemsCategoryListTable />
          </Grid>
        </Grid>
      </Container>

      <ItemsCategoryModalForm
        open={openModalAdd}
        handleClose={() => setOpenModalAdd(false)}
        onSubmit={() => {}}
      />
    </>
  );
}

export default memo(ItemsCategory);
