import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  dataEntry: DataEntry;
  dateCreated: Scalars['DateTime'];
  id: Scalars['ID'];
  value: Scalars['Float'];
};

export type Category = {
  __typename?: 'Category';
  components: Array<Component>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Component = {
  __typename?: 'Component';
  category: Category;
  emissionSources?: Maybe<Array<EmissionSource>>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type DataEntry = {
  __typename?: 'DataEntry';
  calculationResults: Array<CalculationResult>;
  comments?: Maybe<Scalars['String']>;
  consumptionValue: Scalars['Float'];
  createdBy: User;
  emissionFactorValue: EmissionFactorValue;
  endDate: Scalars['DateTime'];
  id: Scalars['ID'];
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
  dataEntries: Array<DataEntry>;
  emissionFactor: EmissionFactor;
  endDate: Scalars['Int'];
  id: Scalars['ID'];
  startDate: Scalars['Int'];
  value: Scalars['Float'];
};

export type EmissionSource = {
  __typename?: 'EmissionSource';
  components: Component;
  emissionFactors?: Maybe<Array<EmissionFactor>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  scope?: Maybe<GhgScope>;
};

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
  createDataEntry: DataEntry;
  createEmissionFactor: EmissionFactor;
  createEmissionFactorValue: EmissionFactorValue;
  createEmissionSource: EmissionSource;
  createOrganization: Organization;
  createSite: Site;
  createSiteType: SiteType;
  createSiteUnit: SiteUnit;
  createUser: UserResolverResponse;
  inviteUser: Scalars['Boolean'];
  login: UserResolverResponse;
  logout: Scalars['Boolean'];
  register: UserResolverResponse;
  updateOrganization: Organization;
};


export type MutationAddUserToOrganizationArgs = {
  organizationId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationCreateDataEntryArgs = {
  consumptionValue: Scalars['Float'];
  emissionsFactorValueID: Scalars['String'];
  endDate: Scalars['DateTime'];
  siteUnitID: Scalars['String'];
  startDate: Scalars['DateTime'];
};


export type MutationCreateEmissionFactorArgs = {
  dataSourceType?: Maybe<DataSourceType>;
  emissionSourceIDs: Array<Scalars['String']>;
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
  municipalityID: Scalars['Float'];
  name: Scalars['String'];
  siteTypeID: Scalars['String'];
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


export type MutationUpdateOrganizationArgs = {
  newData: EditOrganizationInput;
  organizationID: Scalars['String'];
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
  allDataEntries: Array<DataEntry>;
  allEmissionFactorValues: Array<EmissionFactorValue>;
  allEmissionFactors: Array<EmissionFactor>;
  allEmissionSources: Array<EmissionSource>;
  allMunicipalities: Array<Municipality>;
  allOrganizations: Array<Organization>;
  allSiteUnits: Array<SiteUnit>;
  allSites: Array<Site>;
  allSitesInMyOrganization: Array<Site>;
  allUsers: Array<User>;
  businessFields: Array<BusinessField>;
  categories: Array<Category>;
  components: Array<Component>;
  me?: Maybe<User>;
  physicalQuantities: Array<PhysicalQuantity>;
  siteTypes: Array<SiteType>;
  units: Array<MeasurementUnit>;
  usersInOrganization: Array<User>;
};


export type QueryUsersInOrganizationArgs = {
  organizationID: Scalars['String'];
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

export type MunicipalityFragmentFragment = { __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number };

export type OrganizationFragmentFragment = { __typename?: 'Organization', name: string, id: string, businessID: string, businessField?: Maybe<{ __typename?: 'BusinessField', name: string, id: number }>, municipality?: Maybe<{ __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number }> };

export type UserFragmentFragment = { __typename?: 'User', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, roles: Array<{ __typename?: 'UserRole', name: string, id: number, organizationID: string }>, organizations?: Maybe<Array<{ __typename?: 'Organization', name: string, id: string, businessID: string, businessField?: Maybe<{ __typename?: 'BusinessField', name: string, id: number }>, municipality?: Maybe<{ __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number }> }>> };

export type CreateOrganizationMutationVariables = Exact<{
  data: OrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'Organization', id: string, name: string, businessID: string, businessField?: Maybe<{ __typename?: 'BusinessField', id: number, name: string }>, municipality?: Maybe<{ __typename?: 'Municipality', name: string, state: string }> } };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  organizationID: Scalars['String'];
  role: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResolverResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: string, email: string }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResolverResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, email: string, roles: Array<{ __typename?: 'UserRole', id: number, name: string, organizationID: string }> }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResolverResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, email: string }> } };

