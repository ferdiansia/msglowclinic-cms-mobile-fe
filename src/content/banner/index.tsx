import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import BannerList from './BannerList';
import PageHeader from './PageHeader';

function Banner(props) {
  return (
    <>
      <Helmet>
        <title>Banner</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={props.type} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <BannerList title={props.type} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Banner;
