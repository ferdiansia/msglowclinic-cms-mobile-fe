import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import { memo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const ItemsGroupForm = (props) => {
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
  ];
  const [personName, setPersonName] = useState<string[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<any>();

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
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
        <Box mt={3}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                labelId="Items"
                label="Items"
                id="items"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                fullWidth
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </Box>
      </form>
    </>
  );
};

export default memo(ItemsGroupForm);
