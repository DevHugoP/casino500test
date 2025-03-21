<template>
  <div id="app">
    <div class="container">
      <h1>My Todo List</h1>
      <img src="assets/logo.png" alt="logo" />
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
      // Initialize Socket.IO connection
      this.socket = io(process.env.VUE_APP_SOCKET_URL);

      // Listen for new tasks
      this.socket.on("newTask", (task) => {
        this.tasks.unshift(task);
      });

      // Load tasks from API
      this.fetchTasks();
    },
    beforeDestroy() {
      // Close Socket.IO connection
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
          console.error("Error loading tasks:", error);
        }
      },
      handleTaskAdded(task) {
        // Add task to local list
        this.tasks.unshift(task);

        // Emit event to all other clients
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
