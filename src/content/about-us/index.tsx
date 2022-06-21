import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Container, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import WYSIWYGEditor from 'src/components/Input/WYSIWYGEditor/WYSIWYGEditor';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { object, string } from 'yup';
import PageHeader from './PageHeader';

interface IAboutUsForm {
  id?: string;
  title: string;
  aboutUs: string;
}

const aboutUsValidationSchema = object({
  title: string().required('Title wajib diisi'),
  aboutUs: string().required('About Us wajib diisi')
}).required();

function AboutUs(props) {
  const defaultValue: IAboutUsForm = {
    id: null,
    title: '',
    aboutUs: '',
    ...props?.defaultValue
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IAboutUsForm>({
    resolver: yupResolver(aboutUsValidationSchema),
    defaultValues: defaultValue
  });
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
          <form
            id="about-us-form"
            onSubmit={handleSubmit((value) => console.log('check', value))}
            autoComplete="off"
          >
            <Box mt={3}>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    placeholder="Title"
                    label="Title"
                    fullWidth
                    error={!!errors?.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Box>
            <Box mt={3}>
              <WYSIWYGEditor
                label={'About Us'}
                name="aboutUs"
                control={control}
              />
            </Box>

            <Box sx={{ pt: 3, textAlign: 'right' }}>
              <LoadingButton
                type="submit"
                variant="contained"
                sx={{ width: 100 }}
              >
                Simpan
              </LoadingButton>
            </Box>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default AboutUs;
