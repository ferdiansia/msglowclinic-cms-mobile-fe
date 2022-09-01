import { yupResolver } from '@hookform/resolvers/yup';
import { parseISO } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';
import { Box, styled, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IBannerSlug, IBannerType } from 'src/models/banner.model';
import { mixed, object, string } from 'yup';

export interface IBannerForm {
  id?: string;
  title: string;
  slug?: IBannerSlug;
  description?: string;
  expired_at?: any;
  url?: string;
  file?: any;
  relations?: string;
}

export interface IBannerProps {
  onSubmit: (data: IBannerForm, addData: boolean) => void;
  defaultValue: IBannerForm | { slug: IBannerType };
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
  const defaultValue = {
    id: null,
    title: '',
    slug: 'main-banner',
    description: '',
    url: '',
    relations: null,
    ...props?.defaultValue,
    expired_at: props?.defaultValue?.['expired_at']
      ? format(
          utcToZonedTime(parseISO(props?.defaultValue?.['expired_at']), 'UTC'),
          "yyyy-MM-dd'T'HH:mm",
          { timeZone: 'UTC' }
        )
      : format(new Date(), "yyyy-MM-dd'T'HH:mm")
  };

  const HAS_EXPIRED_DATE = ['promo-banner', 'about-us-gallery-banner'];

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
      <Box mt={3}>
        <Controller
          name="url"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              placeholder="URL"
              label="URL"
              fullWidth
              error={!!errors?.url}
              helperText={errors.url?.message}
            />
          )}
        />
      </Box>
      {HAS_EXPIRED_DATE.includes(defaultValue?.slug) && (
        <Box mt={3}>
          <Controller
            name="expired_at"
            control={control}
            defaultValue={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
            render={({ field }) => (
              <TextField
                {...field}
                label="Expired Date"
                type="datetime-local"
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true
                }}
              />

              // <DateTimePicker
              //   {...field}
              //   label="Expired Date"
              //   renderInput={(params) => <TextField {...params} />}
              // />
            )}
          />
        </Box>
      )}
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
