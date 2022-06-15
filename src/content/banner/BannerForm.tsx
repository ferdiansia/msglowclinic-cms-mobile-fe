import { yupResolver } from '@hookform/resolvers/yup';
import { DesktopDatePicker } from '@mui/lab';
import { Box, styled, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IBannerSlug } from 'src/models/banner.model';
import { mixed, object, string } from 'yup';

export interface IBannerForm {
  id?: string;
  title: string;
  slug?: IBannerSlug;
  description?: string;
  expired_at?: string;
  file?: any;
  relations?: string;
}

export interface IBannerProps {
  onSubmit: (data: IBannerForm, addData: boolean) => void;
  defaultValue: IBannerForm
}

const ErrorWrapper = styled(Box)(
  () => `
    color: red
  `
);

const bannerValidationSchema = object({
  title: string().required('Title wajib diisi'),
  file: mixed().required('File wajib diisi')
}).required();

function BannerForm(props: IBannerProps) {
  console.log('BannerForm');

  const defaultValue = {
    id: null,
    title: '',
    slug: '',
    description: '',
    expired_at: new Date(),
    relations: null,
    ...props?.defaultValue,
    file: null,
  }

  const HAS_EXPIRED_DATE = ["promo-banner"]

  console.log('defaultValue', defaultValue)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    resolver: yupResolver(bannerValidationSchema),
    defaultValues: defaultValue
  });

  return (
    <form
      id="banner-form"
      onSubmit={handleSubmit((value) => props.onSubmit(value, true))}
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
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              placeholder="Description"
              label="Description"
              rows={4}
              multiline
              fullWidth
            />
          )}
        />
      </Box>
      {(!defaultValue?.slug || HAS_EXPIRED_DATE.includes(defaultValue?.slug)) && <Box mt={3}>
        <Controller
          name="expired_at"
          control={control}
          defaultValue={new Date()}
          render={({ field }) => (
            <DesktopDatePicker
              {...field}
              label="Expired Date"
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />
      </Box>}
      <Box mt={3}>
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <>
              <input
                type="file"
                onChange={(e) => {
                  field.onChange(e.target.files[0]);
                }}
              />
              {errors?.file && (
                <ErrorWrapper>{errors?.file?.message}</ErrorWrapper>
              )}
            </>
          )}
        />
      </Box>
    </form>
  );
}

export default React.memo(BannerForm);
