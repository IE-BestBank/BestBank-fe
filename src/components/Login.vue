<template>
    <div class="container">
        <div class="auth-container">
            <h2>Login</h2>
            <form class="auth-form-container" @submit.prevent="onSubmit">
                <div>
                    <label for="username">Username:</label>
                    <input type="text" v-model="username" id="username" required />
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" v-model="password" id="password" required />
                </div>
                <div class="">
                    <button class="primary-btn" type="submit">Login</button>
                </div>
            </form>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <router-link to="/register" class="link-button">If you do not have an account, register here.</router-link>
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
    handleLogin(payload) {
        const path = process.env.VUE_APP_ROOT_URL + "/user/login";
        axios.post(path, payload)
            .then((response) => {
                console.log(response);
                this.$router.push("/accounts");
            })
            .catch((error) => {
                console.log(error);
                this.errorMessage =  "Login failed. Check your credentials.";
            });

        // Handle successful login
        if (response.data.success) {
          this.$router.push("/accounts");
        } else {
          // Display error message
          this.errorMessage = response.data.message || "Login failed.";
        }
    },
    onSubmit() {
        const payload = {
            username: this.username,
            password: this.password
        }

        this.handleLogin(payload);
    }
  }
};
</script>



<style scoped>


.container {
    font-family: sans-serif;
    max-width: 100%;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}


.container h1 {
    margin-bottom: 1rem;
    font-weight: bold;
    font-style: italic;
}

.button-container {
    width: 100%;
}

.link-button {
    margin-top: 2rem;
    color: gray;
}



</style>
