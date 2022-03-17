<template>
    <div class="registerDiv">
        <img id="logo" alt="logo" src="http://s1.s100.vip:13127/Public/logo.png"/>
        <p id="title">激活账户</p>
        <n-form id="form" ref="formRef" :model="formValue" :rules="rules" :show-label="false">
            <n-form-item label="工号" path="account">
                <n-input v-model:value="formValue.account" class="roundInput" placeholder="工号"/>
            </n-form-item>
            <n-form-item label="密码" path="password">
                <n-input
                    v-model:value="formValue.password"
                    class="roundInput"
                    placeholder="密码"
                    type="password"
                    @keyup="clearPasswordAgain"
                />
            </n-form-item>
            <n-form-item label="重复密码" path="passwordAgain">
                <n-input
                    v-model:value="formValue.passwordAgain"
                    class="roundInput"
                    placeholder="重复密码"
                    type="password"
                    @keyup.enter="postRegister"
                />
            </n-form-item>
            <n-form-item>
                <n-checkbox v-model:checked="readProtocol" style="--label-padding: 0px 0px 0px 8px">我已阅读并同意</n-checkbox>
                <p style="text-decoration: underline; margin: 0; cursor: pointer" @click="showProtocol">使用条款</p>
            </n-form-item>
            <n-form-item>
                <n-button attr-type="button" class="roundButton" type="primary" @click="postRegister">立即激活</n-button>
            </n-form-item>
        </n-form>
        <div>
            已经激活？
            <a id="registerLink" href="../login">点我登录</a>
        </div>
        <n-modal v-model:show="showModal">
            <n-card :bordered="false" size="huge" style="width: 600px" title="使用条款">
                <n-scrollbar style="max-height: 300px" x-scrollable>
                    <div v-html="protocol"></div>
                </n-scrollbar>
                <template #footer>
                    <n-button @click="showModal = false">关闭</n-button>
                </template>
            </n-card>
        </n-modal>
    </div>
</template>
<script lang="ts" setup>
import {ref, Ref} from 'vue';
import {Router} from 'vue-router';
import {useRouterPush} from '@/composables';
import {repairmanActiveAPI} from '@/apis/user';
import {getProtocolAPI} from '@/apis/login';
import qs from "qs";

const {routerPush} = useRouterPush();

interface Form {
    account: string;
    password: string;
    passwordAgain: string;
}

const formRef: Ref = ref(null);
const formValue: Ref<Form> = ref({account: '', password: '', passwordAgain: ''});
const readProtocol: Ref<boolean> = ref(true);
const showModal: Ref<boolean> = ref(false);
const protocol: Ref<string> = ref('');
/* 用户注册 */
// 表单规则
const rules: object = {
    account: {
        required: true,
        validator(_rule: any, value: string) {
            if (!value) {
                return new Error('请输入您的工号');
            }
            if (!/^[0-9]{8}$/.test(value)) {
                return new Error('请输入正确格式的工号');
            }
            return true;
        },
        trigger: 'blur'
    },
    password: {
        required: true,
        message: '请输入密码',
        trigger: ['input', 'blur']
    },
    passwordAgain: {
        required: true,
        validator(_rule: any, value: string) {
            if (!value) {
                return new Error('请输入重复密码');
            }
            if (value !== formValue.value.password) {
                return new Error('两次输入密码不一致');
            }
            return true;
        },
        trigger: ['input', 'blur']
    }
};
declare const window: Window & { $message: any; $router: Router };

function postRegister(): void {
    formRef.value.validate((errors: boolean) => {
        if (!errors) {
            repairmanActiveAPI(qs.stringify({
                account: formValue.value.account,
                password: formValue.value.password
            }))
                .then((_response: any) => {
                    window.$message.success('激活成功');
                    routerPush({name: 'login'});
                })
                .catch((_error: {}) => {
                });
        } else {
            window.$message.error('请正确输入信息');
        }
    });
}

function clearPasswordAgain(): void {
    formValue.value.passwordAgain = '';
}

function showProtocol(): void {
    getProtocolAPI().then((response: string) => {
        protocol.value = response;
    });
    showModal.value = true;
}

defineExpose({
    rules,
    formRef,
    formValue,
    readProtocol,
    showModal,
    protocol,
    postRegister,
    clearPasswordAgain,
    showProtocol
});
</script>
<style>
body {
    background-image: url('http://s1.s100.vip:13127/Public/background.png');
}

.registerDiv {
    text-align: center;
    width: 300px;
    height: 610px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

#logo {
    width: 100px;
    margin: auto;
}

#title {
    margin-top: 20px;
    font-size: 22px;
}

#form {
    display: inline-block;
    width: 300px;
}

.roundInput {
    margin-top: 20px;
    width: 300px;
    padding: 5px;
    border-radius: 20px;
}

.roundButton {
    padding: 20px;
    color: white;
    width: 300px;
    border-radius: 20px;
}

label {
    color: white;
}

#registerLink {
    color: #246ace;
}

n-checkbox {
    margin-left: 15px;
}
</style>
