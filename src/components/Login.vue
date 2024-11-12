
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

  //Handle the login request
  methods: {
    handleLogin(payload) {
        const path = process.env.VUE_APP_ROOT_URL + "/users/login";
        axios.post(path, payload)
            .then((response) => {
                //If the user is an admin, redirect to the admin page
                if (response.data.is_admin) this.$router.push("/admin/" + response.data.id);
                else this.$router.push("/users/" + response.data.id);
            })
            .catch((error) => {
                console.log(error);
                this.errorMessage =  "Login failed. Check your credentials.";
            });
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
