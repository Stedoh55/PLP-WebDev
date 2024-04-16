// Initialize Firebase with your config
firebase.initializeApp({
	apiKey: "AIzaSyBDl38TBXIv06GoVNFga9r2V6Z4u0AuRBQ",
	authDomain: "to-do-list-1d017.firebaseapp.com",
 	projectId: "to-do-list-1d017",
});

const db = firebase.firestore();

// Functiomn to add a Task
function addTask() {
	const taskInput = document.getElementById("task-input");
	const task = taskInput.value.trim();
	if(task !== ""){
		db.collection("tasks").add({
			task: task,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		taskInput.value = "";
	}
}

// Function to render tasks
function renderTasks(doc) {
	const taskList = document.getElementByID('task-list');
	const taskItem = document.createElement('li');
	taskItem.className = 'task-item';
	taskItem.innerHTML = `
	<span>${doc.data().task}</span>
	<button onclick = "daleteTask('${doc.id}')">Delete</button>
	`;
	taskList.appendChild(taskItem);
}

// Real-time listener for tasks
db.collection("tasks")
	.orderBy("timestamp", "desc")
	.onSnapshot(snapshot => {
		const changes = snapshot.docChanges();
		changes.forEach(change => {
			if (change.type === "added"){
				renderTasks(change.doc);
			}
		});
	});

// Function to delete a task
function daleteTask(id) {
	db.collection("tasks").doc(id).delete();
};