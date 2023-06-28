import * as yup from 'yup';

export const airdropValidationSchema = yup.object().shape({
  name: yup.string().required(),
  startup_id: yup.string().nullable(),
});
