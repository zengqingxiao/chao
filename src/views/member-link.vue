<template>
  <div v-if="bool" class="memberLink">
    <h2>会员类型列表</h2>
    <div class="select-btn">
      <el-button type="success" @click="visibleOpenNewMenberList = true">新增会员列表</el-button>
    </div>
    <el-table :data="userMessage" height="600" border style="width: 100%">
      <el-table-column prop="MemberTypeID" label="日期"></el-table-column>
      <el-table-column prop="MemberTypeName" label="姓名"></el-table-column>
      <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
      <el-table-column prop="operation" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row)" type="text" size="small">明细</el-button>
          <el-button type="text" size="small" @click="handleAlter(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="handleUp(scope.row)">上传csv</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 这里的sync是修饰符: 将visibleOpenNewMenberList值传进去，子监听，传值给父亲，父亲不用监听事件直接将值给了visibleOpenNewMenberList -->
    <el-dialog title="新增会员列表明细" :visible.sync="visibleOpenNewMenberList">
      <el-form :model="formNewMember" label-width="100px">
        <el-form-item label="新增会员名称">
          <el-input v-model="formNewMember.memberTypeName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleOpenNewMenberList = false">取 消</el-button>
        <el-button type="primary" @click="handleOpenAdd(obj)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改弹出框 -->
    <el-dialog title="修改会员列表" :visible.sync="visibleOpenAlterMenberList">
      <el-form :model="formNewMember" label-width="140px">
        <el-form-item label="修改后的会员名称">
          <el-input v-model="formAlterMember.memberTypeName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleOpenAlterMenberList = false">取 消</el-button>
        <el-button type="primary" @click="handleOpenAlter(obj)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上传csv弹出框 -->
    <el-dialog title="上传csv文件" :visible.sync="visibleOpenUp">
      <el-upload class="upload-demo" drag :action="upMemberTypeUrl" :data="fileList">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传csv文件</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleOpenUp = false">取 消</el-button>
        <el-button type="primary" @click="handleOpenUp(obj)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  <div v-else>hello world 亲检查密码哦</div>
</template>

<script>
import { memberTypeAPI, addMemberTypeAPI, alterMemberTypeAPI } from '../api/index'
export default {
  data () {
    return {

      // 判断文件是否显示 hello - world
      bool: this.$route.query.bool,

      // 上传文件地址
      upMemberTypeUrl: `${this.$constants.API_HOST}/InputAPI.ashx`,
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
      userMessage: [],
      // 新增加弹出框 form数据
      formNewMember: {
        memberTypeName: '' //会员名称
      },
      // 修改弹出框 form数据
      formAlterMember: {
        memberTypeName: '', // 会员名称
        memberTypeID: '' // 会员名称ID
      },
      // 上传文件
      fileList: {
        Account: 'mb@MY',
        Password: 'my@i-mybest',
        memberTypeID: '', // 会员名称ID
      },
      // 新增加会员列表,弹框是否显示
      visibleOpenNewMenberList: false,
      // 修改弹出框
      visibleOpenAlterMenberList: false,
      // 上传csv弹出框
      visibleOpenUp: false,
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
    // 点击明细
    handleDetail (item = {}) {
      this.$router.push({
        name: 'member-datail',
        query: {
          id: item.MemberTypeID
        }
      })
    },
    // 修改点击事件
    handleAlter (item = {}) {
      this.visibleOpenAlterMenberList = true
      this.formAlterMember.memberTypeID = item.MemberTypeID
    },
    // 修改弹出框点击确认按钮
    handleOpenAlter (obj = {}) {
      this.visibleOpenAlterMenberList = false;
      let newObj = Object.assign(obj, this.formAlterMember)
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await alterMemberTypeAPI(newObj);
          resolve(data)
        } catch (e) {
          reject(e)
        }
      }).then(() => {
        // 这里要分离出来以免语义问题
        this.init(obj);
      })
    },
    // 添加按钮弹出框点击确认
    handleOpenAdd (obj = {}) {
      // 添加其他字段
      let newObj = Object.assign(obj, {
        MemberTypeName: this.formNewMember.memberTypeName
      })
      if (!newObj) return false
      this.visibleOpenNewMenberList = false;
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await addMemberTypeAPI(newObj);
          resolve(data)
        } catch (e) {
          reject(e)
        }
      }).then(() => {
        // 这里要分离出来以免语义问题
        this.init(this.obj);
      })
    },
    // 上传csv
    handleUp (item = {}) {
      this.visibleOpenUp = true;
      this.fileList.memberTypeID = item.MemberTypeID //设置ID
    },
    // 上传csv弹出框确认按钮
    handleOpenUp (obj = {}) {
      this.visibleOpenUp = false;
      window.console.log(this.fileList)
    }

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
