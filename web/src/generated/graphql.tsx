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
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  consumptionValue: Scalars['Float'];
  comments: Scalars['String'];
  createdBy: User;
  calculationResults: Array<CalculationResult>;
};

/** Origin of the data */
export enum DataSourceType {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Tertiary = 'Tertiary'
}


export type EmissionFactor = {
  __typename?: 'EmissionFactor';
  id: Scalars['ID'];
  name: Scalars['String'];
  source?: Maybe<Scalars['String']>;
  geographicalArea: Scalars['String'];
  emissionSources: Array<EmissionSource>;
  values?: Maybe<Array<EmissionFactorValue>>;
  dataSourceType: DataSourceType;
};

export type EmissionFactorValue = {
  __typename?: 'EmissionFactorValue';
  id: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['Float'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  emissionFactor: EmissionFactor;
};

export type EmissionSource = {
  __typename?: 'EmissionSource';
  id: Scalars['ID'];
  name: Scalars['String'];
  emissionFactors: Array<EmissionFactor>;
  components: Component;
  scope: GhgScope;
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
  register: UserResolverResponse;
  login: UserResolverResponse;
  logout: Scalars['Boolean'];
  createOrganization: Organization;
  addUserToOrganization: User;
};


export type MutationInviteUserArgs = {
  role: Scalars['String'];
  organizationID: Scalars['String'];
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
  businessID: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddUserToOrganizationArgs = {
  organizationId: Scalars['Int'];
  userId: Scalars['Int'];
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

export type PhysicalQuantity = {
  __typename?: 'PhysicalQuantity';
  id: Scalars['Int'];
  name: Scalars['String'];
  baseUnit: MeasurementUnit;
  units: Array<MeasurementUnit>;
};

export type Query = {
  __typename?: 'Query';
  businessFields: Array<BusinessField>;
  users: Array<User>;
  me?: Maybe<User>;
  allOrganizations: Array<Organization>;
  getUsersInOrganization: Array<User>;
  categories: Array<Category>;
  components: Array<Component>;
  units: Array<MeasurementUnit>;
  physicalQuantities: Array<PhysicalQuantity>;
  allMunicipalities: Array<Municipality>;
};


export type QueryGetUsersInOrganizationArgs = {
  organizationID: Scalars['String'];
};

export type Site = {
  __typename?: 'Site';
  id: Scalars['ID'];
  name: Scalars['String'];
  siteType: SiteType;
  city: Scalars['String'];
  region: Scalars['String'];
  siteUnits: Array<SiteUnit>;
};

export type SiteType = {
  __typename?: 'SiteType';
  id: Scalars['ID'];
  name: Scalars['String'];
  organization: Organization;
  sites: Array<Site>;
};

export type SiteUnit = {
  __typename?: 'SiteUnit';
  id: Scalars['ID'];
  name: Scalars['String'];
  site: Site;
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

export type CreateOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
  businessID: Scalars['String'];
}>;


export type CreateOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { createOrganization: (
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name'>
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

export type AllMunicipalitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMunicipalitiesQuery = (
  { __typename?: 'Query' }
  & { allMunicipalities: Array<(
    { __typename?: 'Municipality' }
    & Pick<Municipality, 'id' | 'name' | 'state' | 'stateCode'>
  )> }
);

export type AllOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllOrganizationsQuery = (
  { __typename?: 'Query' }
  & { allOrganizations: Array<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'name' | 'id' | 'businessID'>
    & { businessField?: Maybe<(
      { __typename?: 'BusinessField' }
      & Pick<BusinessField, 'name' | 'id'>
    )>, municipality?: Maybe<(
      { __typename?: 'Municipality' }
      & Pick<Municipality, 'name' | 'state' | 'id' | 'stateCode'>
    )> }
  )> }
);

export type GetUsersInOrnizationQueryVariables = Exact<{
  organizationID: Scalars['String'];
}>;


export type GetUsersInOrnizationQuery = (
  { __typename?: 'Query' }
  & { getUsersInOrganization: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    & { roles: Array<(
      { __typename?: 'UserRole' }
      & Pick<UserRole, 'name' | 'id' | 'organizationID'>
    )>, organizations?: Maybe<Array<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'name' | 'id' | 'businessID'>
      & { businessField?: Maybe<(
        { __typename?: 'BusinessField' }
        & Pick<BusinessField, 'name' | 'id'>
      )>, municipality?: Maybe<(
        { __typename?: 'Municipality' }
        & Pick<Municipality, 'name' | 'state' | 'id' | 'stateCode'>
      )> }
    )>> }
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);


export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($name: String!, $businessID: String!) {
  createOrganization(name: $name, businessID: $businessID) {
    id
    name
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
 *      name: // value for 'name'
 *      businessID: // value for 'businessID'
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
export const AllMunicipalitiesDocument = gql`
    query AllMunicipalities {
  allMunicipalities {
    id
    name
    state
    stateCode
  }
}
    `;

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
    businessField {
      name
      id
    }
    name
    id
    municipality {
      name
      state
      id
      stateCode
    }
    businessID
  }
}
    `;

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
export const GetUsersInOrnizationDocument = gql`
    query GetUsersInOrnization($organizationID: String!) {
  getUsersInOrganization(organizationID: $organizationID) {
    id
    email
  }
}
    `;

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
export const MeDocument = gql`
    query Me {
  me {
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
      name
      id
      businessField {
        name
        id
      }
      businessID
      municipality {
        name
        state
        id
        stateCode
      }
    }
  }
}
    `;

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
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;