<template>
  <div class="m-setting">
    <p class="info">个人信息</p>
    <p class="userSetting">账户设置</p>
    <p class="username">
      <span class="title">昵称</span>
      <span class="value">{{ account }}</span>
      <button @click="changeAccountPage">修改</button>
    </p>
    <p class="password">
      <span class="title">登录密码</span>
      <span class="value">安全强度：{{ tag }}</span>
      <button @click="changePassPage">修改</button>
    </p>
    <div class="bgUsername" v-show="showChangeAccount">
      <div class="changeUsername">
        <div class="head">
          <span>修改昵称</span>
          <i class="el-icon-error" @click="closeChangePage"></i>
        </div>
        <div class="center">
          <p class="curName">
            <span>当前昵称</span>
            <span>{{ account }}</span>
          </p>
          <p class="newName">
            <span>新昵称</span>
            <input
              type="text"
              v-model="newName"
              :class="validClass"
              @keydown="validUsername"
            />
          </p>
          <p :class="{ tag: true, tagColor: tagColor }">
            {{ newNameTag }}
          </p>
          <div class="changeBtn">
            <button class="comfirm" @click="changeAccount">确认修改</button>
            <button class="cancel" @click="closeChangePage">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="bgPassword" v-show="showChangePass">
      <div class="changePassword">
        <div class="head">
          <span>设置密码</span>
          <i class="el-icon-error" @click="closeChangePage"></i>
        </div>
        <div class="center">
          <p class="curPass">
            <span>当前密码</span>
            <input type="password" v-model="curPass" :class="curValid" />
          </p>
          <p class="curPsaaTag" v-show="isShowCurPsaaTag">{{ curPsaaTag }}</p>
          <p class="newPass">
            <span>密码</span>
            <input
              type="password"
              v-model="newPass"
              :class="newValid"
              @keyup="validNewPass"
            />
          </p>
          <p class="newPassTag" v-show="isShowNewPassTag">{{ newPassTag }}</p>
          <div class="background">
            <div :class="strongClass"></div>
            <div class="strength">
              <span>弱</span>
              <span>中</span>
              <span>强</span>
            </div>
          </div>
          <p class="comfirmPass">
            <span>确认密码</span>
            <input
              type="password"
              v-model="comfirmPass"
              :class="comfirmValid"
            />
          </p>
          <p class="comfirmPsaaTag" v-show="isShowComfirmPsaaTag">
            {{ comfirmPsaaTag }}
          </p>
          <div class="changeBtn">
            <button class="comfirm" @click="changePass">确认修改</button>
            <button class="cancel" @click="closeChangePage">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    console.log(this.account);
  },
  data() {
    return {
      newName: "",
      curPass: "",
      newPass: "",
      comfirmPass: "",
      strongClass: "nothing",
      strongTag: "",
      newNameTag: "",
      curPsaaTag: "请输入当前密码",
      newPassTag: "请输入新密码",
      comfirmPsaaTag: "请再次输入新密码",
      isShowCurPsaaTag: false,
      isShowNewPassTag: false,
      isShowComfirmPsaaTag: false,
      tagColor: false,
      validClass: "",
      curValid: "",
      newValid: "",
      comfirmValid: "",
      showChangeAccount: false,
      showChangePass: false,
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.account,
      tag: (state) => state.tag,
      oldAccount: (state) => state.newAccount,
      oldPassword: (state) => state.newPassword,
    }),
  },
  methods: {
    changeAccountPage() {
      if (!this.showChangePass) {
        this.showChangeAccount = true;
        if (!this.newName) {
          this.tagColor = false;
          this.validClass = "";
        }
      }
    },
    changePassPage() {
      if (!this.showChangeAccount) {
        this.showChangePass = true;
      }
      if (!this.curPass) {
        this.isShowCurPsaaTag = false;
        this.curValid = "";
      }
      if (!this.newPass) {
        this.isShowNewPassTag = false;
        this.newValid = "";
      }
      if (!this.comfirmPass) {
        this.isShowComfirmPsaaTag = false;
        this.comfirmValid = "";
      }
    },
    closeChangePage() {
      this.showChangeAccount = false;
      this.showChangePass = false;
    },
    changePass() {
      if (this.curPass) {
        this.oldAccount.forEach((ele) => {
          if (ele == this.account) {
            this.oldPassword.forEach((ele, index) => {
              if (ele == this.curPass) {
                this.isShowCurPsaaTag = false;
                this.curValid = "valid";
              } else {
                this.isShowCurPsaaTag = true;
                this.curValid = "invalid";
                this.curPsaaTag = "当前密码错误，请重新输入";
              }
            });
          }
        });
      } else {
        this.isShowCurPsaaTag = true;
        this.curValid = "invalid";
        this.curPsaaTag = "请输入当前密码";
      }
      if (this.newPass) {
        if (this.newPass.length < 8) {
          this.isShowNewPassTag = true;
          this.newValid = "invalid";
          this.newPassTag = "密码太短，至少8个字符，不要输入特殊字符";
        } else {
          this.isShowNewPassTag = false;
          this.newValid = "valid";
        }
      } else {
        this.isShowNewPassTag = true;
        this.newValid = "invalid";
        this.newPassTag = "请输入新密码";
      }
      if (this.comfirmPass) {
        if (this.comfirmPass !== this.newPass) {
          this.isShowComfirmPsaaTag = true;
          this.comfirmValid = "invalid";
          this.comfirmPsaaTag = "两次输入的密码不一致，请重新输入";
        } else {
          this.isShowComfirmPsaaTag = false;
          this.comfirmValid = "valid";
        }
      } else {
        this.isShowComfirmPsaaTag = true;
        this.comfirmValid = "invalid";
        this.comfirmPsaaTag = "请再次输入新密码";
      }
      if (!this.isShowCurPsaaTag && this.newPass == this.comfirmPass) {
        this.oldPassword.forEach((ele, index) => {
          if (ele == this.curPass) {
            this.$store.commit("changePassword", {
              val: this.newPass,
              index: index,
            });
            this.showChangePass = false;
          }
        });
      }
    },
    changeAccount() {
      if (this.newName) {
        if (!this.tagColor) {
          this.oldAccount.forEach((ele, index) => {
            if (ele == this.account) {
              this.$store.commit("changeAccount", {
                val: this.newName,
                index: index,
              });
              this.showChangeAccount = false;
              this.account = this.newName;
            }
          });
        }
      } else {
        this.validClass = "invalid";
        this.tagColor = true;
        this.newNameTag = "请输入新昵称";
      }
    },
    validUsername() {
      let reg = /[0-9A-z]/g;
      if (
        reg.test(this.newName) &&
        this.newName.length >= 5 &&
        this.newName.length <= 8
      ) {
        this.validClass = "valid";
        this.tagColor = false;
      } else {
        this.validClass = "invalid";
        this.tagColor = true;
        this.newNameTag = "输入英文字母，限5-8位长度";
      }
    },
    validNewPass() {
      let len = this.newPass.length;
      let reg = /[A-z]/g;
      if (len == 0) {
        this.strongClass = "nothing";
        this.strongTag = "";
      } else if (len > 0 && len <= 8) {
        this.strongClass = "weak";
        this.strongTag = "弱";
      } else if (len >= 8 && len <= 16 && reg.test(this.newPass)) {
        this.strongClass = "middle";
        this.strongTag = "中";
      } else if (len > 16 && reg.test(this.newPass)) {
        this.strongClass = "strong";
        this.strongTag = "强";
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/myself/setting.scss";
</style>