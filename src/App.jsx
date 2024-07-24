import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {

    let todoString = localStorage.getItem("todos")
    if(todoString!=null)
    {
      let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
    

    }
    
  }, [])

  
  

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
    
  }

  
  

  const handleEdit = (e, id) => {

    let t = todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    saveToLocalStorage();

  }

  const handleDelete = (e, id) => {

    // console.log(id)

    let index = todos.findIndex(item => {
      return item.id === id
    })
    // console.log(index);

    let newTodos = todos.filter(item => {
      return item.id != id
    });
    settodos(newTodos)
    saveToLocalStorage()


  }

  const handleAdd = () => {

    settodos([...todos, {
      id: uuidv4(),
      todo,
      isCompleted: false
    }])
    settodo("")
    saveToLocalStorage();


  }

  const handleChange = (e) => {
    settodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    // console.log(id)
    let index = todos.findIndex(item => {
      return item.id === id
    })
    // console.log(index);

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodos(newTodos);
    // console.log(newTodos)
    saveToLocalStorage();

  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto my-5 rounded-xl p-5 bg-orange-100 min-h-[80vh]">

        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleAdd} className='bg-orange-500 hover:bg-orange-700 font-bold p-3 py-1 text-white rounded-md m-6'>Save</button>

        </div>

        <h2 className='text-lg font-bold'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No todos to Display</div>}
          {todos.map(item => {


            return <div key={item.id} className="todo flex justify-between w-1/2 my-3">
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id='' />

                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>

              </div>


              <div className="buttons flex h-full">
                <button onClick={(e)=>{ handleEdit(e, item.id)}}  className='bg-orange-500 hover:bg-orange-700 font-bold p-2 py-1 text-white rounded-md mx-1'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-orange-500 hover:bg-orange-700 font-bold p-2 py-1 text-white rounded-md mx-1'>Delete</button>
              </div>


            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
