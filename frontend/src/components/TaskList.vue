<template>
  <div class="task-list">
    <h2>Mes tâches</h2>
    <div v-if="tasks.length === 0" class="empty-list">
      Aucune tâche pour le moment. Ajoutez-en une !
    </div>
    <ul v-else>
      <li v-for="task in tasks" :key="task._id" class="task-item">
        <div class="task-title">{{ task.title }}</div>
        <div class="task-date">
          {{ formatDate(task.createdAt) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "TaskList",
    props: {
      tasks: {
        type: Array,
        required: true,
      },
    },
    methods: {
      formatDate(dateString) {
        if (!dateString) return "";

        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
  };
</script>

<style scoped>
  .task-list {
    margin-top: 20px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  .empty-list {
    text-align: center;
    color: #777;
    padding: 20px;
    font-style: italic;
    background-color: #f9f9f9;
    border-radius: 4px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  .task-item {
    padding: 15px;
    border: 1px solid #eee;
    margin-bottom: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.2s;
  }

  .task-item:hover {
    background-color: #f9f9f9;
  }

  .task-title {
    font-weight: 500;
  }

  .task-date {
    color: #777;
    font-size: 0.85rem;
  }
</style>
