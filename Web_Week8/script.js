// IEFE
(() =>{
	// state variables
	let toDoListArray = [];

	// ul variables
	const form = document.querySelector('.form');
	const input = form.querySelector('.form_input');
	const ul = document.querySelector('.toDoList');

	// event listeners
	form.addEventListener('submit', (e) =>{
		// prevent default behaviour-page reload
		e.preventDefault();
		// give item a unique ID
		let itemId = String(Date.now());
		// get/assign input value
		let toDoItem = input.value;
		// pass ID and item into functions
		addItemToDOM(itemId, toDoItem);
		addItemToArray(itemId, toDoItem);
		// clear the input box (This is default behaviour but we get rid of that)
		input.value = "";
	});

	ul.addEventListener('click', (e) =>{
		let id = e.target.getAttribute("data-id");
		if (!id) return;
		// user clicked in something else. Pass the id through the functions
		removeItemFromDOM(id);
		removeItemFromArray(id);
	});

	// functions
	function addItemToDOM(itemId, toDoItem){
		// create an li
		const li = document.createElement('li');
		li.setAttribute('data-id', itemId);
		// add toDoItem text to li
		li.innerText = toDoItem;
		// add li to the DOM
		ul.appendChild(li);
	}

	function addItemToArray(itemId, toDoItem){
		// add item to the array as object with an ID so that we can find and delete it later
		toDoListArray.push({itemId, toDoItem});
		console.log(toDoListArray);
	}

	function removeItemtFromDOM(id) {
		// get the list item by data ID
		var li = document.querySelector('[data-id="' + id + '"]');
		// remove list item
		ul.removeChild(li);
	}

	function removeItemFromArray(id) {
		// create a new todoListArray with li's that don't match the ID
		toDoListArray = todoListArray.filter((item) => item.itemId !== id);
		console.log(todoListArray);
	}
})();