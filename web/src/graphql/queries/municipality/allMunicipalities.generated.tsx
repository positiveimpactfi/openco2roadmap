import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import { MunicipalityFragmentFragmentDoc } from '../../fragments/municipality.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AllMunicipalitiesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllMunicipalitiesQuery = { __typename?: 'Query', allMunicipalities: Array<{ __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number }> };


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