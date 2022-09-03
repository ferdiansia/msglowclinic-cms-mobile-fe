import { Card, Container, Grid } from '@mui/material';
import { memo } from 'react';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
// import { useAppDispatch } from 'src/redux/store';
// import { useAlert } from 'react-alert';
import PageHeader from './PageHeader';
import ItemsGroupForm from './itemsGroupForm';

function ItemsGroup() {
  // const dispatch = useAppDispatch();
  // const alert = useAlert();

  // const onSubmit = () => {
  //   console.log('check');
  // };

  return (
    <>
      <PageTitleWrapper>
        <PageHeader title={`Group Items`} hasCreate={false} />
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
            <Card sx={{ pr: 2, pl: 2 }}>
              <ItemsGroupForm />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default memo(ItemsGroup);
