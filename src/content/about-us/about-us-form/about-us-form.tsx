import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import WYSIWYGEditor from 'src/components/Input/WYSIWYGEditor/WYSIWYGEditor';
import { useAppSelector } from 'src/redux/store';
import { object, string } from 'yup';
import { IAboutUsForm } from '..';

const aboutUsValidationSchema = object({
  title: string().required('Title wajib diisi'),
  content: string().required('About Us wajib diisi')
}).required();

interface AboutUsFormProps {
  onSubmit: (value: IAboutUsForm) => void;
  data: IAboutUsForm;
}

const AboutUsForm = (props: AboutUsFormProps) => {
  const { loading } = useAppSelector((state) => state.aboutUs);

  const defaultValue: IAboutUsForm = {
    id: null,
    title: '',
    content: '',
    ...props.data
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
    <form
      id="about-us-form"
      onSubmit={handleSubmit((value) => props.onSubmit(value))}
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
          label={'Content'}
          defaultValue={props.data.content}
          name="content"
          control={control}
        />
      </Box>

      <Box sx={{ pt: 3, textAlign: 'right' }}>
        <LoadingButton
          disabled={!!loading}
          loading={!!loading}
          type="submit"
          variant="contained"
          sx={{ width: 100 }}
        >
          Simpan
        </LoadingButton>
      </Box>
    </form>
  );
};

export default memo(AboutUsForm);
