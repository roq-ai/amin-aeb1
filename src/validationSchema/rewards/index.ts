import * as yup from 'yup';

export const rewardValidationSchema = yup.object().shape({
  name: yup.string().required(),
  startup_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
