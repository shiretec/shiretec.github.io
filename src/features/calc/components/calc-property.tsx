import { z } from 'zod';

import { Form, Input, Label } from '@/components/ui/form';

const calcPropertyInputSchema = z.object({
  propertyName: z.string(),

  propertyValue: z.number(),
  pvPercent: z.number(),
  closingExpenses: z.number(),
  monthlyFinancialObligations: z.number(),
  termMonths: z.number(),

  saleAmount: z.number(),
  saleExpenses: z.number(),

  monthlyMaintenance: z.number(),
  monthlyIncome: z.number(),
});

export const CalcProperty = () => {
  return (
    <Form
      id="calculate-property"
      onSubmit={(values) => {
        console.log('submit property', values);
      }}
      options={{
        defaultValues: {
          propertyName: '',
          propertyValue: 450_000,
          pvPercent: 10,
          closingExpenses: 115_000,
          monthlyFinancialObligations: 0,
          termMonths: 18,

          saleAmount: 1_800_000,
          saleExpenses: 50_000,

          monthlyMaintenance: 1_500,
          monthlyIncome: 4_000,
          incomeStartMonth: 0,
        },
      }}
      schema={calcPropertyInputSchema}
    >
      {({ register, watch, formState }) => {
        // const startingMoney = ;
        const propertyValue = watch('propertyValue');
        return (
          <>
            <Input
              label="Property name"
              error={formState.errors['propertyName']}
              registration={register('propertyName')}
            />
            <Input
              label="Property value"
              type="number"
              error={formState.errors['propertyValue']}
              registration={register('propertyValue')}
            />
            <Input
              label="PV %"
              type="number"
              error={formState.errors['pvPercent']}
              registration={register('pvPercent')}
            />
            <Input
              label="Closing expenses"
              type="number"
              error={formState.errors['closingExpenses']}
              registration={register('closingExpenses')}
            />
            <Input
              label="Monthly financial obligations"
              type="number"
              error={formState.errors['monthlyFinancialObligations']}
              registration={register('monthlyFinancialObligations')}
            />
            <Input
              label="Term months"
              type="number"
              error={formState.errors['termMonths']}
              registration={register('termMonths')}
            />
            <Input
              label="Sale amount"
              type="number"
              error={formState.errors['saleAmount']}
              registration={register('saleAmount')}
            />
            <Input
              label="Sale expenses"
              type="number"
              error={formState.errors['saleExpenses']}
              registration={register('saleExpenses')}
            />
            <Input
              label="Monthly maintenance"
              type="number"
              error={formState.errors['monthlyMaintenance']}
              registration={register('monthlyMaintenance')}
            />
            <Input
              label="Monthly income"
              type="number"
              error={formState.errors['monthlyIncome']}
              registration={register('monthlyIncome')}
            />
            <Input
              label="Income start month"
              type="number"
              error={formState.errors['incomeStartMonth']}
              registration={register('incomeStartMonth')}
            />
            <Label>Starting money {propertyValue * 2}</Label>
          </>
        );
      }}
    </Form>
  );
};
