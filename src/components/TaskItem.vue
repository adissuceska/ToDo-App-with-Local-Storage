<template>
  <li
    class="task-item"
    :class="{
      'task-item--completed': task.completed,
      'task-item--high': task.priority === 'High'
    }"
  >
    <div class="task-item__info">
      <span class="task-item__title">{{ task.title }}</span>
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

    <div class="task-item__actions">
      <button
        class="btn btn--complete"
        :disabled="task.completed"
        @click="$emit('complete', task.id)"
      >
        {{ task.completed ? "Done" : "Complete" }}
      </button>

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
  props: {
    task: {
      type: Object,
      required: true
    }
  }
};
</script>
