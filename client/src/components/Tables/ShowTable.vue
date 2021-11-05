<template>
  <div>
    <div class="latest-products">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-heading">
                        <h2>รายละเอียดโต๊ะ {{ table.id}}</h2>
                    </div>

                    <transition name="fade"> 
                      <div  v-if="table.thumbnail != 'null'">
                        <img :src="BASE_URL+table.thumbnail" class="thumbnail-pic">
                      </div>
                    </transition>
                    
                    <p>หมายเลขโต๊ะ : {{ table.tablenum }}</p>
                    <p>จำนวนที่นั่ง : {{ table.poeple }}</p>
                    <p>เตา: {{ table.stove }}</p>
                    <br>

                    <p>
                      <button v-on:click="navigateTo('/table/edit/' + table.id)" class="btn btn-info">แก้ไข</button>
                      <button v-on:click="deleteTable(table)" class="btn btn-danger">ลบข้อมูล</button>
                      <button v-on:click="navigateTo('/tables')" class="btn btn-secondary">ย้อนกลับ</button>
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
import TableService from "@/services/TablesService";

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      table: null,
    };
  },
  async created() {
    try {
      let tableId = this.$route.params.tableId;
      this.table = (await TableService.show(tableId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  async deleteTable(table) {
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await TableService.delete(table);
          this.$router.push({
          name: "tables",
        });
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.tables = (await TableService.index()).data;
    },
  }
}
</script>
<style scoped>

</style>
