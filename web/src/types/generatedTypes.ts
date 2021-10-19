export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type BusinessField = {
  __typename?: 'BusinessField';
  id: Scalars['Int'];
  name: Scalars['String'];
  organizations?: Maybe<Array<Organization>>;
};

export type CalculationResult = {
  __typename?: 'CalculationResult';
  category: CategoryType;
  consumptionValue: Scalars['Float'];
  creatorID: Scalars['String'];
  dataEntry: DataEntry;
  dateCreated: Scalars['DateTime'];
  emissionFactorValue: Scalars['Float'];
  emissionSource: EmissionSourceType;
  emissionsCalculated?: Maybe<Scalars['Float']>;
  endDate: Scalars['DateTime'];
  id: Scalars['ID'];
  isLatest: Scalars['Boolean'];
  measurementUnit: MeasurementUnitType;
  organizationID: Scalars['String'];
  siteID: Scalars['String'];
  siteUnitID: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type Category = {
  __typename?: 'Category';
  components: Array<Component>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** Emission categories */
export enum CategoryType {
  Hallinto = 'Hallinto',
  Hankinnat = 'Hankinnat',
  Logistiikka = 'Logistiikka',
  Toimitilat = 'Toimitilat'
}

export type Component = {
  __typename?: 'Component';
  category: Category;
  emissionSources?: Maybe<Array<EmissionSource>>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type DataEntry = {
  __typename?: 'DataEntry';
  calculationResults: Array<CalculationResult>;
  category: CategoryType;
  comments?: Maybe<Scalars['String']>;
  consumptionValue: Scalars['Float'];
  createdBy: User;
  emissionFactorValue: EmissionFactorValue;
  emissionSource: EmissionSourceType;
  endDate: Scalars['DateTime'];
  id: Scalars['ID'];
  measurementUnit: MeasurementUnitType;
  siteUnit: SiteUnit;
  startDate: Scalars['DateTime'];
};

/** Origin of the data */
export enum DataSourceType {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Tertiary = 'Tertiary'
}

export type EditOrganizationInput = {
  businessFieldID?: Maybe<Scalars['Int']>;
  businessID?: Maybe<Scalars['String']>;
  municipalityID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type EmissionFactor = {
  __typename?: 'EmissionFactor';
  creator?: Maybe<Organization>;
  dataSourceType: DataSourceType;
  emissionSources: Array<EmissionSource>;
  geographicalArea?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  physicalQuantity: PhysicalQuantity;
  source?: Maybe<Scalars['String']>;
  values?: Maybe<Array<EmissionFactorValue>>;
};

export type EmissionFactorValue = {
  __typename?: 'EmissionFactorValue';
  creator?: Maybe<Organization>;
  emissionFactor: EmissionFactor;
  endDate: Scalars['Int'];
  id: Scalars['ID'];
  startDate: Scalars['Int'];
  value: Scalars['Float'];
};

export type EmissionSource = {
  __typename?: 'EmissionSource';
  components: Array<Component>;
  emissionFactors?: Maybe<Array<EmissionFactor>>;
  id: Scalars['Int'];
  name: Scalars['String'];
  scope?: Maybe<GhgScope>;
};

/** Emission sources */
export enum EmissionSourceType {
  BensiiniHenkiloauto = 'BensiiniHenkiloauto',
  Biojate = 'Biojate',
  DieselHenkiloauto = 'DieselHenkiloauto',
  ElintarvikkeetEur = 'ElintarvikkeetEUR',
  Energiajate = 'Energiajate',
  HedelmatJaVihannekset = 'HedelmatJaVihannekset',
  HenkiloautoKa = 'HenkiloautoKA',
  Herkut = 'Herkut',
  Jakelukuormaauto6t = 'Jakelukuormaauto6t',
  Jakelukuormaauto15t = 'Jakelukuormaauto15t',
  Junaliput = 'Junaliput',
  Juomat = 'Juomat',
  KaasuHenkiloauto = 'KaasuHenkiloauto',
  KalaJaMerenlevat = 'KalaJaMerenlevat',
  Kananmunat = 'Kananmunat',
  KasvimaidotJaProteiinit = 'KasvimaidotJaProteiinit',
  Kaukojaahdytys = 'Kaukojaahdytys',
  Kaukolampo = 'Kaukolampo',
  Kaukolennot = 'Kaukolennot',
  Kiinteistohoito = 'Kiinteistohoito',
  Konttialus = 'Konttialus',
  Kotimaanlennot = 'Kotimaanlennot',
  Laitehankinnat = 'Laitehankinnat',
  Laivaliput = 'Laivaliput',
  Lasijate = 'Lasijate',
  Lentoliput = 'Lentoliput',
  Liha = 'Liha',
  LinjaRaitioMetro = 'LinjaRaitioMetro',
  LyhyetLennotKotimaa = 'LyhyetLennotKotimaa',
  LyhyetUlkomaatlennot = 'LyhyetUlkomaatlennot',
  LyhytLennotEurooppa = 'LyhytLennotEurooppa',
  Maitotuotteet = 'Maitotuotteet',
  Majoituspalveluhankinnat = 'Majoituspalveluhankinnat',
  MatkailumenotUlkomailla = 'MatkailumenotUlkomailla',
  Matkakorvaukset = 'Matkakorvaukset',
  Metallijate = 'Metallijate',
  MuutHyodykkeet = 'MuutHyodykkeet',
  MuutKuljetuspalveluHankinnat = 'MuutKuljetuspalveluHankinnat',
  MuutProteiinit = 'MuutProteiinit',
  MuutTuotteet = 'MuutTuotteet',
  PahviJaKartonki = 'PahviJaKartonki',
  Pakettiauto = 'Pakettiauto',
  PalveluHankinnat = 'PalveluHankinnat',
  Paperijate = 'Paperijate',
  Paristot = 'Paristot',
  Peravaunu = 'Peravaunu',
  PitkatLennotEurooppa = 'PitkatLennotEurooppa',
  PitkatLennotKotimaa = 'PitkatLennotKotimaa',
  Polttoaineet = 'Polttoaineet',
  Puoliperavaunu = 'Puoliperavaunu',
  Rasvat = 'Rasvat',
  Ser = 'SER',
  Sahko = 'Sahko',
  SahkoHenkiloauto = 'SahkoHenkiloauto',
  Sekajate = 'Sekajate',
  Taksikulut = 'Taksikulut',
  TavaraHankinnat = 'TavaraHankinnat',
  TavarajunaDiesel = 'TavarajunaDiesel',
  TavarajunaSahko = 'TavarajunaSahko',
  Terveydenhoito = 'Terveydenhoito',
  Tietoliikenne = 'Tietoliikenne',
  Toimistotarvikkeet = 'Toimistotarvikkeet',
  Toimitilat = 'Toimitilat',
  Valmismatkahankinnat = 'Valmismatkahankinnat',
  Viljatuotteet = 'Viljatuotteet'
}

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

/** Greenhouse gas protocol emission scopes */
export enum GhgScope {
  Scope1 = 'Scope1',
  Scope2 = 'Scope2',
  Scope3 = 'Scope3'
}

export type Kpi = {
  __typename?: 'KPI';
  id: Scalars['ID'];
  name: Scalars['String'];
  organization: Organization;
  values: Array<KpiValue>;
};

export type KpiValue = {
  __typename?: 'KPIValue';
  id: Scalars['ID'];
  parentKPI: Kpi;
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type MeasurementUnit = {
  __typename?: 'MeasurementUnit';
  conversionFactor: Scalars['Float'];
  id: Scalars['Int'];
  name: Scalars['String'];
  physicalQuantity: PhysicalQuantity;
  shorthand: Scalars['String'];
};

/** Units of physical quantities */
export enum MeasurementUnitType {
  Eur = 'EUR',
  Gj = 'GJ',
  GWh = 'GWh',
  J = 'J',
  Mj = 'MJ',
  Mm = 'MM',
  MWh = 'MWh',
  Tj = 'TJ',
  Wh = 'Wh',
  A = 'a',
  Cm = 'cm',
  Cm2 = 'cm2',
  Cm3 = 'cm3',
  D = 'd',
  G = 'g',
  H = 'h',
  Ha = 'ha',
  KJ = 'kJ',
  KWh = 'kWh',
  Kg = 'kg',
  Km = 'km',
  Km2 = 'km2',
  L = 'l',
  M = 'm',
  M2 = 'm2',
  M3 = 'm3',
  Mi = 'mi',
  Min = 'min',
  Ml = 'ml',
  Nmi = 'nmi',
  Pkm = 'pkm',
  S = 's',
  T = 't',
  Tkm = 'tkm'
}

export type Municipality = {
  __typename?: 'Municipality';
  id: Scalars['Int'];
  name: Scalars['String'];
  state: Scalars['String'];
  stateCode: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToOrganization: User;
  changePassword: UserResolverResponse;
  createDataEntry: DataEntry;
  createEmissionFactor: EmissionFactor;
  createEmissionFactorValue: EmissionFactorValue;
  createEmissionSource: EmissionSource;
  createOrganization: Organization;
  createSite: Site;
  createSiteType: SiteType;
  createSiteUnit: SiteUnit;
  createUser: UserResolverResponse;
  deleteEntry: DataEntry;
  forgotPassword: Scalars['Boolean'];
  inviteUser: Scalars['Boolean'];
  login: UserResolverResponse;
  logout: Scalars['Boolean'];
  register: UserResolverResponse;
  updateMyName: Scalars['Boolean'];
  updateOrganization: Organization;
  updateSite: Site;
};


export type MutationAddUserToOrganizationArgs = {
  organizationId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateDataEntryArgs = {
  category: CategoryType;
  consumptionValue: Scalars['Float'];
  emissionSource: EmissionSourceType;
  emissionsFactorValueID: Scalars['String'];
  endDate: Scalars['DateTime'];
  measurementUnit: MeasurementUnitType;
  siteUnitID: Scalars['String'];
  startDate: Scalars['DateTime'];
};


export type MutationCreateEmissionFactorArgs = {
  dataSourceType?: Maybe<DataSourceType>;
  emissionSourceIDs: Array<Scalars['Int']>;
  name: Scalars['String'];
  physicalQuantityID: Scalars['Float'];
  source?: Maybe<Scalars['String']>;
};


export type MutationCreateEmissionFactorValueArgs = {
  emissionFactorID: Scalars['String'];
  endDate: Scalars['Float'];
  startDate: Scalars['Float'];
  value: Scalars['Float'];
};


export type MutationCreateEmissionSourceArgs = {
  componentIDs: Array<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreateOrganizationArgs = {
  data: OrganizationInput;
};


export type MutationCreateSiteArgs = {
  municipalityID: Scalars['Int'];
  name: Scalars['String'];
  siteTypeID: Scalars['String'];
  siteUnits?: Maybe<Array<Scalars['String']>>;
};


export type MutationCreateSiteTypeArgs = {
  name: Scalars['String'];
};


export type MutationCreateSiteUnitArgs = {
  name: Scalars['String'];
  siteID: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  organizationID: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
};


export type MutationDeleteEntryArgs = {
  dataEntryID: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationInviteUserArgs = {
  email: Scalars['String'];
  organizationID: Scalars['String'];
  role: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdateMyNameArgs = {
  newFirstName?: Maybe<Scalars['String']>;
  newLastName?: Maybe<Scalars['String']>;
};


export type MutationUpdateOrganizationArgs = {
  newData: EditOrganizationInput;
  organizationID: Scalars['String'];
};


export type MutationUpdateSiteArgs = {
  municipalityID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  siteID: Scalars['String'];
  siteTypeID?: Maybe<Scalars['String']>;
  siteUnits?: Maybe<Array<SiteUnitInput>>;
};

export type Organization = {
  __typename?: 'Organization';
  businessField?: Maybe<BusinessField>;
  businessID: Scalars['String'];
  id: Scalars['ID'];
  kpis?: Maybe<Array<Kpi>>;
  municipality?: Maybe<Municipality>;
  name: Scalars['String'];
  siteTypes?: Maybe<Array<SiteType>>;
};

export type OrganizationInput = {
  businessFieldID?: Maybe<Scalars['Int']>;
  businessID: Scalars['String'];
  municipalityID?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type PhysicalQuantity = {
  __typename?: 'PhysicalQuantity';
  baseUnit: MeasurementUnit;
  emissionFactors?: Maybe<Array<EmissionFactor>>;
  id: Scalars['Int'];
  name: Scalars['String'];
  units: Array<MeasurementUnit>;
};

export type Query = {
  __typename?: 'Query';
  allCalculationResults: Array<CalculationResult>;
  allCategories: Array<Category>;
  allComponents: Array<Component>;
  allDataEntries: Array<DataEntry>;
  allEmissionFactorValues: Array<EmissionFactorValue>;
  allEmissionFactors: Array<EmissionFactor>;
  allEmissionSources: Array<EmissionSource>;
  allMunicipalities: Array<Municipality>;
  allOrganizations: Array<Organization>;
  allPublicEmissionFactors: Array<EmissionFactor>;
  allSiteUnits: Array<SiteUnit>;
  allSites: Array<Site>;
  allSitesInMyOrganization: Array<Site>;
  allUsers: Array<User>;
  businessFields: Array<BusinessField>;
  me?: Maybe<User>;
  myDataEntries: Array<DataEntry>;
  myEmissionFactors: Array<EmissionFactor>;
  myOrganizationDataEntries: Array<DataEntry>;
  myOrganizationEmissionFactors: Array<EmissionFactor>;
  myOrganizationEmissionsByCategoryAndYear: Array<Return>;
  myOrganizationUsers: Array<User>;
  physicalQuantities: Array<PhysicalQuantity>;
  siteTypes: Array<SiteType>;
  units: Array<MeasurementUnit>;
  usersInOrganization: Array<User>;
};


export type QueryUsersInOrganizationArgs = {
  organizationID: Scalars['String'];
};

export type Return = {
  __typename?: 'Return';
  categoryid?: Maybe<Scalars['String']>;
  yearlysums?: Maybe<Scalars['String']>;
};

export type Site = {
  __typename?: 'Site';
  id: Scalars['ID'];
  municipality?: Maybe<Municipality>;
  name: Scalars['String'];
  siteType: SiteType;
  siteUnits?: Maybe<Array<SiteUnit>>;
};

export type SiteType = {
  __typename?: 'SiteType';
  id: Scalars['ID'];
  name: Scalars['String'];
  organization: Organization;
  sites?: Maybe<Array<Site>>;
};

export type SiteUnit = {
  __typename?: 'SiteUnit';
  dataEntries?: Maybe<Array<DataEntry>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  site: Site;
};

export type SiteUnitInput = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  dataEntries?: Maybe<Array<DataEntry>>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  organizations?: Maybe<Array<Organization>>;
  roles: Array<UserRole>;
};

export type UserResolverResponse = {
  __typename?: 'UserResolverResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserRole = {
  __typename?: 'UserRole';
  id: Scalars['Float'];
  name: Scalars['String'];
  organizationID: Scalars['String'];
};
