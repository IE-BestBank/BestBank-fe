<template>
    <div class="container">
        <div class="content">
            <h2>Login</h2>
            <form class="form-container" @submit.prevent="handleLogin">
                <div>
                    <label for="username">Username:</label>
                    <input type="text" v-model="username" id="username" required />
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" v-model="password" id="password" required />
                </div>
                <div class="button-container">
                    <button type="submit">Login</button>
                </div>
            </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post(process.env.VUE_APP_ROOT_URL + "/login", {
          username: this.username,
          password: this.password
        });

        // Handle successful login
        if (response.data.success) {

          this.$router.push("/accounts");
        } else {
          // Display error message
          this.errorMessage = response.data.message || "Login failed.";
        }
      } catch (error) {
        this.errorMessage = "An error occurred. Please try again.";
      }
    }
  }
};
</script>



<style scoped>


.container {
    color: white;
    font-family: sans-serif;
    max-width: 100%;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.content {
    width: 30rem;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #0097dc;
}

.container h1 {
    margin-bottom: 1rem;
    font-weight: bold;
    font-style: italic;
}

.form-container div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0;
}
.form-container label {
    margin-right: 1rem;
}

.button-container {
    width: 100%;
}


button {
    margin-left: auto;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #00338d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
}

</style>
