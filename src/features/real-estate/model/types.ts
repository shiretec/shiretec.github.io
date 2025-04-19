export interface RealEstateProperty {
  id: string;
  name: string;
  propertyType: string;
  address?: string;
  photoUrl?: string;
  
  // Financial parameters
  initialInvestment: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  
  // Regular expenses
  propertyTax: number;
  insurance: number;
  utilities: number;
  maintenance: number;
  managementFees: number;
  
  // Rental strategy
  monthlyRent: number;
  occupancyRate: number;
  seasonalAdjustments: boolean;
  
  // Calculated metrics (these would be computed)
  cashFlow?: number;
  roi?: number;
  capRate?: number;
  cashOnCash?: number;
  paybackPeriod?: number;
}

export interface RealEstateFormState extends Omit<RealEstateProperty, 'id'> {}

export type ComparisonMetric = keyof RealEstateProperty;
