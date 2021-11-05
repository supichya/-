<template>
    <div>
        <header class="">
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <a class="navbar-brand" >
                        <h2>แจ่วฮ้อน <em>ชาบู</em></h2>
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <router-link :to="{name: 'tables'}" class="nav-link" >Table
                                <span class="sr-only">(current)</span>
                            </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'blogs'}" class="nav-link">Reserve</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'comments'}" class="nav-link">Review</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'users'}" class="nav-link">Users</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'login'}" class="nav-link">Sign in</router-link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" v-on:click.prevent="logout">
                                    <i class="fas fa-sign-out-alt"></i>
                                </a> 
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    </div>

</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);

      this.$router.push({
        name: "login",
      });
    },
  }
}
</script>

<style scoped>

</style>
