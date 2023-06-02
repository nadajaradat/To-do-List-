const readline = require('readline');

class Task {
    constructor(description, dueDate, priority) {
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
/*newTask(description, dueDate, priority) {
        return new Task(description, dueDate, priority);
    }
    toString() {
        return this.description + ' ' + this.dueDate + ' ' + this.priority + ' ' + this.completed;
    }
    isCompleted() {
        this.completed = true;
    }*/
};

Task.prototype.newTask = (description, dueDate, priority) => {
    return new Task(description, dueDate, priority);
};

Task.prototype.toString = function() {
    return this.description + ' ' + this.dueDate + ' ' + this.priority + ' ' + this.completed;
};

Task.prototype.markAsDone = function () {
    this.completed = true;
}

class TaskManager {
    constructor() {
      this.tasks = [];
    }

    addTask(description, dueDate, priority) {
        //When a user adds a new task, create a new Task object and add it to the array.
        const task = new Task(description, dueDate, priority);
        this.tasks.push(task);
    }

    listAllTasks() {
        console.log("All tasks:");
        this.tasks.forEach((task, index) => {
          console.log(`${index + 1}. ${task.toString()}`);
        });
      }
    
    listCompletedTasks() {
        //- When a user marks a task as completed, use filter() to find the task in the array and update its status.
        const completedTasks = this.tasks.filter(task => task.completed);
        console.log("Completed tasks:");
        this.completedTasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.description}`);
        });
      }
    
    markTaskAsDone(taskIndex) {
        const task = this.tasks[taskIndex - 1];
        if (task) {
          task.markAsDone();
          console.log(`Task "${task.description}" marked as done.`);
        } else {
          console.log("Invalid task index.");
        }
      }
    
    deleteTask(taskIndex) {
        if (taskIndex >= 1 && taskIndex <= this.tasks.length) {
          const deletedTask = this.tasks.splice(taskIndex - 1, 1);
          console.log(`Task "${deletedTask[0].description}" deleted.`);
        } else {
          console.log("Invalid task index.");
        }
      }
    
    sortByDueDate() {
        this.tasks.sort((task1, task2) => task1.dueDate - task2.dueDate);
        console.log("Tasks sorted by due date.");
      }
    
    sortByPriority() {
        this.tasks.sort((task1, task2) => task2.priority - task1.priority);
        console.log("Tasks sorted by priority.");
      }
    
    clearAllTasks() {
        this.tasks = [];
        console.log("All tasks cleared.");
      }
}


// example
const taskManager = new TaskManager();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
function displayMenu() {
  console.log(`
***************************
Select an action:
1) Add a new task
2) List all tasks
3) List completed tasks
4) Mark a task as done
5) Delete a task
6) Sort tasks by the due date
7) Sort tasks by priority
8) Clear all tasks
***************************`);
}
function handleUserInput(userInput) {
    switch (userInput) {
      case "1":
        rl.question("Enter task description: ", (description) => {
          rl.question("Enter due date (YYYY-MM-DD): ", (dueDate) => {
            rl.question("Enter priority (1-5): ", (priority) => {
              taskManager.addTask(description, dueDate, parseInt(priority));
              console.log("Task added.");
              displayMenu();
              rl.prompt();
            });
          });
        });
        break;
      case "2":
        taskManager.listAllTasks();
        displayMenu();
        rl.prompt();
        break;
      case "3":
        taskManager.listCompletedTasks();
        displayMenu();
        rl.prompt();
        break;
      case "4":
        rl.question("Enter task index to mark as done: ", (taskIndex) => {
          taskManager.markTaskAsDone(parseInt(taskIndex));
          displayMenu();
          rl.prompt();
        });
        break;
      case "5":
        rl.question("Enter task index to delete: ", (taskIndex) => {
          taskManager.deleteTask(parseInt(taskIndex));
          displayMenu();
          rl.prompt();
        });
        break;
      case "6":
        taskManager.sortByDueDate();
        displayMenu();
        rl.prompt();
        break;
      case "7":
        taskManager.sortByPriority();
        displayMenu();
        rl.prompt();
        break;
      case "8":
        taskManager.clearAllTasks();
        displayMenu();
        rl.prompt();
        break;
      default:
        console.log("Invalid option.");
        displayMenu();
        rl.prompt();
    }
  }
  
  // Start the program
  displayMenu();
  rl.prompt();
  
  rl.on('line', (input) => {
    handleUserInput(input.trim());
  }).on('close', () => {
    console.log("Exiting task manager.");
    process.exit(0);
  });
