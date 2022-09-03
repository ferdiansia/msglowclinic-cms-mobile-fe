import { Autocomplete, Box, styled, Switch, TextField } from '@mui/material';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { selectAllItemCategory } from 'src/redux/item-category/itemCategorySlice';

const ErrorWrapper = styled(Box)(
  () => `
    color: red
  `
);

const ItemCategoryValidationSchema = object({
  title: string().required('Title wajib diisi')
}).required();

export interface ItemsCategoryFormProps {
  onSubmit: (data: any) => void;
  defaultValue: any;
}

const ItemsCategoryForm = (props: ItemsCategoryFormProps) => {
  const itemCategory = useSelector(selectAllItemCategory);
  const defaultValue = {
    id: null,
    title: '',
    description: '',
    is_enabled: 0,
    parent_id: '',
    file: '',
    item_ids: [],
    ...props?.defaultValue
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    resolver: yupResolver(ItemCategoryValidationSchema),
    defaultValues: defaultValue
  });

  return (
    <>
      <form
        id="item-category-form"
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
                fullWidth
              />
            )}
          />
        </Box>
        <Box mt={3}>
          <Controller
            name="is_enabled"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Switch
                {...field}
                defaultChecked={!!field.value}
                inputProps={{ 'aria-label': 'Enabled' }}
                size="medium"
              />
            )}
          />
        </Box>
        {!props?.defaultValue?.length && (
          <Box mt={3}>
            <Controller
              name="parent_id"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Autocomplete
                  disablePortal
                  options={itemCategory.map((v) => {
                    return {
                      label: v.title,
                      id: v.id
                    };
                  })}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(e, data) => field.onChange(data)}
                  sx={{ width: 300, position: 'relative', zIndex: 50 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Parent" />
                  )}
                />
              )}
            />
          </Box>
        )}
        <Box mt={3}>
          <Controller
            name="file"
            control={control}
            defaultValue=""
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
    </>
  );
};

export default memo(ItemsCategoryForm);
