import React from 'react'
import AddTodo from '../../components/todos/AddTodo'
import ListTodos from '../../components/todos/ListTodos'
function Home() {
    return (
        <div>
            <AddTodo/>
            <ListTodos/>
        </div>
    )
}

export default Home
