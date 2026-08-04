<template>
  <div id="app">
    <h1>ToDo App</h1>

    <form class="task-form" @submit.prevent="addTask">
      <input
        v-model="newTaskTitle"
        class="task-form__input"
        type="text"
        placeholder="Enter a new task..."
      />

      <select v-model="newTaskPriority" class="task-form__select">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <button class="task-form__add" type="submit">Add task</button>
    </form>

    <div class="filters">
      <label>
        Filter by status:
        <select v-model="statusFilter">
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <label>
        Filter by priority:
        <select v-model="priorityFilter">
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>
    </div>

    <p v-show="tasks.length > 0" class="summary">
      {{ activeCount }} active &middot; {{ completedCount }} completed
    </p>

    <p v-if="tasks.length === 0" class="empty-message">No tasks available.</p>

    <ul v-else class="task-list">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @complete="completeTask"
        @delete="deleteTask"
      />
      <p v-if="filteredTasks.length === 0" class="empty-message">
        No tasks match the selected filters.
      </p>
    </ul>
  </div>
</template>

<script>
import TaskItem from "./components/TaskItem.vue";

const STORAGE_KEY = "todo-tasks";
const NEXT_ID_KEY = "todo-next-id";

export default {
  name: "App",
  components: {
    TaskItem
  },
  data() {
    return {
      tasks: this.readTasks(),
      newTaskTitle: "",
      newTaskPriority: "Medium",
      statusFilter: "All",
      priorityFilter: "All",
      nextId: this.readNextId()
    };
  },
  computed: {
    activeCount() {
      return this.tasks.filter((t) => !t.completed).length;
    },
    completedCount() {
      return this.tasks.filter((t) => t.completed).length;
    },
    filteredTasks() {
      return this.tasks.filter((task) => {
        const statusOk =
          this.statusFilter === "All" ||
          (this.statusFilter === "Active" && !task.completed) ||
          (this.statusFilter === "Completed" && task.completed);
        const priorityOk =
          this.priorityFilter === "All" || task.priority === this.priorityFilter;
        return statusOk && priorityOk;
      });
    }
  },
  watch: {
    tasks: {
      handler() {
        this.writeTasks();
      },
      deep: true
    }
  },
  methods: {
    readTasks() {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return [];
        }
      }
      return [
        { id: 1, title: "Learn Vue basics", completed: true, priority: "High" },
        { id: 2, title: "Practice Vue directives", completed: false, priority: "Medium" },
        { id: 3, title: "Create To Do App", completed: false, priority: "Low" }
      ];
    },
    readNextId() {
      const stored = localStorage.getItem(NEXT_ID_KEY);
      return stored ? Number(stored) : 4;
    },
    writeTasks() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
      localStorage.setItem(NEXT_ID_KEY, String(this.nextId));
    },
    addTask() {
      const title = this.newTaskTitle.trim();
      if (title === "") return;

      this.tasks.push({
        id: this.nextId++,
        title,
        completed: false,
        priority: this.newTaskPriority
      });

      this.newTaskTitle = "";
      this.newTaskPriority = "Medium";
    },
    completeTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.completed = true;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    }
  }
};
</script>
