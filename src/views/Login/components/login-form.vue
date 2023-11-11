<script lang="ts" setup name="LoginForm">
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import useStore from "@/store";
import { useRouter } from "vue-router";
import Message from "@/components/message/index.ts";

const router = useRouter();
const { userStore } = useStore();
const loginType = ref<"account" | "mobile">("account");

// 点击切换登录方式
const onCheckLogin = () => {
  loginType.value = loginType.value === "account" ? "mobile" : "account";
  resetForm(); // 重制表单
};

// 账号登录定义校验
const { validate, resetForm } = useForm({
  // 校验规则
  validationSchema: {
    account: (value: string) => {
      // 校验的value值
      // value是将来使用该规则的表单元素的值
      // 1. 必填
      // 2. 6-20个字符，需要以字母开头
      // 如何反馈校验成功还是失败，返回true才是成功，其他情况失败，返回失败原因。
      if (!value) return "请输入用户名";
      if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return "字母开头且6-20个字符";
      return true;
    },
    password: (value: string) => {
      if (!value) return "请输入密码";
      if (!/^\w{6,12}$/.test(value)) return "密码必须是6-24位字符";
      return true;
    },
    isAgree: (value: boolean) => {
      if (!value) return "请同意隐私条款";
      return true;
    },
    mobile: (value: string) => {
      if (!value) return "请输入手机号";
      if (!/^1[3-9]\d{9}$/.test(value)) return "手机号格式错误";
      return true;
    },
    code: (value: string) => {
      if (!value) return "请输入验证码";
      if (!/^\d{6}$/.test(value)) return "验证码格式错误";
      return true;
    },
  },
  // 默认值
  initialValues: {
    account: "xiaotuxian001",
    password: "123456",
    isAgree: true,
  },
});

// 创建校验数据
const {
  value: account,
  errorMessage: accountErr,
  validate: accountValidate,
} = useField<string>("account");
const {
  value: password,
  errorMessage: passwordErr,
  validate: passwordValidate,
} = useField<string>("password");
const {
  value: isAgree,
  errorMessage: isAgreeErr,
  validate: isAgreeValidate,
} = useField<boolean>("isAgree");

// 短信登录定义校验
// const { validate: mobileValidate } = useForm({
//   validationSchema: {
//     mobile: (value: string) => {
//       if (!value) return "请输入手机号";
//       if (!/^1[3-9]\d{9}$/.test(value)) return "手机号格式错误";
//       return true;
//     },
//     code: (value: string) => {
//       if (!value) return "请输入验证码";
//       if (!/^\d{6}$/.test(value)) return "验证码格式错误";
//       return true;
//     },
//   },
// });
const {
  value: mobile,
  errorMessage: mobileErr,
  validate: mobileValidate,
} = useField<string>("mobile");
const {
  value: code,
  errorMessage: codeErr,
  validate: codeValidate,
} = useField<string>("code");

// 点击登录
const onLogin = async () => {
  // const res = await validate();
  // if (!res.valid) return false;

  const { valid: accountValid } = await accountValidate();
  const { valid: passwordValid } = await passwordValidate();
  const { valid: isAgreeValid } = await isAgreeValidate();
  if (!accountValid || !passwordValid || !isAgreeValid) return;
  try {
    await userStore.accountLogin(password.value, account.value);
    Message.success("登录成功", 2000);
    await router.push("/");
  } catch (err) {
    // Message.error("用户名或密码错误", 2000);
  }
};

// 发送验证码
const mobileRef = ref<HTMLInputElement | null>(null);
let time = ref(0);
let timer = -1;
const sendCode = async () => {
  if (time.value > 0) return;
  const { valid: mobileValid } = await mobileValidate();
  if (!mobileValid) {
    return mobileRef.value?.focus();
  }
  await userStore.getCode(mobile.value);
  Message.success("发送成功");
  time.value = 60;
  timer = setInterval(() => {
    time.value--;
    if (time.value === 0) {
      clearInterval(timer);
    }
  }, 1000);
};
</script>

<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:" @click="onCheckLogin">
        <i
          :class="{
            'icon-user': loginType === 'account',
            'icon-msg': loginType === 'mobile',
          }"
          class="iconfont"
        ></i>
        {{ loginType === "account" ? "使用短信登录" : "使用账号登录" }}
      </a>
    </div>

    <!--    账号登录-->
    <div class="form">
      <template v-if="loginType === 'account'">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              v-model="account"
              type="text"
              placeholder="请输入用户名或手机号"
            />
          </div>
          <div class="error" v-show="accountErr">
            <i class="iconfont icon-warning" />
            {{ accountErr }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input
              v-model="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-show="passwordErr">
            <i class="iconfont icon-warning" />
            {{ passwordErr }}
          </div>
        </div>
      </template>

      <!--      短信登录-->
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              ref="mobileRef"
              type="text"
              placeholder="请输入手机号"
              v-model="mobile"
            />
          </div>
          <div class="error" v-show="mobileErr">
            <i class="iconfont icon-warning" />
            {{ mobileErr }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input type="password" placeholder="请输入验证码" v-model="code" />
            <span class="code" @click="sendCode">
              {{ time ? time + "s" : "发送验证码" }}
            </span>
          </div>
          <div class="error" v-show="codeErr">
            <i class="iconfont icon-warning" />
            {{ codeErr }}
          </div>
        </div>
      </template>

      <!--      勾选协议-->
      <div class="form-item">
        <div class="agree">
          <XtxCheckbox v-model="isAgree">我同意</XtxCheckbox>
          <a href="javascript:">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:">《服务条款》</a>
        </div>
        <div class="error" v-show="isAgreeErr">
          <i class="iconfont icon-warning" />
          {{ isAgreeErr }}
        </div>
      </div>
      <a href="javascript:" class="btn" @click="onLogin">登录</a>
    </div>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:">忘记密码</a>
        <a href="javascript:">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
