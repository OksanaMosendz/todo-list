function TodoListItem({todo, onCompleteTodo}){
   
 return(
   <li key={todo.id}><form>
   <input onChange={()=>onCompleteTodo(todo.id)} type="checkbox" checked={todo.isCompleted}/>{todo.title}</form></li>
)
}

export default TodoListItem;