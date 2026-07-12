const addTask = document.getElementById("add-btn");
const modalTask = document.getElementById("modal-overlay");
const closeModal = document.getElementById("close-modal-btn");
const cancelModal = document.getElementById("cancel-btn");
const taskTitle = document.getElementById("task-title");
const titleError = document.getElementById("title-error");
const taskPriority = document.getElementById("task-priority");
const taskDueDate = document.getElementById("task-due-date");
const taskDescription = document.getElementById("task-description");
const tasksTodo = document.getElementById("tasks-todo");
const taskForm = document.getElementById("task-form");
const tasksProgress = document.getElementById("tasks-in-progress");
const tasksCompleted = document.getElementById("tasks-completed");
const todoCountElement = document.getElementById("todo-count");
const progressCountElement = document.getElementById("progress-count");
const completedCountElement = document.getElementById("completed-count");
let data = [];
// open and close
addTask.addEventListener("click", function () {
    modalTask.classList.remove("hidden");
});
closeModal.addEventListener("click", function () {
    modalTask.classList.add("hidden");
    taskForm.reset();
});
cancelModal.addEventListener("click", function () {
    modalTask.classList.add("hidden");
    taskForm.reset();
});
function checkInput() {
    const title = taskTitle.value.trim();
    if (title === "") {
        titleError.classList.remove("hidden");
        return false;
    }
    if (title.length < 3) {
        titleError.textContent = "Title must be at least 3 characters";
        titleError.classList.remove("hidden");
        return false;
    }
    titleError.classList.add("hidden");
    return true;
}
// submit
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (checkInput() === false) {
        return;
    }
    const task = {
        title: taskTitle.value,
        priority: taskPriority.value,
        dueDate: taskDueDate.value,
        description: taskDescription.value,
        createdAt: new Date().toISOString(),
        status: "todo",
        id: Date.now()
    };
    data.push(task);
    console.log(data);
    localStorage.setItem("tasks", JSON.stringify(data));
    displayData();
    taskForm.reset();
    modalTask.classList.add("hidden");
    Swal.fire({
        position: "top-end",
        title: "Task added successfully!",
        showConfirmButton: false,
        timer: 1500,
        width: "400px",
        padding: "3px",
        color: "#fff",
        background: "#10b981"
    });
});
// display
function displayData() {
    let todoCartoona = "";
    let progressCartoona = "";
    let completedCartoona = "";
    let todoCount = 0;
    let progressCount = 0;
    let completedCount = 0;
    for (let i = 0; i < data.length; i++) {
        const task = data[i];
        let priorityBadge = "";
        if (task.priority === "low") {
            priorityBadge = `
        <span class="bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Low
          </span>
    `;
        }
        else if (task.priority === "medium") {
            priorityBadge = `
        <span class="bg-amber-50 text-amber-600 text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Medium
          </span>
    `;
        }
        else if (task.priority === "high") {
            priorityBadge = `
        <span class="bg-red-50 text-red-700 text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
            <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            High Priority
          </span>
    `;
        }
        if (task.status === "todo") {
            todoCount++;
            todoCartoona +=
                `<div class="group bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200  " data-task-id="task-1783214784803-b4ty0s5">
        <!-- Top Bar -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-slate-300"></span>
            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">#00${i + 1}</span>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="edit-btn text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="${task.id}" title="Edit task">
              <i class="fa-solid fa-pen text-xs pointer-events-none"></i>
            </button>
            <button class="delete-btn text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="${task.id}" title="Delete task">
              <i class="fa-solid fa-trash-can text-xs pointer-events-none"></i>
            </button>
          </div>
        </div>
        <!-- Title -->
        <h3 class="font-semibold text-slate-800 mb-2 leading-snug ">
          ${task.title}
        </h3>
        <!-- Description -->
        <p class="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
          ${task.description}
        </p>
        <!-- Tags Row -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <!-- Priority Badge -->
          ${priorityBadge}
        </div>
        <!-- Meta Info -->
        <div class="flex items-center gap-3 text-xs text-slate-400 pb-3 mb-3 border-b border-slate-100">         
          <div class="flex items-center gap-1.5" title="Created 7/5/2026, 4:26:24 AM">
            <i class="fa-regular fa-clock"></i>
            <span>${getRelativeTime(task.createdAt)}</span>
          </div>
        </div>
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2">
        <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-amber-100 text-amber-700 hover:bg-amber-200" data-task-id="${task.id}" data-status="in-progress">
          <i class="fa-solid fa-play pointer-events-none"></i> <span class="pointer-events-none">Start</span>
        </button>
        <button class="complete-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-emerald-100 text-emerald-700 hover:bg-emerald-200" data-task-id="${task.id}" data-status="completed">
          <i class="fa-solid fa-check pointer-events-none"></i> <span class="pointer-events-none">Complete</span>
        </button>
        </div>
      </div>`;
        }
        if (task.status === "progress") {
            progressCount++;
            progressCartoona +=
                `<div class="group bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200  " data-task-id="${task.id}">
        <!-- Top Bar -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">#00${i + 1}</span>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="edit-btn text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="${task.id}" title="Edit task">
              <i class="fa-solid fa-pen text-xs pointer-events-none"></i>
            </button>
            <button class="delete-btn text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="${task.id}" title="Delete task">
              <i class="fa-solid fa-trash-can text-xs pointer-events-none"></i>
            </button>
          </div>
        </div>
        <!-- Title -->
        <h3 class="font-semibold text-slate-800 mb-2 leading-snug ">
          ${task.title}
        </h3>
        <!-- Description -->
          <p class="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
            ${task.description}
          </p>
        <!-- Tags Row -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <!-- Priority Badge -->
          ${priorityBadge}
        </div>
        <!-- Meta Info -->
        <div class="flex items-center gap-3 text-xs text-slate-400 pb-3 mb-3 border-b border-slate-100">
          <div class="flex items-center gap-1.5" title="Created 7/7/2026, 1:55:21 AM">
            <i class="fa-regular fa-clock"></i>
            <span>${getRelativeTime(task.createdAt)}</span>
          </div>
        </div>  
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2">
        <button class="todo-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-700" data-task-id="${task.id}" data-status="todo">
          <i class="fa-solid fa-arrow-rotate-left pointer-events-none"></i> <span class="pointer-events-none">To Do</span>
        </button>
        <button class="complete-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-emerald-100 text-emerald-700 hover:bg-emerald-200" data-task-id="${task.id}" data-status="completed">
          <i class="fa-solid fa-check pointer-events-none"></i> <span class="pointer-events-none">Complete</span>
        </button>
        </div>
      </div>`;
        }
        if (task.status === "completed") {
            completedCount++;
            completedCartoona +=
                `<div class="group bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200  opacity-75" data-task-id="${task.id}">
        <!-- Top Bar -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">#00${i + 1}</span>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="edit-btn text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="${task.id}" title="Edit task">
              <i class="fa-solid fa-pen text-xs pointer-events-none"></i>
            </button>
            <button class="delete-btn text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="${task.id}" title="Delete task">
              <i class="fa-solid fa-trash-can text-xs pointer-events-none"></i>
            </button>
          </div>
        </div>
        <!-- Title -->
        <h3 class="font-semibold text-slate-800 mb-2 leading-snug line-through text-slate-500">
          ${task.title}
        </h3>
        <!-- Description -->
        <p class="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
          ${task.description}
        </p>
        <!-- Tags Row -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <!-- Priority Badge -->
          ${priorityBadge}
            <span class="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
              <i class="fa-solid fa-check"></i>
              Done
            </span>
        </div>
        <!-- Meta Info -->
        <div class="flex items-center gap-3 text-xs text-slate-400 pb-3 mb-3 border-b border-slate-100">
          
          <div class="flex items-center gap-1.5" title="Created 7/7/2026, 7:01:11 AM">
            <i class="fa-regular fa-clock"></i>
            <span>${getRelativeTime(task.createdAt)}</span>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2">
          
        <button class="todo-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-700" data-task-id="${task.id}" data-status="todo">
          <i class="fa-solid fa-arrow-rotate-left pointer-events-none"></i> <span class="pointer-events-none">To Do</span>
        </button>
      
        <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-amber-100 text-amber-700 hover:bg-amber-200" data-task-id="${task.id}" data-status="in-progress">
          <i class="fa-solid fa-play pointer-events-none"></i> <span class="pointer-events-none">Start</span>
        </button>
      
        </div>
      </div>`;
        }
    }
    todoCountElement.textContent = `${todoCount} tasks`;
    progressCountElement.textContent = `${progressCount} tasks`;
    completedCountElement.textContent = `${completedCount} tasks`;
    // emptyMessage
    function emptyMessage() {
        return `
  <div class="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 -mr-1">
        <div class="flex flex-col items-center justify-center py-12 text-slate-400">
        <i class="fa-regular fa-folder-open text-4xl mb-3 opacity-50"></i>
        <p class="text-sm">No tasks yet</p>
        <p class="text-xs mt-1">Click + to add one</p>
        </div>
    </div>
  `;
    }
    if (todoCartoona === "") {
        todoCartoona = emptyMessage();
    }
    if (progressCartoona === "") {
        progressCartoona = emptyMessage();
    }
    if (completedCartoona === "") {
        completedCartoona = emptyMessage();
    }
    tasksTodo.innerHTML = todoCartoona;
    tasksProgress.innerHTML = progressCartoona;
    tasksCompleted.innerHTML = completedCartoona;
    // delete
    const deleteBtns = document.querySelectorAll(".delete-btn");
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener("click", function () {
            const id = Number(deleteBtns[i].getAttribute("data-task-id"));
            Swal.fire({
                title: "Are you sure?",
                text: "Delete this task? You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    for (let index = 0; index < data.length; index++) {
                        if (data[index].id === id) {
                            data.splice(index, 1);
                            localStorage.setItem("tasks", JSON.stringify(data));
                            displayData();
                            break;
                        }
                    }
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your task has been deleted.",
                        icon: "success"
                    });
                }
            });
        });
    }
    // edit
    let editId = null;
    const editBtn = document.querySelectorAll(".edit-btn");
    const submitttBtn = document.getElementById("submittt-btn");
    const submitBtn = document.getElementById("submit-btn");
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", function () {
            const id = Number(editBtn[i].getAttribute("data-task-id"));
            for (let index = 0; index < data.length; index++) {
                if (data[index].id === id) {
                    editId = id;
                    taskTitle.value = data[index].title;
                    taskPriority.value = data[index].priority;
                    taskDueDate.value = data[index].dueDate;
                    taskDescription.value = data[index].description;
                    modalTask.classList.remove("hidden");
                    submitBtn.classList.add("hidden");
                    submitttBtn.classList.remove("hidden");
                }
            }
        });
    }
    submitttBtn.addEventListener("click", function () {
        if (editId !== null) {
            for (let index = 0; index < data.length; index++) {
                if (data[index].id === editId) {
                    data[index].title = taskTitle.value;
                    data[index].priority = taskPriority.value;
                    data[index].dueDate = taskDueDate.value;
                    data[index].description = taskDescription.value;
                    localStorage.setItem("tasks", JSON.stringify(data));
                    displayData();
                    editId = null;
                    taskForm.reset();
                    submitttBtn.classList.add("hidden");
                    submitBtn.classList.remove("hidden");
                    modalTask.classList.add("hidden");
                }
            }
        }
    });
    // taskForm.reset();
    const startBtns = document.querySelectorAll(".status-btn");
    for (let i = 0; i < startBtns.length; i++) {
        startBtns[i].addEventListener("click", function () {
            const id = Number(startBtns[i].getAttribute("data-task-id"));
            for (let index = 0; index < data.length; index++) {
                if (data[index].id === id) {
                    data[index].status = "progress";
                    localStorage.setItem("tasks", JSON.stringify(data));
                    displayData();
                }
            }
            // const id = startBtns[i]!.getAttribute("data-task-id");
            // console.log(id);
            // console.log(typeof id);
            // console.log(data);
            // console.log(data[i]);
        });
    }
    const completeBtns = document.querySelectorAll(".complete-btn");
    for (let i = 0; i < completeBtns.length; i++) {
        completeBtns[i].addEventListener("click", function () {
            const id = Number(completeBtns[i].getAttribute("data-task-id"));
            for (let index = 0; index < data.length; index++) {
                if (data[index].id === id) {
                    data[index].status = "completed";
                    localStorage.setItem("tasks", JSON.stringify(data));
                    displayData();
                }
            }
        });
    }
    const todoBtns = document.querySelectorAll(".todo-btn");
    for (let i = 0; i < todoBtns.length; i++) {
        todoBtns[i].addEventListener("click", function () {
            const id = Number(todoBtns[i].getAttribute("data-task-id"));
            for (let index = 0; index < data.length; index++) {
                if (data[index].id === id) {
                    data[index].status = "todo";
                    localStorage.setItem("tasks", JSON.stringify(data));
                    displayData();
                }
            }
        });
    }
}
// localStorage
const storedData = localStorage.getItem("tasks");
if (storedData) {
    data = JSON.parse(storedData);
}
displayData();
// keydown
taskForm.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        taskForm.requestSubmit();
    }
});
// RelativeTime
function getRelativeTime(dateString) {
    const now = Date.now();
    const created = new Date(dateString).getTime();
    const diff = now - created;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (seconds < 60)
        return "Just now";
    if (minutes < 60)
        return `${minutes}m ago`;
    if (hours < 24)
        return `${hours}h${hours > 1 ? "s" : ""} ago`;
    if (days < 7)
        return `${days}d${days > 1 ? "s" : ""} ago`;
    return new Date(dateString).toLocaleDateString();
}
export {};
// ${getRelativeTime(task.createdAt)}
// createdAt: string;
// createdAt: new Date().toISOString()
// const titleError = document.getElementById("title-error") as HTMLElement;
// const taskTitle = document.getElementById("task-title") as HTMLInputElement;
// function checkInput(): boolean{
//   if(taskTitle.value.trim() === ""){
//     titleError.classList.remove("hidden")
//     return false;
//   }
//   titleError.classList.add("hidden");
//     return true;
// }
// if (checkInput()) {
//   const newTask = {
//     title: taskTitle.value,
//   };
//   data.push(newTask);
//   displayData();
//   taskTitle.value = "";
// }
// function checkInput(input: HTMLInputElement | HTMLSelectElement, errorElement: HTMLElement) {
//     if (input.value.trim() === "") {
//         errorElement.classList.remove("hidden");
//         return false;
//     } else {
//         errorElement.classList.add("hidden");
//         return true;
//     }
// }
// taskForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const isTitleValid = checkInput(taskTitle, titleError);
//     const isPriorityValid = checkInput(taskPriority, priorityError);
//     const isDateValid = checkInput(taskDueDate, dateError);
//     if (!isTitleValid || !isPriorityValid || !isDateValid) {
//         return;
//     }
//     const task = {
//         title: taskTitle.value,
//         priority: taskPriority.value,
//         dueDate: taskDueDate.value,
//         description: taskDescription.value
//     };
//     data.push(task);
//     displayData();
//     taskForm.reset(); // يفضي الفورم
//     modalTask.classList.add("hidden"); // يقفل الـ Modal
// });
//# sourceMappingURL=main.js.map