export type UpdateOrganizationMutationVariables = Exact<{
  organizationID: Scalars['String'];
  newData: EditOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization: { __typename?: 'Organization', id: string, name: string, businessID: string, businessField?: Maybe<{ __typename?: 'BusinessField', id: number, name: string }>, municipality?: Maybe<{ __typename?: 'Municipality', name: string, state: string }> } };

export type AllMunicipalitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMunicipalitiesQuery = { __typename?: 'Query', allMunicipalities: Array<{ __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number }> };

export type AllOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllOrganizationsQuery = { __typename?: 'Query', allOrganizations: Array<{ __typename?: 'Organization', name: string, id: string, businessID: string, businessField?: Maybe<{ __typename?: 'BusinessField', name: string, id: number }>, municipality?: Maybe<{ __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number }> }> };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, roles: Array<{ __typename?: 'UserRole', name: string, id: number, organizationID: string }>, organizations?: Maybe<Array<{ __typename?: 'Organization', name: string, id: string, businessID: string, businessField?: Maybe<{ __typename?: 'BusinessField', name: string, id: number }>, municipality?: Maybe<{ __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number }> }>> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, organizations?: Maybe<Array<{ __typename?: 'Organization', name: string, id: string, businessID: string, businessField?: Maybe<{ __typename?: 'BusinessField', name: string, id: number }>, municipality?: Maybe<{ __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number }> }>>, roles: Array<{ __typename?: 'UserRole', name: string, id: number, organizationID: string }> }> };

export type GetUsersInOrnizationQueryVariables = Exact<{
  organizationID: Scalars['String'];
}>;


export type GetUsersInOrnizationQuery = { __typename?: 'Query', usersInOrganization: Array<{ __typename?: 'User', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, email: string, roles: Array<{ __typename?: 'UserRole', name: string, id: number, organizationID: string }>, organizations?: Maybe<Array<{ __typename?: 'Organization', name: string, id: string, businessID: string, businessField?: Maybe<{ __typename?: 'BusinessField', name: string, id: number }>, municipality?: Maybe<{ __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number }> }>> }> };

export const MunicipalityFragmentFragmentDoc = gql`
    fragment MunicipalityFragment on Municipality {
  id
  name
  state
  stateCode
}
    `;
