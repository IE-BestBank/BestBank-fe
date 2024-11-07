<template>
    <div class="container">
        <div class="auth-container">
            <h2>Register</h2>
            <form class="auth-form-container" @submit.prevent="handleLogin">
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
                    <button class="primary-btn" type="submit">Login</button>
                </div>
            </form>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <router-link to="/login" class="link-button">If you already have an account, login here.</router-link>
        </div>
  </div>
</template>



<script>
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
        async handleLogin() {
        try {
            const response = await axios.post(process.env.VUE_APP_ROOT_URL + "/register", {
                username: this.username,
                password: this.password,
                password2: this.password2
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
