<template>
  <div class="memberDatali">
    <h2>会员统计列表</h2>
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
            :picker-options="pickerOptions"
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
    <el-row class="tac">
      <el-col :span="4">
        <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">会员类型列表</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">会员统计列表</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <el-table
          :data="memberPagData"
          border
          class="elTable"
          v-loading="loading"
          element-loading-text="拼命加载中"
        >
          <el-table-column width="120" prop="MemberTypeID" label="会员类型名称">
            <template slot-scope="scope">
              <span>{{ getTypeTurnName(scope.row.MemberTypeID) }}</span>
              <!-- <span>{{ scope.row.MemberTypeID }}</span> -->
            </template>
          </el-table-column>
          <el-table-column prop="TaobaoID" label="淘宝ID" width="120"></el-table-column>
          <el-table-column prop="TotalOrderPayment" width="120" label="消费金额" show-overflow-tooltip></el-table-column>
          <el-table-column prop="TotalOrderCount" width="120" label="消费订单数" show-overflow-tooltip></el-table-column>
          <el-table-column prop="TotalProducts" label="购买商品明细" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
    // window.console.log(this)
    this.init();
    // this.momberList(this.obj)
    // 这里分离开来的目的也是一样的，就算init代表初始化，因为初始化不一定只是获取会员类型列，以后可能会有其他的功能所以要分开模块事件管理
  },
  components: {

  },
  methods: {
    init () {
      this.momberList(this.obj)
    },

    getTypeTurnName (val) {
      const memeber = this.memberList.find(item => item.MemberTypeID === val) || {}
      return memeber.MemberTypeName || ''
    },

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
    // 这个方法应该分离出来，应为只要时间，类型，点击查询，都是会触发的所以这个方法要分离
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
    // 点击创建一个点击下载按钮
    // 参数是aHref: 但是这里把aHref写成了全局参数
    handleDownload () {
      const $a = document.createElement('a')
      $a.setAttribute('href', this.aHref)
      $a.setAttribute('download', '下载')
      window.console.log($a)
      document.querySelector('body').appendChild($a)
      $a.click()
      $a.remove()

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
          // main 文件中有把Api_HOST写入到原型中
          this.aHref = `${this.$constants.API_HOST}${data.Data}`;
          // this.aHref = `https://mbstatistics.i-mybest.com${data.Data}`;
          this.handleDownload(); // 将一些单独的方法分离开来
          resolve(data)
        } catch (e) {
          // 后面改
          window.console.warn(e)
        }
      })
    },
    // 点击侧边导航
    handleSelect (key, keyPath) {
      //console.log('我点击了', key)
      if (key === '1') {
        //console.log('我进去了', key)
        this.$router.push({
          name: 'member-link',
          query: {
            bool: 'true' //判断下一页是否显示
          }
        })
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.memberDatali {
  margin: 30px 30px;
  text-align: center;

  .elTable {
    // width: 100%;
    min-height: 574px;
  }
  .el-menu-vertical-demo {
    height: 574px;
    text-align: left;
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
