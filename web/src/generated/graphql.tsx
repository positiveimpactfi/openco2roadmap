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
  id: Scalars['ID'];
  dateCreated: Scalars['DateTime'];
  value: Scalars['Float'];
  dataEntry: DataEntry;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
  components: Array<Component>;
};

export type Component = {
  __typename?: 'Component';
  id: Scalars['ID'];
  name: Scalars['String'];
  category: Category;
  emissionSources?: Maybe<Array<EmissionSource>>;
};

export type DataEntry = {
  __typename?: 'DataEntry';
  id: Scalars['ID'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  consumptionValue: Scalars['Float'];
  comments?: Maybe<Scalars['String']>;
  createdBy: User;
  calculationResults: Array<CalculationResult>;
  siteUnit: SiteUnit;
  emissionFactorValue: EmissionFactorValue;
};

/** Origin of the data */
export enum DataSourceType {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Tertiary = 'Tertiary'
}


export type EditOrganizationInput = {
  name?: Maybe<Scalars['String']>;
  businessID?: Maybe<Scalars['String']>;
  businessFieldID?: Maybe<Scalars['Int']>;
  municipalityID?: Maybe<Scalars['Int']>;
};

export type EmissionFactor = {
  __typename?: 'EmissionFactor';
  id: Scalars['ID'];
  name: Scalars['String'];
  source?: Maybe<Scalars['String']>;
  geographicalArea?: Maybe<Scalars['String']>;
  emissionSources: Array<EmissionSource>;
  values?: Maybe<Array<EmissionFactorValue>>;
  dataSourceType: DataSourceType;
  physicalQuantity: PhysicalQuantity;
};

export type EmissionFactorValue = {
  __typename?: 'EmissionFactorValue';
  id: Scalars['ID'];
  value: Scalars['Float'];
  startDate: Scalars['Int'];
  endDate: Scalars['Int'];
  emissionFactor: EmissionFactor;
  dataEntries: Array<DataEntry>;
};

export type EmissionSource = {
  __typename?: 'EmissionSource';
  id: Scalars['ID'];
  name: Scalars['String'];
  emissionFactors?: Maybe<Array<EmissionFactor>>;
  components: Component;
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
  year: Scalars['Int'];
  value: Scalars['Float'];
  parentKPI: Kpi;
};

export type MeasurementUnit = {
  __typename?: 'MeasurementUnit';
  id: Scalars['Int'];
  name: Scalars['String'];
  shorthand: Scalars['String'];
  physicalQuantity: PhysicalQuantity;
  conversionFactor: Scalars['Float'];
};

export type Municipality = {
  __typename?: 'Municipality';
  id: Scalars['Int'];
  name: Scalars['String'];
  stateCode: Scalars['Float'];
  state: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  inviteUser: Scalars['Boolean'];
  createUser: UserResolverResponse;
  register: UserResolverResponse;
  login: UserResolverResponse;
  logout: Scalars['Boolean'];
  createOrganization: Organization;
  updateOrganization: Organization;
  addUserToOrganization: User;
  createSiteType: SiteType;
  createSite: Site;
  createSiteUnit: SiteUnit;
  createEmissionSource: EmissionSource;
  createEmissionFactor: EmissionFactor;
  createEmissionFactorValue: EmissionFactorValue;
  createDataEntry: DataEntry;
};


export type MutationInviteUserArgs = {
  role: Scalars['String'];
  organizationID: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateUserArgs = {
  role: Scalars['String'];
  organizationID: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  token: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateOrganizationArgs = {
  data: OrganizationInput;
};


export type MutationUpdateOrganizationArgs = {
  organizationID: Scalars['String'];
  newData: EditOrganizationInput;
};


export type MutationAddUserToOrganizationArgs = {
  organizationId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationCreateSiteTypeArgs = {
  name: Scalars['String'];
};


export type MutationCreateSiteArgs = {
  municipalityID: Scalars['Float'];
  siteTypeID: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateSiteUnitArgs = {
  siteID: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateEmissionSourceArgs = {
  name: Scalars['String'];
  componentIDs: Array<Scalars['String']>;
};


export type MutationCreateEmissionFactorArgs = {
  dataSourceType?: Maybe<DataSourceType>;
  source?: Maybe<Scalars['String']>;
  physicalQuantityID: Scalars['Float'];
  name: Scalars['String'];
  emissionSourceIDs: Array<Scalars['String']>;
};


export type MutationCreateEmissionFactorValueArgs = {
  endDate: Scalars['Float'];
  startDate: Scalars['Float'];
  value: Scalars['Float'];
  emissionFactorID: Scalars['String'];
};


export type MutationCreateDataEntryArgs = {
  consumptionValue: Scalars['Float'];
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
  emissionsFactorValueID: Scalars['String'];
  siteUnitID: Scalars['String'];
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['ID'];
  name: Scalars['String'];
  businessID: Scalars['String'];
  municipality?: Maybe<Municipality>;
  businessField?: Maybe<BusinessField>;
  siteTypes?: Maybe<Array<SiteType>>;
  kpis?: Maybe<Array<Kpi>>;
};

export type OrganizationInput = {
  name: Scalars['String'];
  businessID: Scalars['String'];
  businessFieldID?: Maybe<Scalars['Int']>;
  municipalityID?: Maybe<Scalars['Int']>;
};

export type PhysicalQuantity = {
  __typename?: 'PhysicalQuantity';
  id: Scalars['Int'];
  name: Scalars['String'];
  baseUnit: MeasurementUnit;
  units: Array<MeasurementUnit>;
  emissionFactors?: Maybe<Array<EmissionFactor>>;
};

export type Query = {
  __typename?: 'Query';
  businessFields: Array<BusinessField>;
  allUsers: Array<User>;
  me?: Maybe<User>;
  allOrganizations: Array<Organization>;
  usersInOrganization: Array<User>;
  siteTypes: Array<SiteType>;
  categories: Array<Category>;
  components: Array<Component>;
  units: Array<MeasurementUnit>;
  physicalQuantities: Array<PhysicalQuantity>;
  allMunicipalities: Array<Municipality>;
  allSites: Array<Site>;
  allSitesInMyOrganization: Array<Site>;
  allSiteUnits: Array<SiteUnit>;
  allEmissionSources: Array<EmissionSource>;
  allEmissionFactors: Array<EmissionFactor>;
  allEmissionFactorValues: Array<EmissionFactorValue>;
  allDataEntries: Array<DataEntry>;
};


export type QueryUsersInOrganizationArgs = {
  organizationID: Scalars['String'];
};

export type Site = {
  __typename?: 'Site';
  id: Scalars['ID'];
  name: Scalars['String'];
  siteType: SiteType;
  municipality?: Maybe<Municipality>;
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
  id: Scalars['ID'];
  name: Scalars['String'];
  site: Site;
  dataEntries?: Maybe<Array<DataEntry>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  roles: Array<UserRole>;
  organizations?: Maybe<Array<Organization>>;
  dataEntries?: Maybe<Array<DataEntry>>;
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

export type MunicipalityFragmentFragment = (
  { __typename?: 'Municipality' }
  & Pick<Municipality, 'id' | 'name' | 'state' | 'stateCode'>
);

export type OrganizationFragmentFragment = (
  { __typename?: 'Organization' }
  & Pick<Organization, 'name' | 'id' | 'businessID'>
  & { businessField?: Maybe<(
    { __typename?: 'BusinessField' }
    & Pick<BusinessField, 'name' | 'id'>
  )>, municipality?: Maybe<(
    { __typename?: 'Municipality' }
    & MunicipalityFragmentFragment
  )> }
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  & { roles: Array<(
    { __typename?: 'UserRole' }
    & Pick<UserRole, 'name' | 'id' | 'organizationID'>
  )>, organizations?: Maybe<Array<(
    { __typename?: 'Organization' }
    & OrganizationFragmentFragment
  )>> }
);

export type CreateOrganizationMutationVariables = Exact<{
  data: OrganizationInput;
}>;


export type CreateOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { createOrganization: (
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name' | 'businessID'>
    & { businessField?: Maybe<(
      { __typename?: 'BusinessField' }
      & Pick<BusinessField, 'id' | 'name'>
    )>, municipality?: Maybe<(
      { __typename?: 'Municipality' }
      & Pick<Municipality, 'name' | 'state'>
    )> }
  ) }
);

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  organizationID: Scalars['String'];
  role: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserResolverResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message' | 'field'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResolverResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
      & { roles: Array<(
        { __typename?: 'UserRole' }
        & Pick<UserRole, 'id' | 'name' | 'organizationID'>
      )> }
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResolverResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    )> }
  ) }
);

export type UpdateOrganizationMutationVariables = Exact<{
  organizationID: Scalars['String'];
  newData: EditOrganizationInput;
}>;


export type UpdateOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { updateOrganization: (
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name' | 'businessID'>
    & { businessField?: Maybe<(
      { __typename?: 'BusinessField' }
      & Pick<BusinessField, 'id' | 'name'>
    )>, municipality?: Maybe<(
      { __typename?: 'Municipality' }
      & Pick<Municipality, 'name' | 'state'>
    )> }
  ) }
);

export type AllMunicipalitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMunicipalitiesQuery = (
  { __typename?: 'Query' }
  & { allMunicipalities: Array<(
    { __typename?: 'Municipality' }
    & MunicipalityFragmentFragment
  )> }
);

export type AllOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllOrganizationsQuery = (
  { __typename?: 'Query' }
  & { allOrganizations: Array<(
    { __typename?: 'Organization' }
    & OrganizationFragmentFragment
  )> }
);

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = (
  { __typename?: 'Query' }
  & { allUsers: Array<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & { organizations?: Maybe<Array<(
      { __typename?: 'Organization' }
      & OrganizationFragmentFragment
    )>> }
    & UserFragmentFragment
  )> }
);

export type GetUsersInOrnizationQueryVariables = Exact<{
  organizationID: Scalars['String'];
}>;


export type GetUsersInOrnizationQuery = (
  { __typename?: 'Query' }
  & { usersInOrganization: Array<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

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