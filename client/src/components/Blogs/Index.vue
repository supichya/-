<template>
  <div>
    <div class="latest-products">
      <div class="container">
        <div class="row">

          <div class="col-md-12">
            <div class="section-heading">
              <h2>จำนวนจอง {{ blogs.length }} โต๊ะ</h2>
            </div>
            </div>

          <div class="col-md-4" v-for="blog in blogs" v-bind:key="blog.id">
            <div class="service-item">
              <div class="icon">
                <p><b>ชื่อคนจอง:</b> {{ blog.name }}</p>
                <p><b>เบอร์โทร: </b>{{ blog.tel }}</p>
                <p><b>วันที่จอง:</b> {{ blog.datebook }}</p>
                <p><b>เวลาที่จอง: </b>{{ blog.timebook }}</p>
                <p><b>จำนวนคน: </b>{{ blog.nump }}</p>
                <p><b>หมายเลขโต๊ะ:</b> {{ blog.tableno }}</p>
                <p><b>แพ็คเกจราคา:</b> {{ blog.packet }}</p>
                <p><b>เวลาที่ต้องการ:</b> {{ blog.time }}</p>
                <br />
                <!-- <p>ชื่อรูป: {{ table.thumbnail }}</p> -->
              <div class="btntable">
                  <p>
                    <button v-on:click="navigateTo('blog/'+blog.id)" class="btn btn-primary">รายละเอียด</button>
                    <button v-on:click="navigateTo('/blog/edit/' + blog.id)" class="btn btn-warning">แก้ไข</button>
                    <button v-on:click="deleteBlog(blog)" class="btn btn-danger">ลบ</button>
                  </p>
                </div>
              </div>
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

    <!-- <p><button v-on:click="navigateTo('/blog/create')">จองโต๊ะ</button></p> -->
  </div>
</template>
<script>
import BlogService from "@/services/BlogsService";
export default {
  data() {
    return {
      blogs: []
    };
  },
  async created() {
    this.blogs = (await BlogService.index()).data;
  },
  methods: {
    /*   logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
    */
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await BlogService.delete(blog);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.blogs = (await BlogService.index()).data;
    }
  }
};
</script>
<style scoped></style>
