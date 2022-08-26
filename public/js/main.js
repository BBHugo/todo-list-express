const deleteBtn = document.querySelectorAll('.fa-trash') //Creating a variable that holds the code which selects all elements with a class of .fa-trash which selects all the trash can icons.
const item = document.querySelectorAll('.item span')// Creating a variable and assigning it the query selector that targets any CLASS of item and any span tag that are within that item class. So we select all spans that are within the parents that have a class of item. 
const itemCompleted = document.querySelectorAll('.item span.completed') //Creating a variable and assigning it the querySelector to target all spans that have the class of completed, the spans have to be within a parent of a class of item. It's more specific than above.

Array.from(deleteBtn).forEach((element)=>{ //Creating an array from all of our delete buttons and starting a loop
    element.addEventListener('click', deleteItem) //add an event listener to the current item that waits for a click and then calls a function called deleteItem.
}) //close our loop

Array.from(item).forEach((element)=>{ //creates an array from all our selection(spans from the parent w/ class of "item") and starting a loop. In this case it's grabbing the text listed
    element.addEventListener('click', markComplete) //add an event listener to the current item that waits for a click and then calls a function called markComplete.
}) //Close our loop

Array.from(itemCompleted).forEach((element)=>{//creates an array from all our selection(spans w/ the class of completed from the parent w/ class of "item") and starting a loop. In this case it's grabbing the text from our list but only the ones that are completed (Struck through)
    element.addEventListener('click', markUnComplete) //add an event listener to the current item that waits for a click and then calls a function called markUncomplete. It will ultimately remove the strikethrough etc.
})//Close our loop

async function deleteItem(){ //Starting a function, declaring an asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText //creating a variable that looks inside of the list item to extract the text value ONLY of the specified list item. .innerText is text inside of an element. We've clicked on the trashcan, the parent node of the trashcan is the list item. In that child node we have a span, inside that span we have an indent which is element [0], text which is element [1], closing tag element [2] (allegedly). "this." refers to the container which the item is in.
    try{ //declaring a try block to "do something" (The catch runs if the something doesn't work)
        const response = await fetch('deleteItem', { //assigning a variable that creates a response variable that waits on a fetch to get data from the result of deleteItem route. Starts the code below. what fetch does is getting data from somewhere.
            method: 'delete', //Setting the CRUD method we're using for the route
            headers: {'Content-Type': 'application/json'}, //Specifying the type of content expected which is JSON
            body: JSON.stringify({ //the body is the message we're actually getting. This line declares the message content being passed, and stringify that content (turns it into a string)
              'itemFromJS': itemText //setting the content of the body to the inner text of the list item, and naming it "itemFromJS"
            }) //Closing the body
          }) //closing our object (try)
        const data = await response.json() //waiting on JSON from the response to be converted. Line 20 waits for the 
        console.log(data) //Log the data to the console
        location.reload() //refreshing the page to start the get request, and update what is displayed.

    }catch(err){ //Catching any error. When we say catch, we're saying "if an error occurs, pass the error into the catch block"
        console.log(err) //Logging the error into the console
    } //Closing the catch block.
} //Ending the function

async function markComplete(){ //Creating an asynchronous functino called MarkComplete
    const itemText = this.parentNode.childNodes[1].innerText //Selecting something called item text. Reaching into the list item, getting the span and selecting the inner text in that list item.
    try{ //Starting a try block to do something
        const response = await fetch('markComplete', { //Declaring a response and waiting on a fetch, with the route being markComplete
            method: 'put', //Put in terms of CRUD speak is "Update", this line setting the CRUD method to update for the route
            headers: {'Content-Type': 'application/json'}, //Specifying the type of content to expect which is JSON.
            body: JSON.stringify({ ////the body is the message we're actually getting. This line declares the message content being passed, and stringify that content (turns it into a string)
                'itemFromJS': itemText //setting the content of the body to the inner text of the list item, and naming it "itemFromJS"
            }) //Closing the body
          }) //Closing the object
        const data = await response.json() //Going to wait on the JSON for the response
        console.log(data) //Console logging the previous line data
        location.reload() //Reloading the page, (Ultimately sending a get request) to 

    }catch(err){ //Closing the try, and starting the catching of the error
        console.log(err) //Console logging the error.
    } //Close catch block
} //End the function

//Each of these individual blocks is to set up a different click

async function markUnComplete(){ //Beginning an asynchronous function called MarkUncomplete
    const itemText = this.parentNode.childNodes[1].innerText //Selecting our item text parentNode(ItemList).ChildNodes[1](The Span).InnerText(The text in that span)
    try{ //Setting our try block
        const response = await fetch('markUnComplete', { //Creating a response awaiting on a fetch sending some data to the route 'markUnComplete"
            method: 'put', //Setting the method that this route is going to be doing which is the 'put'. Which is 'Update' in CRUD speak.
            headers: {'Content-Type': 'application/json'}, //Telling the route to expect a JSON style of content
            body: JSON.stringify({ //Taking the body of that JSON and turning it into a string.
                'itemFromJS': itemText //Taking the information from that body and naming it 'ItemFromJS'
            }) //Closing our body block
          }) //Closing our fetch to the markUncomplete route
        const data = await response.json() //responding by awaiting on the JSON.
        console.log(data) //Logging the data from the previous line
        location.reload() //Refreshing the page

    }catch(err){ //If any errors occur in our try, it catches it here.
        console.log(err) //Console logs the error that was caught
    } //Closing catch block
} //closing async function

//A NOTE FOR THE .ENV FILE: Things that go into the .env is private info, things we want to hide. Port value, because you can reference it from our server.js. Ultimately it will be in the gitignore.