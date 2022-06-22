import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import PageHeader from './PageHeader';
import { useAlert } from 'react-alert';
import { useCallback, useEffect } from 'react';
import { getAboutUs, updateAboutUs } from 'src/redux/about-us/aboutUsSlice';
import AboutUsForm from './about-us-form/about-us-form';
import { unwrapResult } from '@reduxjs/toolkit';

export interface IAboutUsForm {
  id?: string;
  title: string;
  slug?: 'about-us';
  render_type?: 'html' | 'text' | 'url' | 'markdown';
  content: string;
}

function AboutUs(props) {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.aboutUs);
  const alert = useAlert();

  const getDataAboutUs = async () => {
    await dispatch(
      getAboutUs({
        type: 'collection'
      })
    );
  };

  useEffect(() => {
    getDataAboutUs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = useCallback(async (formData: IAboutUsForm) => {
    formData.render_type = 'html';

    try {
      const actionResult = await dispatch(updateAboutUs(formData));
      const result = unwrapResult(actionResult);
      if (result) {
        alert.show('Data berhasil tersimpan');
      }
    } catch (err) {
      alert.show(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Card sx={{ py: 3, px: 2 }}>
          {data && <AboutUsForm onSubmit={onSubmit} data={data} />}
        </Card>
      </Container>
    </>
  );
}

export default AboutUs;
