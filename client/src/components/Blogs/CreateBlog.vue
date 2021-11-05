<template>
  <div>
  <div class="latest-products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-heading">
              <h2>จองโต๊ะ</h2>
            </div>

            <form v-on:submit.prevent="createBlog">
               <div class="form-row">
                <div class="form-group col-md-6">
                  <label >ชื่อคนจอง</label>
                  <input type="text" v-model="blog.name" class="form-control" placeholder="Enter your name" required/>
                </div>
                <div class="form-group col-md-6">
                  <label >เบอร์โทร</label>
                  <input type="tel" v-model="blog.tel" class="form-control" placeholder="Enter your phone number" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required/>
                   <small class="form-text text-muted">โปรดใส่เบอร์โทรของท่าน</small>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label >วันที่</label>
                  <input type="date" v-model="blog.datebook" class="form-control" required>

              </div>    

              <div class="form-group col-md-6">
                  <label >เวลา</label>
                  <input type="time" v-model="blog.timebook" class="form-control" required>

                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label >จำนวนคน</label>
                  <input type="text" v-model="blog.nump" class="form-control" placeholder="Enter your number" required/>
              </div>       
              <div class="form-group col-md-6">
                  <label >เวลาที่ต้องการจอง</label>
                  <input type="time" v-model="blog.time" class="form-control" required/>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label >แพ็คเกต</label>
                  <select required class="form-control" v-model="blog.packet">
                    <option> Original 299฿ (+น้ำ refill 39฿)</option>
                    <option> Premium 439฿</option>
                    <option>Geisha 539฿</option>
                  </select>
                  <small class="form-text text-muted">กดเลือกแพคเกจราคาที่ท่านต้องการ</small>
                </div>
                <div class="form-group col-md-6">
                  <label>หมายเลขโต๊ะ</label>
                  <select required class="form-control" v-model="blog.tableno">
                    <option> 1 </option>
                    <option> 2 </option>
                    <option> 3 </option>
                    <option> 4 </option>
                    <option> 5 </option>
                    <option> 6 </option>
                    <option> 7 </option>
                    <option> 8 </option>
                    <option> 9 </option>
                    <option> 10 </option>
                  </select>
                   <small class="form-text text-muted">กดเลือกโต๊ะที่ท่านต้องการ</small>
                </div>
              </div>

              <br>
              <p>
               <button class="btn btn-success">บันทึก</button>
               <router-link
                  :to="{ name: 'tables' }"
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
import BlogService from "@/services/BlogsService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "@/services/UploadService";
import App from "../../App.vue";



export default {
  data() {
    return {
      blog: {
        
      },
      config: {
        height: 300
      }
    };
  },
  methods: {
    async createBlog() {
      this.blog.pictures = JSON.stringify(this.pictures); //update ค่าของ blogs.pictrues
      try {
        await BlogService.post(this.blog);
        this.$router.push({
          name: "blogs"
        });
      } catch (err) {
        console.log(err);
      }
    },
    onBlur(editor) {
      console.log(editor);
    },
    onfocus(editor) {
      console.log(editor);
    },
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return x => {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
      };
    },
    reset() {
      //reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      //this.uploadedFiles = []
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    async save(formData) {
      //upload data to the server
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        // update image uploaded display
        let pictureJSON = [];
        this.uploadedFileNames.forEach(uploadFilename => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }

          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename
            };
            this.pictures.push(pictureJSON);
          }
        });

        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(filedName, fileList) {
      //handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      //append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(filedName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });

      //save it
      this.save(formData);
    },
    clearUploadResult: function() {
      setTimeout(() => this.reset(), 5000);
    },

    //เรียกใช้ v-0n:cick.prevent ส่ง picture ไปลบ
    async delFile(material) {
      let result = confirm("Want to delete?");
      if (result) {
        let dataJSON = {
          filename: material.name
        };

        await UploadService.delete(dataJSON);

        for (var i = 0; i < this.pictures.length; i++) {
          if (this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1);
            this.materialIndex--;
            break;
          }
        }
      }
    },

    /* thumbnail */
    useThumbnail(filename) {
      console.log(filename);
      this.blog.thumbnail = filename;
    }
  },

  created() {
    this.reset();
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    issaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  components: {
    VueCkeditor
  }
};
</script>
<style scoped>
.dropbox {
  outline: 2px dashed gray; /* the dash box */
  outline-offset: -10px;
  background: #fec3df;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: #fceebe;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.pictures li {
  float: left;
}
ul.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.clearfix {
  clear: both;
}
/* thumbnail */
.thumbnail-pic img {
  width: 200px;
}

input,select {
      width: 450px;
    }

</style>
