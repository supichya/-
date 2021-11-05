<template>
  <div>
    <div class="latest-products">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-heading">
                        <h2>รายละเอียดโต๊ะ</h2>
                        <small class="form-text text-muted">จำนวนโต๊ะมีจำกัด ทางร้านจึงขอความกรุณาคุณลูกค้า ถ้าต้องการยกเลิกการจอง กรุณาแจ้งล่วงหน้า 2 ชม</small>
                        <a>จำนวนโต๊ะ {{ tables.length }}  &nbsp;<button v-on:click="navigateTo ('/table/create')" class="btn btn-success">Create table</button></a>
                      <br>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <div class="services">
        <div class="container">
            <div class="row">
                
                <div class="col-md-4" v-for="table in tables" v-bind:key="table.id"><!-- แสดงโต๊ะ -->
                    <div class="service-item">
                        <div class="icon">
                            <img src="../Tables/img/chair.png" ><!-- รูป icon โต๊ะ -->
                        </div>
                        <div class="down-content">
                            <h4>หมายเลขโต๊ะ : {{ table.tablenum }}</h4>
                            <p>จำนวนที่นั่ง : {{ table.poeple }}</p>
                            <p>เตา: {{ table.stove }}</p><br>
                            <!-- <p>ชื่อรูป: {{ table.thumbnail }}</p> -->
                              <div class="btntable">
                              <button v-on:click="navigateTo('/blog/create')" class="btn btn-success">จองโต๊ะ</button>
                              <button v-on:click="navigateTo('table/'+table.id)" class="btn btn-primary">ดูรายละอียด</button>
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
      tables: [],
    };
  },
  async created() {
    this.tables = (await TableService.index()).data;
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
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.tables = (await TableService.index()).data;
    },
  },
};
</script>
<style scoped>

</style>