<template>
  <div class="register">
    <!-- <p>register register 登录页面</p> -->
    <div class="center">
      <div class="title">
        <img src="../assets/images/img_miyu_icon.png" />
        <div class="title-name">
          <p class="my">麦优</p>
          <p>i-mybest.com</p>
        </div>
      </div>
      <div class="reg">
        <el-form ref="form" :model="form" label-width="50px">
          <el-form-item label="账号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-button class="btn" style type="primary" @click="handleRegister">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单
      form: {
        name: '', // 账号
        password: '' // 密码
      }
    }
  },
  methods: {
    handleRegister () {
      let saveobj = {
        name: this.form.name,
        password: this.form.password
      }
      // this.$store.commit('saveUserinfo', save)
      this.$store.dispatch('saveUserinfo', saveobj)
      this.$router.push({
        name: 'member-link', // 跳转到会员类型列表
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.register {
  .center {
    width: 400px;
    height: 400px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    // border: 1px solid red;
    text-align: center;
  }

  .title {
    display: inline-block;
    // border: 1px solid saddlebrown;
    line-height: 1;
    margin-bottom: 30px;

    .title-name {
      display: inline-block;
      vertical-align: top;

      p {
        margin: 0;
        &.my {
          font-size: 52px;
        }
      }
    }
  }

  .reg {
    .btn {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>

