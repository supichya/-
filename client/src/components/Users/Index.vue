<template>
  <div>
    <div class="latest-products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-heading">
              <h2>ผู้ใช้งาน</h2>
              <a
                >จำนวนผู้ใช้งาน {{ users.length }} &nbsp;
                <button
                  v-on:click="navigateTo('/user/create/')"
                  class="btn btn-success"
                >
                  สร้างผู้ใช้
                </button>
              </a>
              <br />
            </div>
            <div v-for="user in users" v-bind:key="user.id">
              <!-- <p>id : {{ user.id }}</p> -->
              <p><b>ชื่อ-นามสกุล :</b> {{ user.name }} - {{ user.lastname }}</p>
              <p><b>email : </b>{{ user.email }}</p>
              <!-- <p>password : {{ user.password}}</p> -->
              <br />

              <p>
                <button
                  v-on:click="navigateTo('/user/' + user.id)"
                  class="btn btn-success"
                >
                  ดูข้อมูลผู้ใช้
                </button>
                <button
                  v-on:click="navigateTo('/user/edit/' + user.id)"
                  class="btn btn-warning"
                >
                  แก้ไขข้อมูล
                </button>
                <button v-on:click="deleteUser(user)" class="btn btn-danger">
                  ลบข้อมูล
                </button>
              </p>

              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="inner-content">
              <p>
                Copyright &copy; 2020 Sixteen Clothing Co., Ltd. - Design:
                <a
                  rel="nofollow noopener"
                  href="https://templatemo.com"
                  target="_blank"
                  >TemplateMo</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      users: []
    };
  },
  async created() {
    this.users = (await UsersService.index()).data;
    console.log(results);
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("What To Delete?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async refreshData() {
      this.users = (await UsersService.index()).data;
    }
    /*     logout (){
             this.$store.dispatch('setToken', null)
             this.$store.dispatch('setUser', null)
             
             this.$router.push({  
                 name : 'login'
             })
         }, */
  }
};
</script>
<style scoped></style>
