const uri = "http://localhost:3000/todos"
const toDoList = document.querySelector('#todo-list')
const addTask = document.querySelector("form input[type='submit']")

const state = {
   thingsToDo : []

}

// This function renders all existing to do items from the data in the json file
function renderToDoList (){
    toDoList.innerHTML = ""

    state.thingsToDo.forEach((task) => {
    const li = document.createElement("li")
    li.innerText = task.title 
    toDoList.appendChild(li)

    // delete button created and placed with each list item 
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "delete"
    li.appendChild(deleteButton)

    deleteButton.addEventListener("click", (event) => {
        event.preventDefault()
        // The function that takes care of all deletions is called here, as a task should only be deleted when the delete button is clicked
        deleteTask(task)
    })

  });
}

// This function uses the GET meathod to retrieve the data from the json file 
// The fetch method is used, then the render function is called to finally render the list to the page
function loadToDoList() {

    fetch(uri)

      .then((response) => {
        return response.json()
      })
      .then((task) => {

        state.thingsToDo = task
        renderToDoList()
      });
  }

// Once add is clicked, using the Post method, a new task is added to the to do list
addTask.addEventListener("click",(event) => {

    const newTask = {
        // unable to make this dynamic at the moment
        title: "Get a new cat",
        completed: "false",
    }

    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newTask),
    }

    fetch(uri, options)
        .then((response) => {
            
            return response.json()
        })
        .then((newTask) => {

            renderToDoList()
            state.thingsToDo.push(newTask)           
        })

})


// This function allows user to delete any task off of their existing list
function deleteTask(task) {
    const url = `http://localhost:3000/todos/${task.id}`

    const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
 
    }

    fetch(uri, options)
        .then((response) => {
        return response.json()
    })
        .then((data) => {
            const updatedToDoList = state.thingsToDo.filter((tasks) => {
                return tasks.id !== task.id

    })
    
    // Here the old state is being over written with the new up to date data including all deletions made by user
    state.thingsToDo = updatedToDoList
    renderToDoList()

})
}

loadToDoList()