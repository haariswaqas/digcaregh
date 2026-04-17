export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceBeneficiary {
  role: string;
  description: string;
}

export interface ServiceStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  icon: string;
  title: string;
  headline: string;
  gradient: string;
  description: string[];
  features: ServiceFeature[];
  beneficiaries: ServiceBeneficiary[];
  steps: ServiceStep[];
}
