import gql from 'graphql-tag';

export const FETCH_TODOS_QUERY = gql`
{
  todos{
    id
    title
    description
    dueDate
  }
}
`;