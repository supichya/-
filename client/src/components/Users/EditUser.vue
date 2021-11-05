<template>
<div>
     <div class="latest-products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-heading">
              <h2>แก้ไขผู้ใช้ {{ user.id }}</h2>
            </div>
   
    <form v-on:submit.prevent = "editUser">
        <div class="form-row">
                    <div class="form-group col-md-6">
                    <label >Name</label>
                    <input type="text" class="form-control" id="inputEmail4" placeholder="Enter your name" v-model="user.name" required>
                </div>
                <div class="form-group col-md-6">
                    <label >Lastname</label>
                    <input type="text" class="form-control" id="inputPassword4" placeholder="Enter your lastname" v-model="user.lastname" required>
                    </div>
                </div>
                <div class="form-row">
                <div class="form-group col-md-6">
                    <label >Email</label>
                    <input type="text" class="form-control" id="inputEmail4" placeholder="Enter your Email" v-model="user.email" required>
                </div>
                <div class="form-group col-md-6">
                    <label >Password</label>
                    <input type="text" class="form-control" id="inputPassword4" placeholder=" Enter your Password" v-model="user.password" required>
                </div>
                </div>
               
                <p>
                    <button type="submit" class="btn btn-success">บันทึก]</button>
                   <router-link
                  :to="{ name: 'users' }"
                  class="btn btn-secondary"
                >
                  ย้อนกลับ
                </router-link>
                </p>
                
            </form>
          </div>
        </div>
      </div>
     </div>
   
</div>
</template>

<script>
import UsersService from '@/services/UsersService'

    export default {
         data () {
            return{
            user:{
                name : '',
                lastname: '',
                email: '',
                password: '',
                status: 'active'
            }
        }
    },
    methods:{
        async editUser() {
            try {
                await UsersService.put(this.user)
                this.$router.push({
                    name: 'users'
                })
            } catch (error) {
                console.log(error)
            }
        }
    },
      async created () { 
          try {
              let userId = this.$route.params.userId
              this.user = (await UsersService.show(userId)).data
            } catch (error) {
                console.log(error)
            }

}
    }

</script>
<style scoped>


</style>
