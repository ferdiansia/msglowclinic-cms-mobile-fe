import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';

function ItemsGroupForm(props) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<any>();

  return (
    <>
      <form
        id="items-group-form"
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
        <Box mt={3} mb={2} sx={{ textAlign: 'right' }}>
          <LoadingButton
            type="submit"
            loading={!!props.loading}
            disabled={!!props.loading}
            form="banner-form"
            variant="contained"
            sx={{ width: 100 }}
          >
            Simpan
          </LoadingButton>
        </Box>
      </form>
    </>
  );
}

export default memo(ItemsGroupForm);
