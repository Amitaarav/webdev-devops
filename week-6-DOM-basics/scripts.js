function addTodo() {
    
    // Get the input element
    let inputElement = document.getElementById("todo-input");
    let todoValue = inputElement.value;

    // add the value of the input element to the list of todos
    const newDiv = document.createElement("div");
    newDiv.innerHTML = todoValue;

    const parentDiv = document.getElementById("todos-container");
    parentDiv.appendChild(newDiv);

    // clear the input element
    inputElement.value = "";
    
}