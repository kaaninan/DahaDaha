export interface TagJSON {
  Id: number;
  Name: string;
  IconUrl: object;
  Rank: number;
}

export interface TagState extends TagJSON {
  IsSelected: boolean;
  IconSource: object;
  IsSelectable: boolean;
}

export interface Promotion {
  BrandIconColor: string;
  BrandIconUrl: string;
  BrandPromotionCardParticipationText: string;
  Id: number;
  ImageUrl: string;
  PromotionCardColor: string;
  RemainingText: string;
  SeoName: string;
  Title: string;
  ScenarioType: string;
  Unavailable: boolean;
  Unvisible: boolean;
  ListButtonText: string;
  Hide: boolean;
}

export interface Detail {
  BrandIconColor: string;
  BrandIconUrl: string;
  BrandPromotionCardParticipationText: string;
  Description: string;
  EndDate: Date;
  Id: number;
  ImageUrl: string;
  CountryTimeZone: number;
  RemainingText: string;
  StartDate: Date;
  Title: string;
  Type: string;
  ScenarioType: string;
  SeoName: string;
  Unavailable: boolean;
  IsMapAvailable: boolean;
  Unvisible: boolean;
  DetailButtonText: string;
  ListButtonText: null;
  PromotionDetailItemAreas: any[];
  NextFlowConfigurations: object;
}
