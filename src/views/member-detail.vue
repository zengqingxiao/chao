<template>
  <div class="memberDatali">
    <h2>会员统计明细列表</h2>
    <div class="select-btn">
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item label="开始时间：">
          <el-date-picker
            v-model="form.StartDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
            v-model="form.EndDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="handleLook(form)">查看</el-button>
        <el-button type="success">下载</el-button>
      </el-form>
    </div>
    <el-table :data="memberPagData" border style="width: 100%" v-loading="loading">
      <el-table-column prop="MemberTypeID" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <div class="paging">
      <!-- 
      // @size-change pageSize 改变时会触发，默认参数val当前页多少条
      // @current-change 当页面发生更改的时候触发 默认参数为当前页数
      // current-page 当前页数
      // page-size 每页显示个数
      // total 总条目数
      -->
      <el-pagination
        background
        stripe
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { statisticsAPI } from '../api/index'
export default {
  data () {
    return {
      /**
       * 分页
       */
      pageSize: 10,
      currentPage: 1,
      total: 0,
      /**
       * loading 设置
       */
      loading: false,
      /**
       * form 表单
       */
      // 这里后期调整
      form: {
        MemberTypeID: this.$route.query.id,
        Account: 'mb@MY',
        Password: 'my@i-mybest',
        StartDate: '',
        EndDate: ''
      },
      /**
       * 会员列表详情数据
       */
      memberData: [],
      memberPagData: [] // memberPagData展示是列表
    }

  },
  created () {
    // this.init(this.obj)
  },
  components: {

  },
  methods: {
    handleLook (obj) {
      this.init(obj).then(() => {
        this.total = 2580;
        this.handleCurrentChange(1)
        // this.tota = data.Data.length
      });
    },
    // 这个函数后期应该调整
    init (obj) {
      return new Promise(async (resolve, reject) => {
        try {
          // 这里后期要改
          this.loading = true;
          let { data } = await statisticsAPI(obj);
          this.memberData = data.Data;
          window.console.log(this.memberData);
          this.loading = false;
          resolve(data)
        } catch (e) {
          // 后面改
          reject(e)
        }
      })
    },
    handleSizeChange: function (pageSize) { // 每页条数切换
      this.pageSize = pageSize
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange: function (currentPage) {//页码切换
      window.console.log(currentPage)
      this.currentPage = currentPage
      this.currentChangePage(this.memberData, currentPage)
    },
    //分页方法（重点）
    currentChangePage (list, currentPage) {

      let from = (currentPage - 1) * this.pageSize;
      let to = currentPage * this.pageSize;
      window.console.log("from------", from)
      this.memberPagData = []; // 这个不可以去除
      for (; from < to; from++) {
        window.console.log("我执行了")
        if (list[from]) {
          this.memberPagData.push(list[from]);
          window.console.log(this.memberPagData.length)
        }
      }
    },
  }
}

</script>
<style lang="scss" scoped>
.memberDatali {
  margin: 30px 30px;
  text-align: center;

  .select-btn {
    margin: 5px 0;
    padding: 10px 20px;
    text-align: right;
    background-color: white;

    .el-form-item {
      margin-bottom: 0;
    }
  }

  .paging {
    background-color: white;
  }
}
</style>
