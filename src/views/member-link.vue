<template>
  <div class="memberLink">
    <h2>会员类型列表</h2>
    <div class="select-btn">
      <el-button type="success">添加会员列表</el-button>
    </div>
    <el-table :data="userMessage" height="600" border style="width: 100%">
      <el-table-column prop="MemberTypeID" label="日期"></el-table-column>
      <el-table-column prop="MemberTypeName" label="姓名"></el-table-column>
      <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row)" type="text" size="small">明细</el-button>
          <el-button type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { memberTypeAPI } from '../api/index'
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      /**
       * 用户name 和 mm
       */
      obj: {
        Account: 'mb@MY',
        Password: 'my@i-mybest'
      },
      /**
       * 接收会员列表数据
       */
      userMessage: []

    }

  },
  created () {
    this.init(this.obj)
  },
  components: {

  },
  methods: {
    init (obj) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await memberTypeAPI(obj);
          this.userMessage = data.Data;
          window.console.log(this.userMessage);
          resolve(data)
        } catch (e) {
          reject(e)
        }
      })

    },
    handleDetail (item = {}) {
      this.$router.push({
        name: 'member-datail',
        query: {
          id: item.MemberTypeID
        }
      })
    },

  }
}

</script>
<style lang="scss" scoped>
.memberLink {
  margin: 30px 30px;
  text-align: center;

  .select-btn {
    margin: 5px 0;
    padding: 10px 20px;
    text-align: right;
    background-color: white;
  }
}
</style>
