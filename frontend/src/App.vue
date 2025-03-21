<template>
  <div id="app">
    <div class="container">
      <h1>Ma Todo List</h1>
      <TaskForm @task-added="handleTaskAdded" />
      <TaskList :tasks="tasks" />
    </div>
  </div>
</template>

<script>
  import TaskForm from "./components/TaskForm.vue";
  import TaskList from "./components/TaskList.vue";
  import axios from "axios";
  import io from "socket.io-client";

  export default {
    name: "App",
    components: {
      TaskForm,
      TaskList,
    },
    data() {
      return {
        tasks: [],
        socket: null,
      };
    },
    created() {
      // Initialiser la connexion Socket.IO
      this.socket = io(process.env.VUE_APP_SOCKET_URL);

      // Écouter les nouvelles tâches
      this.socket.on("newTask", (task) => {
        this.tasks.unshift(task);
      });

      // Charger les tâches depuis l'API
      this.fetchTasks();
    },
    beforeDestroy() {
      // Fermer la connexion Socket.IO
      if (this.socket) {
        this.socket.disconnect();
      }
    },
    methods: {
      async fetchTasks() {
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URL}/tasks`
          );
          this.tasks = response.data;
        } catch (error) {
          console.error("Erreur lors du chargement des tâches:", error);
        }
      },
      handleTaskAdded(task) {
        // Ajouter la tâche à la liste locale
        this.tasks.unshift(task);

        // Émettre l'événement à tous les autres clients
        this.socket.emit("taskAdded", task);
      },
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 15px;
  }

  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
</style>
