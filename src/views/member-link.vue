<template>
  <div v-if="bool" class="memberLink">
    <h2>会员类型列表</h2>
    <div class="select-btn">
      <el-button type="success" @click="handleNewMenberList">新增会员类型</el-button>
    </div>
    <el-row class="tac">
      <el-col :span="4">
        <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
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
        <el-table :data="userMessage" height="600" border style="width: 100%">
          <el-table-column prop="MemberTypeName" label="会员类型名称"></el-table-column>
          <el-table-column prop="operation" label="操作" width="350">
            <template slot-scope="scope">
              <el-button @click="handleDetail(scope.row)" type="text" size="small">会员消费统计列表</el-button>
              <el-button type="text" size="small" @click="handleAlter(scope.row)">修改会员类型名称</el-button>
              <el-button type="text" size="small" @click="handleUp(scope.row)">上传会员数据</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
      <el-form :model="formAlterMember" label-width="140px">
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
    <el-dialog :title="fileTitle" :visible.sync="visibleOpenUp">
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
      // 判断文件是否显示 'hello - world'
      bool: this.$route.query.bool,
      // 上传文件地址
      upMemberTypeUrl: `${this.$constants.API_HOST}/InputAPI.ashx`,
      // 用户name 和 mm
      obj: {
        Account: 'mb@MY',
        Password: 'my@i-mybest'
      },
      // 接收会员列表数据
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
      // 上传文件的title值
      fileTitle: '',
      // 新增加会员列表,弹框是否显示
      visibleOpenNewMenberList: false,
      // 修改弹出框
      visibleOpenAlterMenberList: false,
      // 上传csv弹出框
      visibleOpenUp: false,
    }

  },
  created () {
    this.init()
  },
  components: {

  },
  methods: {
    init () {
      this.handleMemberListShow(this.obj); // 这里分离开来，因为为handleMemberListShow()函数只是init中的一部分，以后如果需求增加说不定init默认还会渲染其他的东西
    },
    // 会员类型渲染
    // 这里的obj是形参；this.obj是实参
    handleMemberListShow (obj) {
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
    // 点击新增加会员类型
    handleNewMenberList () {
      this.formNewMember.memberTypeName = ''
      this.visibleOpenNewMenberList = true;
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
    // 点击明细
    handleDetail (item = {}) {
      this.$router.push({
        name: 'member-detail',
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
    // 上传csv
    handleUp (item = {}) {
      this.fileTitle = `上传 ${item.MemberTypeName} 会员类型csv文件`
      this.visibleOpenUp = true;
      this.fileList.memberTypeID = item.MemberTypeID //设置ID
    },
    // 上传csv弹出框确认按钮
    handleOpenUp () {
      this.visibleOpenUp = false;
      window.console.log(this.fileList)
    },
    // 点击侧边导航
    handleSelect (key, keyPath) {
      if (key === '2') {
        this.$router.push({
          name: 'member-detail',
          query: {
            id: '1'
          }
        })
      }
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

  .el-menu-vertical-demo {
    height: 600px;
    text-align: left;
  }
}
</style>
