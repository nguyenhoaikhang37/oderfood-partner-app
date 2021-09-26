import { TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

export const InputField = ({ name, control, label, ...inputProps }) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      variant="outlined"
      label={label}
      value={value ? value : ''}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
};
