<template>
  <div class="task-form">
    <form @submit.prevent="addTask">
      <div class="form-group">
        <input
          type="text"
          v-model="title"
          placeholder="Ajouter une nouvelle tâche..."
          required
          class="form-control" />
        <button type="submit" class="btn">Ajouter</button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "TaskForm",
    data() {
      return {
        title: "",
      };
    },
    methods: {
      async addTask() {
        try {
          // Vérifier si le titre n'est pas vide
          if (!this.title.trim()) return;

          // Envoyer la requête POST
          const response = await axios.post(
            `${process.env.VUE_APP_API_URL}/tasks`,
            {
              title: this.title,
            }
          );

          // Émettre l'événement avec la nouvelle tâche
          this.$emit("task-added", response.data);

          // Réinitialiser le formulaire
          this.title = "";
        } catch (error) {
          console.error("Erreur lors de l'ajout de la tâche:", error);
        }
      },
    },
  };
</script>

<style scoped>
  .task-form {
    margin-bottom: 30px;
  }

  .form-group {
    display: flex;
    margin-bottom: 20px;
  }

  .form-control {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
  }

  .btn {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .btn:hover {
    background-color: #3aa876;
  }
</style>
