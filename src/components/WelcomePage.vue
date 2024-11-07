<template>
    <div class="welcome-container">
        <h1>Welcome to IE Bank Corp!</h1>
        <p>Your favorite bank account management system.</p>
        <div class="links">
            <router-link to="/accounts" class="link-button">Accounts</router-link>
            <router-link to="/skull" class="link-button">Skull</router-link>
            <router-link to="/login" class="link-button">Login</router-link>
        </div>
    </div>
</template>


<script>
export default {
    name: "WelcomePage",
}

</script>


<style scoped>
.welcome-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
}
h1 {
    font-size: 3rem;
}
p {
    color: #7c7c7c;
}

.links {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 0 20px;
}

</style>
