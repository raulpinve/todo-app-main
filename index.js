
import {toDo} from './toDo.js';

var checkbox = document.getElementById("checkbox-switch-theme");
var inputCreateToDo=  document.getElementById("input-create-todo");

var toDoList = [];
var Api = [{text: "Comprar en tiendas D1", "status": "native"}, 
           {text:"ir al exito", "status": "completed"}, 
           {text:"pasear al perro", "status": "native"}
        ];


//Initialize
for (var x= 0; x < Api.length; x++){
    create(Api[x].text, Api[x].status);
}

updateThemeMode();

checkbox.addEventListener("change", function(){
    updateThemeMode();
});

function updateThemeMode(){
    if(checkbox.checked){
        document.body.classList.add("is-dark-mode");
        document.body.classList.remove("is-light-mode");
    }else{
        document.body.classList.add("is-light-mode");
        document.body.classList.remove("is-dark-mode");
    }
}

function create(text, status){
    
    var id = Math.floor(Math.random() * 100);
    var text = text;
    var status = status;

    var newToDo = new toDo(id, text, status);
    
    newToDo.create();

    toDoList.push({"id": id , "text": text, "status":"native"});  

}

function deleteToDo(id){

    var idToDo = id;

    document.getElementById("toDo_" + idToDo).remove();

    for(var i = 0; i < toDoList.length; i++){

        if(toDoList[i].id == idToDo){
            toDoList.splice(i,1)
        }

    }

}

inputCreateToDo.addEventListener("keyup", function(e){
    if(e.key == "Enter"){

        if(this.value.length > 0){
            create(this.value, "native"); 

            this.value = "";
        }
        
      
    }
});



//Delete toDoList
document.addEventListener("click", function(e){

    var element = e.target;

    if(element.tagName == 'BUTTON' && element.classList.contains("to-do-element-delete-btn")){
        
        var idToDo =  element.dataset.id;
        
        deleteToDo(idToDo);
    }
})

//completed taks
document.addEventListener("change", function(e){

    var element = e.target;
    
    // console.log(element.type);

    if(element.type == 'checkbox' && element.classList.contains("checkbox_checkmark")){

        let idToDo = element.dataset.id;    
        // let label = document.getElementById("label_" + idToDo);
        let toDoElement = document.getElementById("toDo_" +  idToDo);
        let index = undefined;

        //Get the index of the element
        for(var i = 0; i < toDoList.length; i++){
            if(toDoList[i].id == idToDo){
                index = i;
            }
        } 
        //add stylish
        if(toDoElement.classList.contains("native")){
            toDoElement.classList.add("completed");
            toDoElement.classList.remove("native");
            toDoList[index].status = "completed";
        }else{
            toDoElement.classList.remove("completed");
            toDoElement.classList.add("native");
            toDoList[index].status = "native";
        }  
        
        var filters = document.querySelector(".filters.selected");
        if(filters.dataset.filter != toDoList[index].status && filters.dataset.filter != "all"){
            toDoElement.style.display = "none";
        }
    }
})


//clear completed 
var clearCompleted = document.getElementsByClassName("span-clear")[0];

clearCompleted.addEventListener("click", function(){

    var completed = document.getElementsByClassName("completed"); 

    if(clearCompleted.classList.contains("clear-completed")){

        for (var i= 0; i < completed.length; i++){    
            deleteToDo(completed[i].dataset.id);  
        }    

    }

})

// Filters 
var filters = document.getElementsByClassName("filters");

for (var i = 0; i < filters.length; i++){
    
    filters[i].addEventListener("click", function(e){


        var element = e.target;
        var container = document.getElementById("container-todo"); 
        var toDoElements = container.getElementsByClassName("to-do-element"); 


        //Remove selected tag 
        for(var x= 0; x <filters.length; x++){
            filters[x].classList.remove("selected");
        }

        if(element.dataset.filter == "all"){
            for(var j =0; j < toDoElements.length; j++){
                toDoElements[j].style.display = "flex";
            }
            element.classList.add("selected");
        }else if(element.dataset.filter == "native"){
            for(var j =0; j < toDoElements.length; j++){
                if(toDoElements[j].classList.contains("native")){
                    toDoElements[j].style.display = "flex";
                }else{
                    toDoElements[j].style.display = "none";
                }      
            }
            element.classList.add("selected");
        }else if(element.dataset.filter == "completed"){
            for(var j =0; j < toDoElements.length; j++){
                if(toDoElements[j].classList.contains("completed")){
                    toDoElements[j].style.display = "flex";
                }else{
                    toDoElements[j].style.display = "none";
                }           
            }
            element.classList.add("selected");
        }
    })

}


//Draggable element
var draggables = document.querySelectorAll(".draggable");
var sortable = document.getElementById("container-todo");

//addEventListener
draggables.forEach(draggables =>{

    draggables.addEventListener("dragstart", ()=>{
        draggables.classList.add("dragging")
    })

    draggables.addEventListener("dragend", ()=>{
        draggables.classList.remove("dragging")
    })

})

sortable.addEventListener("dragover", (e)=>{
    
    e.preventDefault()
    const afterElement = getAfterElement(sortable, e.clientY)
    const draggable = document.querySelector(".dragging")


    if(afterElement == null){
        sortable.appendChild(draggable)
    }else{
        sortable.insertBefore(draggable, afterElement)
    }

})

function getAfterElement(sortable, y){

    const draggables = [...sortable.querySelectorAll(".draggable:not(.dragging")]
    // console.log(draggables);

    return draggables.reduce((previous, current)=>{

        const box = current.getBoundingClientRect()

        const offset = y - box.top -box.height / 2

        if(offset < 0 && offset > previous.offset){
            return {offset: offset, element: current}
        }else{
            return previous
        }

    }, {offset:Number.NEGATIVE_INFINITY}).element

}