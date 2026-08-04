<template>
  <li
    class="task-item"
    :class="{
      'task-item--completed': task.completed,
      'task-item--high': task.priority === 'High'
    }"
  >
    <!--
      Zadatak 5. Prikazivanje informacija o zadatku u strukturiranom obliku.
      Svaki zadatak ima:
      - naslov
      - prioritet (sa klasom koja omogućava stilizaciju)
      - status (Completed/Not completed)
    -->
    <div class="task-item__info">
      <span class="task-item__title">{{ task.title }}</span>
      <!-- Zadatak 11. Uslovni prikaz: dodaje klasu na osnovu prioriteta -->
      <span
        class="task-item__priority"
        :class="'priority--' + task.priority.toLowerCase()"
      >
        {{ task.priority }}
      </span>
      <span class="task-item__status">
        {{ task.completed ? "Completed" : "Not completed" }}
      </span>
    </div>

    <!--
      Zadatak 5. Prikazivanje akcija (dugmad) za zadatak:
      - dugme za označavanje kao završenog (Complete/Done)
      - dugme za brisanje (Delete)
      -->
    <div class="task-item__actions">
      <!--
        Zadatak 9. Dugme "Complete" omogućava označavanje zadatka kao završenog.
        - Klik na dugme emitira događaj 'complete' sa id-jem zadatka.
        - Dugme je onemogućeno ako je zadatak već završen.
      -->
      <button
        class="btn btn--complete"
        :disabled="task.completed"
        @click="$emit('complete', task.id)"
      >
        {{ task.completed ? "Done" : "Complete" }}
      </button>

      <!--
        Zadatak 10. Dugme "Delete" omogućava brisanje zadatka.
        - Klik na dugme emitira događaj 'delete' sa id-jem zadatka.
      -->
      <button
        class="btn btn--delete"
        @click="$emit('delete', task.id)"
      >
        Delete
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "TaskItem",
  // Zadatak 13. Prosleđivanje podataka iz roditeljske komponente pomoću propsa.
  props: {
    task: {
      type: Object,
      required: true // Zadatak mora biti proslijeđen.
    }
  }
};
</script>
