function addHTMLAttributes(htmlElement, attributes) {
    for (let attributeValue in attributes)
      htmlElement[attributeValue] = attributes[attributeValue];
    return htmlElement;
}  
  
function addChildElements (htmlElement, children) {
    children.forEach (child => {
        // checks whether to append the child as a text or an element node
        typeof child === 'string'
        ? htmlElement.appendChild (document.createTextNode (child))
        : htmlElement.appendChild (child);
    });
    return htmlElement;
    }

function createHTMLElement(
    elementTagName, attributes, ...children
){
    let htmlElement = document.createElement(elementTagName);
        htmlElement = addHTMLAttributes(htmlElement, attributes);
        htmlElement = addChildElements(htmlElement, children);

    return htmlElement;
}

export {createHTMLElement}