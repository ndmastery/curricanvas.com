import type { PlanTier } from "@/shared/enums/plans.enum";

export interface CreditDeduction {
  action: string;
  actionKey: string;
  credits: number;
}

export interface PlanFeature {
  textKey: string;
  included: boolean;
  highlight?: boolean;
}

export interface PlanConfig {
  tier: PlanTier;
  nameKey: string;
  descriptionKey: string;
  creditAmount?: number;
  priceUsd?: number;
  features: PlanFeature[];
  ctaKey: string;
  ctaHref?: string;
  isDisabled?: boolean;
  isFeatured?: boolean;
}
