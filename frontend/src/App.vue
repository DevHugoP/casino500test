<template>
  <div id="app">
    <div class="container">
      <h1>My Todo List</h1>
      <div class="logo-container">
        <img
          :src="require('@/assets/logo.png')"
          alt="logo"
          class="centered-logo" />
      </div>
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
      this.socket = io(process.env.VUE_APP_SOCKET_URL);

      this.socket.on("newTask", (task) => {
        this.tasks.unshift(task);
      });

      this.fetchTasks();
    },
    beforeDestroy() {
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
        this.tasks.unshift(task);

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

  .logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .centered-logo {
    max-width: 100px;
    height: auto;
  }
</style>
