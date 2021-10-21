const form = document.querySelector('form');
const textBox = document.querySelector('.text-box');
const todoIncompleteList = document.querySelector('.todo-incomplete__list');
const todoCompleteList = document.querySelector('.todo-complete__list');


// adding messages
const noTodoAdded = document.createElement('span');
// noTodoAdded.className = 'message';
noTodoAdded.classList.add('message', 'previous-element')
noTodoAdded.innerText = 'no to-do added yet';

const noTodoCompleted = document.createElement('span');
noTodoCompleted.className = 'message';
noTodoCompleted.innerText = 'you can do it!';


todoIncompleteList.appendChild(noTodoAdded);
todoCompleteList.appendChild(noTodoCompleted);

// functions

const createLi = function(taskName) {
    const liItem = document.createElement('li');
    liItem.className = 'previous-element';

    const span = document.createElement('span');
    span.innerText = taskName;

    const doneBtn = document.createElement('button');
    doneBtn.innerText = 'Done';
    doneBtn.classList.add('done-btn', 'btn');

    liItem.append(span, doneBtn);
    return liItem;
}


const addTask = function(event) {
    event.preventDefault();         //to prevent reload 
    
    const liItem = createLi(textBox.value);
    const previousElement = document.querySelector('.previous-element');

    if(textBox.value === ''){
        window.alert('Please insert text in the textbox!')
    } else{
        
        todoIncompleteList.insertBefore(liItem, previousElement);
        textBox.value = '';  

        removeMessage(todoIncompleteList);
    }    

    //done button functionality
    doneBtnFunc(liItem, clickedDone);           // this clickedDone is supposed to be a fucntion but it hasn't been written yet
}

const clickedDone = function(){                 // so, here we write the clickedDone funtion
    const parentLi = this.parentNode;

    parentLi.classList.add('fade');
    removeLiItemIncomplete(parentLi);
}


const clickedDelete = function(){
    const parentLi = this.parentNode;

    parentLi.classList.add('fade');
    removeLiItemComplete(parentLi);
}


const doneBtnFunc= function(parentItem, buttonClick){          // just like addEventListener, this doneBtnFunc expects its 2nd paremeter to be a FUNCTION when it is called
    const doneBtn = parentItem.querySelector('button');
    doneBtn.onclick = buttonClick;                        // because onclick needs to be assigned to a function
}

const deleteBtnFunc = function(parentItem, buttonClick){
    const deleteBtn = parentItem.querySelector('button');
    deleteBtn.onclick = buttonClick;
}



// adding and removing message function//
const removeMessage = function(elementName){
    if(elementName.childNodes[elementName.childNodes.length-1].classList[0] == 'message' 
       || elementName.childNodes[0].classList == 'message') 
    {
        const message = elementName.querySelector('.message');
        elementName.removeChild(message);
    }
}

const addMessageToIncompleteList = function(elementName){
    if(elementName.childNodes.length === 0) {
        elementName.appendChild(noTodoAdded);
    }
}

const addMessageToCompleteList = function(elementName){
    if(elementName.childNodes.length === 0) {
        elementName.appendChild(noTodoCompleted);
    }
}



//removing liItem after transition function
const removeLiItemIncomplete = function(item){
    item.addEventListener('transitionend', function(){
        
        const doneBtn = item.querySelector('.done-btn');
        
        if(item.contains(doneBtn)){
            item.removeChild(doneBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.classList.add('delete-btn', 'btn');
            item.appendChild(deleteBtn);

            todoCompleteList.appendChild(item);
            item.classList.remove('fade');

            removeMessage(todoCompleteList);
            addMessageToIncompleteList(todoIncompleteList);

            //delete button functionality
            deleteBtnFunc(item, clickedDelete);
        }
    })
}

const removeLiItemComplete = function(item){
    item.addEventListener('transitionend', function(){
        todoCompleteList.removeChild(item);

        addMessageToCompleteList(todoCompleteList);
    })
}


form.addEventListener('submit', addTask);