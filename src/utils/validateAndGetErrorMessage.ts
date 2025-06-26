import * as yup from 'yup';

export const validateAndGetErrorMessage = (
  schema: yup.Schema,
  value: string | number,
) => {
  let errorMessage = null;

  try {
    schema.validateSync(value);
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      errorMessage = err.errors.reduce((message) => message + '').trim();
    }
  }

  return errorMessage;
};