export const OrganizationFragmentFragmentDoc = gql`
    fragment OrganizationFragment on Organization {
  name
  id
  businessField {
    name
    id
  }
  businessID
  municipality {
    ...MunicipalityFragment
  }
}
    ${MunicipalityFragmentFragmentDoc}`;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  firstName
  lastName
  email
  roles {
    name
    id
    organizationID
  }
  organizations {
    ...OrganizationFragment
  }
}
    ${OrganizationFragmentFragmentDoc}`;
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($data: OrganizationInput!) {
  createOrganization(data: $data) {
    id
    name
    businessID
    businessField {
      id
      name
    }
    municipality {
      name
      state
    }
  }
}
    `;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<CreateOrganizationMutation, CreateOrganizationMutationVariables>;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, options);
      }
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $password: String!, $organizationID: String!, $role: String!) {
  createUser(
    email: $email
    password: $password
    organizationID: $organizationID
    role: $role
  ) {
    errors {
      message
      field
    }
    user {
      id
      email
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      organizationID: // value for 'organizationID'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      email
      roles {
        id
        name
        organizationID
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $token: String!) {
  register(email: $email, password: $password, token: $token) {
    errors {
      field
      message
    }
    user {
      id
      email
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateOrganizationDocument = gql`
    mutation UpdateOrganization($organizationID: String!, $newData: EditOrganizationInput!) {
  updateOrganization(organizationID: $organizationID, newData: $newData) {
    id
    name
    businessID
    businessField {
      id
      name
    }
    municipality {
      name
      state
    }
  }
}
    `;
export type UpdateOrganizationMutationFn = Apollo.MutationFunction<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;

/**
 * __useUpdateOrganizationMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationMutation, { data, loading, error }] = useUpdateOrganizationMutation({
 *   variables: {
 *      organizationID: // value for 'organizationID'
 *      newData: // value for 'newData'
 *   },
 * });
 */
export function useUpdateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, options);
      }
export type UpdateOrganizationMutationHookResult = ReturnType<typeof useUpdateOrganizationMutation>;
export type UpdateOrganizationMutationResult = Apollo.MutationResult<UpdateOrganizationMutation>;
export type UpdateOrganizationMutationOptions = Apollo.BaseMutationOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const AllMunicipalitiesDocument = gql`
    query AllMunicipalities {
  allMunicipalities {
    ...MunicipalityFragment
  }
}
    ${MunicipalityFragmentFragmentDoc}`;

/**
 * __useAllMunicipalitiesQuery__
 *
 * To run a query within a React component, call `useAllMunicipalitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllMunicipalitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllMunicipalitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllMunicipalitiesQuery(baseOptions?: Apollo.QueryHookOptions<AllMunicipalitiesQuery, AllMunicipalitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllMunicipalitiesQuery, AllMunicipalitiesQueryVariables>(AllMunicipalitiesDocument, options);
      }
export function useAllMunicipalitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllMunicipalitiesQuery, AllMunicipalitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllMunicipalitiesQuery, AllMunicipalitiesQueryVariables>(AllMunicipalitiesDocument, options);
        }
export type AllMunicipalitiesQueryHookResult = ReturnType<typeof useAllMunicipalitiesQuery>;
export type AllMunicipalitiesLazyQueryHookResult = ReturnType<typeof useAllMunicipalitiesLazyQuery>;
export type AllMunicipalitiesQueryResult = Apollo.QueryResult<AllMunicipalitiesQuery, AllMunicipalitiesQueryVariables>;
export const AllOrganizationsDocument = gql`
    query AllOrganizations {
  allOrganizations {
    ...OrganizationFragment
  }
}
    ${OrganizationFragmentFragmentDoc}`;

/**
 * __useAllOrganizationsQuery__
 *
 * To run a query within a React component, call `useAllOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<AllOrganizationsQuery, AllOrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllOrganizationsQuery, AllOrganizationsQueryVariables>(AllOrganizationsDocument, options);
      }
export function useAllOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllOrganizationsQuery, AllOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllOrganizationsQuery, AllOrganizationsQueryVariables>(AllOrganizationsDocument, options);
        }
export type AllOrganizationsQueryHookResult = ReturnType<typeof useAllOrganizationsQuery>;
export type AllOrganizationsLazyQueryHookResult = ReturnType<typeof useAllOrganizationsLazyQuery>;
export type AllOrganizationsQueryResult = Apollo.QueryResult<AllOrganizationsQuery, AllOrganizationsQueryVariables>;
export const AllUsersDocument = gql`
    query AllUsers {
  allUsers {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
    organizations {
      ...OrganizationFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${OrganizationFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetUsersInOrnizationDocument = gql`
    query GetUsersInOrnization($organizationID: String!) {
  usersInOrganization(organizationID: $organizationID) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUsersInOrnizationQuery__
 *
 * To run a query within a React component, call `useGetUsersInOrnizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersInOrnizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersInOrnizationQuery({
 *   variables: {
 *      organizationID: // value for 'organizationID'
 *   },
 * });
 */
export function useGetUsersInOrnizationQuery(baseOptions: Apollo.QueryHookOptions<GetUsersInOrnizationQuery, GetUsersInOrnizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersInOrnizationQuery, GetUsersInOrnizationQueryVariables>(GetUsersInOrnizationDocument, options);
      }
export function useGetUsersInOrnizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersInOrnizationQuery, GetUsersInOrnizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersInOrnizationQuery, GetUsersInOrnizationQueryVariables>(GetUsersInOrnizationDocument, options);
        }
export type GetUsersInOrnizationQueryHookResult = ReturnType<typeof useGetUsersInOrnizationQuery>;
export type GetUsersInOrnizationLazyQueryHookResult = ReturnType<typeof useGetUsersInOrnizationLazyQuery>;
export type GetUsersInOrnizationQueryResult = Apollo.QueryResult<GetUsersInOrnizationQuery, GetUsersInOrnizationQueryVariables>;