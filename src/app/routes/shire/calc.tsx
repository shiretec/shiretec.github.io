import { ContentLayout } from '@/components/layouts';
import { CalcProperty } from '@/features/calc/components/calc-property';

const CalcRoute = () => {
  return (
    <ContentLayout title="Real Estate Calculator">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between">
            <CalcProperty />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default CalcRoute;
