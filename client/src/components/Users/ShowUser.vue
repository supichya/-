<template>
<div>
    <div class="latest-products">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-heading">
                        <h2>รายละเอียดผู้ใช้ {{ user.id}}</h2>
                    </div>
                    <p>id : {{ user.id }}</p>
                    <p>ชื่อ-นามสกุล : {{ user.name }} - {{ user.lastname }}</p>
                    <p>email : {{ user.email }}</p>
                    <p>password : {{ user.password}}</p>
                    <br>
                    <p>
                        <button v-on:click="navigateTo('/user/edit/' + user.id)" class="btn btn-info">แก้ไข</button>
                       <router-link
                  :to="{ name: 'users' }"
                  class="btn btn-secondary"
                >
                  ย้อนกลับ
                </router-link>
                    </p>

                </div>
            </div>
        </div>
    </div>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="inner-content">
               <p>Copyright &copy; 2020 Sixteen Clothing Co., Ltd. - Design: <a rel="nofollow noopener" href="https://templatemo.com" target="_blank">TemplateMo</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>

</div>
</template>

<script>

import UsersService from '@/services/UsersService'

    export default {
        data () {
            return {
                user: null
            }
        },
    async created (){
        try{
           let userId = this.$route.params.userId
           this.user = (await UsersService.show(userId)).data
        } catch (error){
        console.log (error)
        }
    },
    methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
    }
}

</script>
<style scoped>


</style>
