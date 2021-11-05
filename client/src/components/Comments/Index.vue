<template>
  <div>
    <div class="latest-products">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-heading">
                        <h2>รีวิวร้าน</h2>
                        <a>จำนวนรีวิว {{ comments.length }} &nbsp;
                          <button v-on:click="navigateTo ('/comment/create')" class="btn btn-success">Create comment</button>
                        </a>
                          <br>
                    </div>
                     
                </div>
                
                <div class="col-md-4" v-for="comment in comments" v-bind:key="comment.id">
                    <div class="product-item">
                        <a> 
                          <transition name="fade"> 
                            <div class="" v-if="comment.thumbnail != 'null'">
                              <img :src="BASE_URL+comment.thumbnail" alt="thumbnail" class="pic-review">
                            </div>
                          </transition>
                        </a>
                        <div class="down-content">
                            <a href="#">
                                <h4>{{ comment.nreviwe }}</h4>
                            </a>
                            <p>{{ comment.date }}</p>
                            <p>{{ comment.content }}</p>
                            <ul class="stars">
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                            </ul>
                            <span>
                              <button v-on:click="navigateTo('/comment/edit/' + comment.id)" class="btn btn-warning">แก้ไข</button>
                              <button v-on:click="deleteComment(comment)" class="btn btn-danger">ลบข้อมูล</button>
                            </span>
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
               <p>Copyright &copy; 2020 Sixteen Clothing Co., Ltd. - Design: <a rel="nofollow noopener" href="https://templatemo.com" target="_blank">TemplateMo</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
import CommentService from "@/services/CommentsService";

export default {
  
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      comments: [],
    };
  },
  async created() {
    this.comments = (await CommentService.index()).data;
  },

  methods: {
    logout() {
      this.$store.dispatch("setTkoen", null);
      this.$store.dispatch("setComment", null);
      this.$router.push({
        name: "login",
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },

    async deleteComment(comment) {
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await CommentService.delete(comment);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.comments = (await CommentService.index()).data;
    },
  },
};
</script>
<style scoped>
</style>
