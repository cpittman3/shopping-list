// Wait until the page is fully loaded before calling the beginning function
window.onload = function () {
    initShoppingList();
};

// Starting function
function initShoppingList() {
    // Make item-form-container accessible through a variable
    let form = document.getElementById("item-form");
    // Call handleItemForm function when submit is pressed
    form.addEventListener("submit",(event) => {
       handleItemForm(event,form);
    });
}

// Set compatibility and call function to add input data to the list
function handleItemForm(event,formRef) {
    // Check if preventDefault exists (Used for browser backward compatibility)
    if(event.preventDefault) {
        // If the preventDefault function exists call it
        event.preventDefault();
    }
    addItemToShoppingList();
    formRef.reset();
   // Used for browser backward compatibility
   return false;
}

// Function to add user input to the list
function addItemToShoppingList() {
    // Variables used to address item-name and item-amount from the HTML file
    let itemName = document.getElementById("item-name");
    let itemAmount = document.getElementById("item-amount");
    console.log(itemName)
    // Set id to a random number
    let id = getRandomInt(0,10000000);
    // Variable that calls a function that will pass the current name and amount from the user input
    // and contains the HTML list command to be displayed
    let itemHtml = createListItemHtml(itemName.value, itemAmount.value, id);
    // This variable contains the id of the entire HTML
    console.log("Item HTML: ", itemHtml)//   >>>>>>>>>>>>>>>>>>>>>>>>>  !!!!!THIS IS NOT BEING LOGGED!!!!!
    let itemListRef = document.getElementById("shopping-list");
    // Tell JS to insert <li> ${itemName} - ${itemAmount} </li> and interpret it as HTML at the end of shopping-list
    itemListRef.insertAdjacentHTML("afterend", itemHtml);

    setDeleteButtonEvent(id);
}

function setDeleteButtonEvent(id) {
    let deleteButton = document.getElementById("button"+id);
    deleteButton.addEventListener("click", () => {
        console.log("DeleteButton Works");
        removeListItem(id);
    });
}

// This function passes the values of item-name and item-amount to the code below
function createListItemHtml(itemName, itemAmount, id) {
    // Return the values in a HTML list command
    // Create delete button
    return '<li id="item${id}"> ' +
        '${itemName} - ${itemAmount}' +
        '<button id="item${id}" type="button">Delete Item</button>' +
        ' </li>';

}

function removeListItem(id) {
    let listItem = document.getElementById("item"+id);
    listItem.parentNode.removeChild(listItem);
}

function getRandomInt(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max -min)) + min;
}