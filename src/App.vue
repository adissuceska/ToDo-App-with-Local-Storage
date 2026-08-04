<template>
  <div id="app">
    <!-- Zadatak 2. Glavna komponenta aplikacije -->
    <h1>ToDo App</h1>

    <!--
      Zadatak 6. Input polje za unos novog zadatka.
      - Koristi se v-model za povezivanje sa podatkom newTaskTitle.
      - Forma koristi @submit.prevent da spriječi ponovno učitavanje stranice.
    -->
    <form class="task-form" @submit.prevent="addTask">
      <input
        v-model="newTaskTitle"
        class="task-form__input"
        type="text"
        placeholder="Enter a new task..."
      />

      <!--
        Zadatak 7. Dropdown za izbor prioriteta.
        - Koristi se v-model za povezivanje sa podatkom newTaskPriority.
        - Mogućnosti: High, Medium, Low.
      -->
      <select v-model="newTaskPriority" class="task-form__select">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <!--
        Zadatak 8. Dugme "Add task" za dodavanje novog zadatka.
        - Klik na dugme poziva metodu addTask().
      -->
      <button class="task-form__add" type="submit">Add task</button>
    </form>

    <!--
      Zadatak 15 (opciono). Filteri za zadatke:
      - Filter po statusu (All, Active, Completed)
      - Filter po prioritetu (All, High, Medium, Low)
    -->
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

    <!--
      Zadatak 11. Prikaz broja aktivnih i završenih zadataka.
      - Koristi se v-show da se prikazuje samo ako ima zadataka.
    -->
    <p v-show="tasks.length > 0" class="summary">
      {{ activeCount }} active &middot; {{ completedCount }} completed
    </p>

    <!--
      Zadatak 11. Prikaz poruke ako nema zadataka.
      - Koristi se v-if za uslovni prikaz.
    -->
    <p v-if="tasks.length === 0" class="empty-message">No tasks available.</p>

    <!--
      Zadatak 4. Prikazivanje liste zadataka pomoću v-for.
      - Svaki zadatak se prikazuje pomoću TaskItem komponente.
      - Koristi se :key="task.id" za jedinstvenost.
      - filteredTasks je computed property koja filtrira zadatke.
    -->
    <ul v-else class="task-list">
      <!--
        Zadatak 9. Osluškuje događaj 'complete'.
        Zadatak 10. Osluškuje događaj 'delete'.
      -->
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @complete="completeTask"
        @delete="deleteTask"
      />
      <!--
        Zadatak 11. Prikaz poruke ako nijedan zadatak ne odgovara filterima.
      -->
      <p v-if="filteredTasks.length === 0" class="empty-message">
        No tasks match the selected filters.
      </p>
    </ul>
  </div>
</template>

<script>
import TaskItem from "./components/TaskItem.vue"; // Zadatak 12. Uvoz komponente TaskItem

export default {
  name: "App",
  components: {
    TaskItem // Zadatak 12. Registracija komponente
  },
  data() {
    return {
      // Zadatak 3. Početni niz zadataka sa id, title, completed i priority.
      tasks: [
        { id: 1, title: "Learn Vue basics", completed: true, priority: "High" },
        { id: 2, title: "Practice Vue directives", completed: false, priority: "Medium" },
        { id: 3, title: "Create To Do App", completed: false, priority: "Low" }
      ],
      newTaskTitle: "", // Za input polje
      newTaskPriority: "Medium", // Default prioritet
      statusFilter: "All", // Default filter po statusu
      priorityFilter: "All", // Default filter po prioritetu
      nextId: 4 // ID za novi zadatak
    };
  },
  computed: {
    // Zadatak 15 (ociono). Broj aktivnih zadataka
    activeCount() {
      return this.tasks.filter((t) => !t.completed).length;
    },
    // Zadatak 15 (opciono). Broj završenih zadataka
    completedCount() {
      return this.tasks.filter((t) => t.completed).length;
    },
    // Zadatak 15 (opciono). Filtrira zadatke na osnovu odabranih filtera
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
  methods: {
    // Zadatak 8. Dodavanje novog zadatka
    addTask() {
      const title = this.newTaskTitle.trim();
      if (title === "") return; // Ne dodaje prazan zadatak

      // Dodavanje novog zadatka u listu
      this.tasks.push({
        id: this.nextId++,
        title,
        completed: false,
        priority: this.newTaskPriority
      });

      // Praznjenje input polja i resetiranje prioriteta
      this.newTaskTitle = "";
      this.newTaskPriority = "Medium";
    },
    // Zadatak 9. Označavanje zadatka kao završenog
    completeTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.completed = true;
    },
    // Zadatak 10. Brisanje zadatka
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    }
  }
};
</script>
