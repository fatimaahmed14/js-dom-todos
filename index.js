const uri = "http://localhost:3000/todos"
const toDoList = document.querySelector('#todo-list')
const addTask = document.querySelector("form input[type='submit']")

const state = {
   thingsToDo : []

}

// this function renders all existing to do items from the data in the json file
function renderToDoList (){
    toDoList.innerHTML = ""

    state.thingsToDo.forEach((task) => {
    const li = document.createElement("li")
    li.innerText = task.title 
    toDoList.appendChild(li)

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

  loadToDoList()

addTask.addEventListener("click",(event) => {

    const newTask = {
        title: "Do the laundry",
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

            state.thingsToDo.push(newTask)           
        })
        renderToDoList()

})
