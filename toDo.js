
import {createHTMLElement} from './dom.js';

class toDo {

    constructor(id, text, status){
        
        this.containerToDo = document.getElementById("container-todo");
        this.idContainer = id;      
        this.text = text; 
        this.status = status;
    }

    create(){

        var checked = (this.status == "completed") ? "checked" : "";
        // this.imgBtn = createHTMLElement("img", {"src": "images/icon-cross.svg"}, "");
        this.toDoElementDeleteBtn = createHTMLElement("button", {"className": "to-do-element-delete-btn"} /*, this.imgBtn*/);
        this.toDoElementDeleteBtn.dataset.id = this.idContainer;
        this.toDoElementDelete = createHTMLElement("div", {"className": "to-do-element-delete"},  this.toDoElementDeleteBtn);


        this.toDoElementListDescriptionSpan =createHTMLElement("span",{"id": "label_" + this.idContainer, "className": "labelDescriptionText"}, "");
        this.toDoElementListDescriptionSpan.textContent = this.text;
        this.todoElementListDesciptionLabel = createHTMLElement("label", {"htmlFor": "checkbox_" +  this.idContainer}, this.toDoElementListDescriptionSpan);
        this.todoElementListDesciption = createHTMLElement("div", {"className": "to-do-element-list-description"}, this.todoElementListDesciptionLabel);


        this.toDoElementListCheckboxCheckmark = createHTMLElement("span", {"className": "checkmark"}, "");
        this.toDoElementListCheckboxCheckbox = createHTMLElement("input", {"type":"checkbox", "checked": checked, "id":  "checkbox_" +  this.idContainer, "className": "checkbox_checkmark"});
        
        this.toDoElementListCheckboxCheckbox.dataset.id = this.idContainer;
        this.toDoElementListCheckboxLabel = createHTMLElement("label", {"htmlFor":  "checkbox_" +  this.idContainer, "className": "container-checkbox"}, this.toDoElementListCheckboxCheckbox, this.toDoElementListCheckboxCheckmark);
        this.toDoElementListCheckbox = createHTMLElement("div", {"className":"to-do-element-list-checkbox"}, this.toDoElementListCheckboxLabel);

        this.toDoElementList = createHTMLElement("div", {"className": "to-do-element-list"}, this.toDoElementListCheckbox, this.todoElementListDesciption);

        this.toDoElement = createHTMLElement("div", {"className": "to-do-element draggable " + this.status, "id": "toDo_" + this.idContainer, "draggable": true}, this.toDoElementList, this.toDoElementDelete)
        this.toDoElement.dataset.id  = this.idContainer;
        this.containerToDo.appendChild(this.toDoElement);
    }

}



export {toDo};