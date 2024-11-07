<template>
    <div class="container">
        <div class="auth-container">
            <h2>Register</h2>
            <form class="auth-form-container" @submit="onSubmit">

                <div>
                    <label for="username">Username:</label>
                    <input type="text" v-model="username" id="username" required />
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" v-model="password" id="password" required />
                </div>
                <div>
                    <label for="password2">Confirm password:</label>
                    <input type="password" v-model="password2" id="password2" required />
                </div>
                <div class="button-container">
                    <button class="primary-btn" type="submit">Register</button>
                </div>
            </form>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <router-link to="/login" class="link-button">If you already have an account, login here.</router-link>
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
            password2: "",
            errorMessage: ""
        };
    },
    methods: {
        createAccount(payload) {
            console.log(process.env.VUE_APP_ROOT_URL);
            const path = process.env.VUE_APP_ROOT_URL + "/user/register";
            axios.post(path, payload)
                .then((response) => {
                    console.log(response);
                    this.$router.push("/accounts");
                })
                .catch((error) => {
                    console.log(error);
                    this.errorMessage = response.error || "Registration failed.";
                });
        },
        onSubmit(e) {
            e.preventDefault();
            const payload = {
                username: this.username,
                password: this.password,
                password2: this.password2
            };
            this.createAccount(payload);
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
