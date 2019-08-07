<template>
  <div class="memberDatali">
    <h2>会员统计明细列表</h2>
    <div class="select-btn">
      <el-form ref="form" :model="form" label-width="100px" :inline="true" :rules="rules">
        <el-form-item label="会员类型：">
          <el-select v-model="form.MemberTypeID" clearable placeholder="请选择">
            <el-option
              v-for="item in memberList"
              :key="item.MemberTypeID"
              :label="item.MemberTypeName"
              :value="item.MemberTypeID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：" prop="StartDate">
          <el-date-picker
            v-model="form.StartDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="EndDate">
          <el-date-picker
            v-model="form.EndDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="handleLook(form)">查看</el-button>
        <el-button type="success" @click="handleDow(form)" ref="bowA" :loading="btnLoading">下载</el-button>
      </el-form>
    </div>
    <el-table
      :data="memberPagData"
      border
      class="elTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column prop="MemberTypeID" label="会员类型名称">
        <template slot-scope="scope">
          <span>{{ scope.row.MemberTypeID | typeTurnName(memberList) }}</span>
          <!-- <span>{{ scope.row.MemberTypeID }}</span> -->
        </template>
      </el-table-column>
      <el-table-column prop="TaobaoID" label="淘宝ID"></el-table-column>
      <el-table-column prop="TotalOrderPayment" label="消费金额"></el-table-column>
      <el-table-column prop="TotalOrderCount" label="消费订单数"></el-table-column>
      <el-table-column prop="TotalProducts" label="购买商品明细"></el-table-column>
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
import { memberTypeAPI, statisticsAPI, dowStatisticsAPI } from '../api/index'
export default {
  data () {
    return {
      // 表单验证
      rules: {
        StartDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        EndDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      // 用户name 和 mm
      obj: {
        Account: 'mb@MY',
        Password: 'my@i-mybest'
      },
      // 分页
      pageSize: 10,
      currentPage: 1,
      total: 0,
      // 表格loading 设置
      loading: false,
      // 按钮loading设置
      btnLoading: false,
      // form 表单 
      // 这里后期调整
      form: {
        MemberTypeID: parseInt(this.$route.query.id), // 选择会员类型
        Account: 'mb@MY',
        Password: 'my@i-mybest',
        StartDate: '',
        EndDate: ''
      },
      // 会员列表数据
      memberList: [],
      // 会员类型名称
      memberTypeName: '',
      /**
       * 会员列表详情数据
       */
      memberData: [], // 全部数据
      memberPagData: [], // memberPagData展示是列表
      //设置日期的规格
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        },
      },
      // 文件下载地址
      aHref: '',
    }
  },
  created () {
    this.momberList(this.obj)
  },
  components: {

  },
  methods: {
    // 获取会员类型列
    momberList (obj) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await memberTypeAPI(obj);
          this.memberList = data.Data
          resolve(data)
        } catch (e) {
          reject(e)
        }
      })
    },
    // 点击查看按钮
    handleLook (obj = {}) {
      if (this.form.EndDate && this.form.StartDate) {
        this.exeAxync(obj).then(() => {
          this.handleCurrentChange(1)
        });
      } else {
        alert('请选择时间')
      }
    },
    // 点击查看按钮触发 这个函数后期应该调整 //统计会员消费记录
    exeAxync (obj) {
      return new Promise(async (resolve, reject) => {
        try {
          // 这里后期要改
          this.loading = true;
          let { data } = await statisticsAPI(obj);
          this.memberData = data.Data;
          this.total = data.Data.length
          this.loading = false;
          resolve(data)
        } catch (e) {
          // 后面改
          reject(e)
        }
      })
    },
    /**
     * 分页
     */
    handleSizeChange: function (pageSize) { // 每页条数切换
      this.pageSize = pageSize
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange: function (currentPage) {//页码切换
      // window.console.log(currentPage)
      this.currentPage = currentPage
      this.currentChangePage(this.memberData, currentPage)
    },
    //分页方法（重点）
    currentChangePage (list, currentPage) {
      if (list && currentPage) {
        let from = (currentPage - 1) * this.pageSize;
        let to = currentPage * this.pageSize;
        // window.console.log("from------", from)
        this.memberPagData = []; // 这个不可以去除
        for (; from < to; from++) {
          // window.console.log("我执行了")
          if (list[from]) {
            this.memberPagData.push(list[from]);
            // window.console.log(this.memberPagData.length)
          }
        }
      }
    },
    // 点击下载
    handleDow (obj = {}) {
      this.btnLoading = true
      this.download(obj).then(() => {
        this.btnLoading = false
        // window.console.log(this.btnLoading)
      })
    },

    download (obj = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await dowStatisticsAPI(obj);
          this.aHref = `${this.$constants.API_HOST}${data.Data}`;
          // this.aHref = `https://mbstatistics.i-mybest.com${data.Data}`;
          const $a = document.createElement('a')
          $a.setAttribute('href', this.aHref)
          $a.setAttribute('download', '下载')
          window.console.log($a)
          document.querySelector('body').appendChild($a)
          $a.click()
          $a.remove()
          resolve(data)
        } catch (e) {
          // 后面改
          window.console.warn(e)
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.memberDatali {
  margin: 30px 30px;
  text-align: center;

  .elTable {
    width: 100%;
    min-height: 520px;
  }

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

  .bowA {
    color: white;
    text-decoration: none;
  }
}
</style>
