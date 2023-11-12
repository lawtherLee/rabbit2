<script lang="ts" setup name="LoginCallback">
import LoginHeader from "./components/login-header.vue";
import LoginFooter from "./components/login-footer.vue";
import { ref } from "vue";
import CallbackBind from "@/views/Login/components/callback-bind.vue";
import CallbackPatch from "@/views/Login/components/callback-patch.vue";
import useStore from "@/store";
import Message from "@/components/message/index.ts";

const hasAccount = ref(true);
const { userStore } = useStore();
const isLogin = QC.Login.check();
console.log(isLogin);

if (isLogin) {
  // 代表跟QQ过来的
  //获取openId
  QC.Login.getMe(async (openId: string) => {
    try {
      await userStore.QQLogin(openId);
    } catch (err) {
      Message.success("登录成功，但为绑定账号");
    }
  });
}
</script>

<template>
  <LoginHeader></LoginHeader>
  <section class="container">
    <nav class="tab">
      <a
        href="javascript:"
        :class="{ active: hasAccount }"
        @click="hasAccount = true"
      >
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        href="javascript:"
        :class="{ active: !hasAccount }"
        @click="hasAccount = false"
      >
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <callback-bind />
    </div>
    <div class="tab-content" v-else>
      <callback-patch />
    </div>
  </section>
  <LoginFooter></LoginFooter>
</template>

<style scoped lang="less">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
