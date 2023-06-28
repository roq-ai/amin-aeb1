import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getAirdropById, updateAirdropById } from 'apiSdk/airdrops';
import { Error } from 'components/error';
import { airdropValidationSchema } from 'validationSchema/airdrops';
import { AirdropInterface } from 'interfaces/airdrop';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { StartupInterface } from 'interfaces/startup';
import { getStartups } from 'apiSdk/startups';

function AirdropEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<AirdropInterface>(
    () => (id ? `/airdrops/${id}` : null),
    () => getAirdropById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: AirdropInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateAirdropById(id, values);
      mutate(updated);
      resetForm();
      router.push('/airdrops');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<AirdropInterface>({
    initialValues: data,
    validationSchema: airdropValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Airdrop
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<StartupInterface>
              formik={formik}
              name={'startup_id'}
              label={'Select Startup'}
              placeholder={'Select Startup'}
              fetcher={getStartups}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'airdrop',
  operation: AccessOperationEnum.UPDATE,
})(AirdropEditPage);
