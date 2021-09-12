import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AllComponentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllComponentsQuery = { __typename?: 'Query', allComponents: Array<{ __typename?: 'Component', id: number, name: string, category: { __typename?: 'Category', name: string }, emissionSources?: Types.Maybe<Array<{ __typename?: 'EmissionSource', id: number, name: string, scope?: Types.Maybe<Types.GhgScope> }>> }> };


export const AllComponentsDocument = gql`
    query allComponents {
  allComponents {
    id
    name
    category {
      name
    }
    emissionSources {
      id
      name
      scope
    }
  }
}
    `;

/**
 * __useAllComponentsQuery__
 *
 * To run a query within a React component, call `useAllComponentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllComponentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllComponentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllComponentsQuery(baseOptions?: Apollo.QueryHookOptions<AllComponentsQuery, AllComponentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllComponentsQuery, AllComponentsQueryVariables>(AllComponentsDocument, options);
      }
export function useAllComponentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllComponentsQuery, AllComponentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllComponentsQuery, AllComponentsQueryVariables>(AllComponentsDocument, options);
        }
export type AllComponentsQueryHookResult = ReturnType<typeof useAllComponentsQuery>;
export type AllComponentsLazyQueryHookResult = ReturnType<typeof useAllComponentsLazyQuery>;
export type AllComponentsQueryResult = Apollo.QueryResult<AllComponentsQuery, AllComponentsQueryVariables>;