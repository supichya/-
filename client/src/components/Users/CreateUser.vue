<template>
<div>
     <div class="latest-products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-heading">
              <h2>สร้างผู้ใช้</h2>
            </div>
   
            <form v-on:submit.prevent = "createUser">
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
                    <button type="submit" class="btn btn-success">create user</button>
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
        async createUser () {
            try {
                await UsersService.post(this.user)
                this.$router.push({
                    name: 'users'
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}

</script>
<style scoped>


</style>
