import gql from 'graphql-tag';

export const FETCH_TODOS_QUERY = gql`
{
  todos{
    id
    title
    description
    dueDate
    state
  }
}
`;

export const ADD_TODO = gql`
  mutation createTodo($title: String!, $description: String!, $dueDate:Date!) {
    createTodo(data:{title: $title, description: $description, dueDate: $dueDate, state:false }) {
      title
      description
      dueDate
    }
  }
`;

export const REMOVE_TODO = gql`
mutation deleteTodo($id: ID!) {
  deleteTodo(where:{id: $id}){
    title
  }
}
`
export const UPDATE_TODO = gql`
mutation updateTodo($id: ID!,$state:Boolean!) {
  updateTodo(where:{id: $id},data:{state: $state}){
    title
    state
  }
}
`
