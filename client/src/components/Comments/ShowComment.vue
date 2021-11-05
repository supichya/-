<template>
  <div>
    <h1>รีวิว {{ comment.id }}  </h1>

     <p>id: {{ comment.id }}</p>
      <p>ชื่อ: {{ comment.nreviwe }}</p>
      <p>วันที่: {{ comment.date }}</p>
      
      <p>ชื่อรูป: {{ comment.thumbnail }}</p>
      
      <transition name="fade"> 
        <div class="thumbnail-pic" v-if="comment.thumbnail != 'null'">
          <img :src="BASE_URL+comment.thumbnail" alt="thumbnail">
        </div>
      </transition>

      <p>เนื้อหา: {{ comment.content }}</p>

    <p>
      <button v-on:click="navigateTo('/comment/edit/' + comment.id)">
        Edit comment
      </button>
      <button v-on:click="navigateTo('/comments')">Back</button>
    </p>
  </div>
</template>

<script>
import CommentService from "@/services/CommentsService";

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      comment: null,
    };
  },
  async created() {
    try {
      let commentId = this.$route.params.commentId;
      this.comment = (await CommentService.show(commentId)).data;
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
