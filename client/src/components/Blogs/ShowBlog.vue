<template>
  <div>
    <div class="latest-products">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-heading">
                        <h2>รายละเอียดการจอง {{ blog.id}}</h2>
                    </div>

                    <p>ชื่อคนจอง: {{ blog.name }}</p>
                    <p>เบอร์โทร: {{ blog.tel }}</p>
                    <p>วันที่จอง: {{ blog.datebook }}</p>
                    <p>เวลาที่จอง: {{ blog.timebook }}</p>
                    <p>จำนวนคน: {{ blog.nump }}</p>
                    <p>หมายเลขโต๊ะ: {{ blog.tableno }}</p>
                    <p>แพ็คเกจราคา: {{ blog.packet }}</p>
                    <p>เวลาที่ต้องการ: {{ blog.time }}</p>

                    <br>

                    <p>
                      <button v-on:click="navigateTo('/blog/edit/' + blog.id)" class="btn btn-info">แก้ไข</button>
                      <button v-on:click="navigateTo('/blogs')" class="btn btn-secondary">ย้อนกลับ</button>
                    </p>

                </div>
                
            </div>
        </div>
    </div>  

    <div class="services">
        <div class="container">
            <div class="row">

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
import BlogService from "@/services/BlogsService";
export default {
  data() {
    return {
      blog: null,
    };
  },
  async created() {
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogService.show(blogId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>
</style>