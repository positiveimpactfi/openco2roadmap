import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AllEmissionSourcesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllEmissionSourcesQuery = { __typename?: 'Query', allEmissionSources: Array<{ __typename?: 'EmissionSource', id: number, name: string, scope?: Types.Maybe<Types.GhgScope>, components: Array<{ __typename?: 'Component', name: string, id: number, category: { __typename?: 'Category', name: string, id: number } }> }> };


export const AllEmissionSourcesDocument = gql`
    query AllEmissionSources {
  allEmissionSources {
    id
    name
    components {
      name
      id
      category {
        name
        id
      }
    }
    scope
  }
}
    `;

/**
 * __useAllEmissionSourcesQuery__
 *
 * To run a query within a React component, call `useAllEmissionSourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllEmissionSourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllEmissionSourcesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllEmissionSourcesQuery(baseOptions?: Apollo.QueryHookOptions<AllEmissionSourcesQuery, AllEmissionSourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllEmissionSourcesQuery, AllEmissionSourcesQueryVariables>(AllEmissionSourcesDocument, options);
      }
export function useAllEmissionSourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllEmissionSourcesQuery, AllEmissionSourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllEmissionSourcesQuery, AllEmissionSourcesQueryVariables>(AllEmissionSourcesDocument, options);
        }
export type AllEmissionSourcesQueryHookResult = ReturnType<typeof useAllEmissionSourcesQuery>;
export type AllEmissionSourcesLazyQueryHookResult = ReturnType<typeof useAllEmissionSourcesLazyQuery>;
export type AllEmissionSourcesQueryResult = Apollo.QueryResult<AllEmissionSourcesQuery, AllEmissionSourcesQueryVariables>;