import { Pen } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';

const calcPropertyInputSchema = z.object({
  propertyName: z.string().min(1, 'Required'),
  mortgage: z.number().min(0, 'Required'),
  payment: z.number().min(0, 'Required'),
  comment: z.string(),
});

export const CalcProperty = () => {
  return (
    <FormDrawer
      isDone={false}
      triggerButton={
        <Button icon={<Pen className="size-4" />} size="sm">
          Calculate
        </Button>
      }
      title="Calculate"
      submitButton={
        <Button form="update-profile" type="submit" size="sm">
          Calculate
        </Button>
      }
    >
      <Form
        id="update-profile"
        onSubmit={(values) => {
          console.log('submit smt', values);
        }}
        options={{
          defaultValues: {
            propertyName: '',
            mortgage: 10,
            payment: 0,
            comment: '',
          },
        }}
        schema={calcPropertyInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              label="Property name"
              error={formState.errors['propertyName']}
              registration={register('propertyName')}
            />
            <Input
              label="Mortgage"
              type="number"
              error={formState.errors['mortgage']}
              registration={register('mortgage')}
            />
            <Input
              label="Payment"
              type="number"
              error={formState.errors['payment']}
              registration={register('payment')}
            />

            <Textarea
              label="Comments"
              error={formState.errors['comment']}
              registration={register('comment')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
