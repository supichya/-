<template>
<div>
<div class="latest-products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-heading">
              <h2>แก้ไขรีวิวที่ {{ comment.id }}</h2>
            </div>

            <form enctype="multipart/form-data" novalidate>
              <div class="dropbox">
                <input
                  type="file"
                  multiple
                  :name="uploadFieldName"
                  :disabled="isSaving"
                  @change="
                    filesChange($event.target.name, $event.target.files);
                    fileCount = $event.target.files.length;
                  "
                  accept="image/*"
                  class="input-file"
                />
                <!-- <p v-if="isInitial || isSuccess"/> -->
                <p v-if="isInitial">
                  Drag your files(s) <br />
                  here to begin or click to browse
                </p>
                <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
                <p v-if="isSuccess">Upload Successful.</p>
                <p v-if="isFailed">Upload Failed</p>
              </div>

              <div>
                <ul class="pictures">
                  <li v-for="picture in pictures" v-bind:key="picture.id">
                    <img
                      style="margin-bottom: 5px"
                      :src="BASE_URL + picture.name"
                      alt="picture image"
                    />
                    <hr>
                      <button v-on:click.prevent="delFile(picture)" class="btn btn-danger">Delete</button>
                      <button v-on:click.prevent="useThumbnail(picture.name)" class="btn btn-info">Thumbnail</button>
                  </li>
                </ul>
                <div class="clearfix"></div>
              </div>
            </form>
            <br>

      <transition name="fade"> 
            <div  v-if="comment.thumbnail != 'null'">
              <img :src="BASE_URL+comment.thumbnail" class="thumbnail-pic">
            </div>
          </transition>

          <form v-on:submit.prevent="editComment">
            <div class="form-row">
            <div class="form-group col-md-6">
              <label >ชื่อ</label>
              <input type="text" v-model="comment.nreviwe" class="form-control" placeholder="Enter your name" required/>
            </div>
            <div class="form-group col-md-6">
              <label >วันที่</label>
              <input type="date" v-model="comment.date" class="form-control" placeholder="Enter your date post" required />
            </div>
            </div>

              <label >เนื้อหา</label>
               <vue-ckeditor
                v-model.lazy="comment.content"
                :config="config"
                @blur="onBlur($event)"
                @focus="onFocus($ecent)"
              />
              <br>

             <p>
                <button class="btn btn-success">บันทึก</button>
            <router-link
                  :to="{ name: 'comments' }"
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
import VueCkeditor from "vue-ckeditor2";


import UploadService from "@/services/UploadService";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
          BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      //uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],

      pictures: [],
      pictureIndex: 0,


      comment: {
        nreviwe: "",
        date: "",
        thumbnail: "null",
        pictues: "null", 
        content: "",
      },
      config: {
        height: 300,
      },
    };
  },
  methods: {
    async editComment() {
      try {
        await CommentService.put(this.comment);
        this.$router.push({
          name: "comments",
        });
      } catch (err) {
        console.log(err);
      }
    },

    onBlur (editor) {
          console.log(editor);
       },
          onFocus (editor) {
            console.log(editor);
          },

 created () {
      this.config.toolbar = [
        {
          name: "document",
          items: [
            "Source",
            "-",
            "Save",
            "NewPage",
            "Preview",
            "Print",
            "-",
            "Templates"
          ]
        },
        {
          name: "clipboard",
          items: [
            "Cut",
            "Copy",
            "Paste",
            "PasteText",
            "PasteFrromWord",
            "-",
            "Undo",
            "Redo"
          ]
        },
        {
          name: "editing",
          items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"]
          },
        {
        name: "forms",
        items: [
          "From",
          "Checkbox",
          "TextField",
          "Textarea",
          "Select",
          "Button",
          "ImageButton",
          "HiddenField"
        ]
    },
    "/",
    {
        name: "basicstyles",
        items: [
          "Bold",
          "Itatic",
          "Underline",
          "Strike",
          "Subscript",
          "Superscript",
          "-",
          "CopyFormatting",
          "RemoveFormat"
        ]
    },
    {
      name: "paragaph",
      items: [
        "NumberedList",
        "BulletedList",
        "-",
        "Outdent",
        "Indent",
        "-",
        "Blockquote",
        "CreateDiv",
        "-",
        "JustifyLeft",
        "JustifyCenter",
        "JustifyRight",
        "JustifyBlock",
        "-",
        "BidiLtr",
        "BidiRtl",
        "Language"
      ]
    },
    { name: "Links", items: ["Link", "Unlink", "Anchor"] },
    {
      name:"insert",
      items: [
        "Image",
        "Flash",
        "Table",
        "HorizontaRule",
        "Smiley",
        "PageBreak",
        "Iframe",
        "InsertPre"
      ]
    },
    "/",
    { name: "styles", items: ["Styles", "Format", "Font", "FontSize"]},
    { name: "colors", items: ["TextColor", "BGColor"]},
    { name: "tools", items: ["Maximize", "ShowBlocks"]},
    { name: "about", items: ["About"]}

      ]
    },
    
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
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
        this.uploadedFileNames.forEach((uploadFilename) => {
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
              name: uploadFilename,
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
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(filedName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });

      //save it
      this.save(formData);
    },
    clearUploadResult: function () {
      setTimeout(() => this.reset(), 5000);
    },

    //เรียกใช้ v-0n:cick.prevent ส่ง picture ไปลบ 
    async delFile (material){
      let result = confirm("คุณแน่ใจนะที่จะลบรีวิวนี้?")
      if (result) {
        let dataJSON = {
          "filename":material.name
        }

        await UploadService.delete(dataJSON)

        for (var i=0; i<this.pictures.length; i++){
          if(this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1)
            this.materialIndex--
            break
          }
        }
      }
    },

    /* thumbnail */
    useThumbnail (filename) {
      console.log(filename)
      this.comment.thumbnail = filename
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
    },

  },

  
  components: {
    VueCkeditor
  },

  async created() {
    try {
      let commentId = this.$route.params.commentId;
      this.comment = (await CommentService.show(commentId)).data;


    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
    .dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}
.dropbox:hover {
  background: khaki;
}
.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
/* image display */
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
.thumbnail-pic img {
  width: 200px;
}

</style>