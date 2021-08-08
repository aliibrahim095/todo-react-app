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

export const FETCH_COMPLETED_TODOS = gql`
{
  todos(where: {state: true}){
    id
    title
    description
    dueDate
    state
  }
}
`;
export const FETCH_INPROGRESS_TODOS = gql`
{
  todos(where: {state: false}){
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
export const UPDATE_TODO_DETAILS = gql`
mutation updateTodo($id: ID!,$title:String!,$description:String!, $dueDate:Date! ,$state:Boolean!) {
  updateTodo(where:{id: $id},data:{title:$title, description:$description, dueDate:$dueDate ,state: $state}){
    id
    title
    description
    dueDate
    state
  }
}
`