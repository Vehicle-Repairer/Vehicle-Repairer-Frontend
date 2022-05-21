<template>
    <div class="flex justify-center items-center h-screen" :style="{ backgroundColor: bgColor }">
        <dark-mode-switch
            :dark="theme.darkMode"
            class="absolute left-48px top-24px z-3 text-20px"
            @update:dark="theme.setDarkMode"
        />
        <div class="relative s-card p-14 z-4">
            <icon-fluent:vehicle-car-collision-20-filled class="absolute z-4 w-13 h-13 text-primary top-5 left-5"/>
            <div class="text-6xl font-bold italic text-primary mb-13 mt-5 text-center">
                <span class="underline decoration-teal-500 decoration-6">汽车维修系统</span>
            </div>
            <n-tabs type="line" :animated="true" @update:value="refresh" :value="defaultRole" >
                <n-tab-pane name="业务员" tab="业务员">
                    <n-form id="form" ref="formRef" :model="formValue" :rules="rules" :show-label="false">
                        <n-form-item label="用户名" path="id">
                            <n-input v-model:value="formValue.id" class="p-2" placeholder="账号" :round="true"/>
                        </n-form-item>
                        <n-form-item label="密码" path="password">
                            <n-input
                                v-model:value="formValue.password"
                                class="p-2"
                                placeholder="密码"
                                type="password"
                                @keyup.enter="PostLogin('业务员')"
                                :round="true"
                            />
                        </n-form-item>
                        <n-form-item>
                            <n-checkbox v-model:checked="needSave">记住我</n-checkbox>
                        </n-form-item>
                        <n-form-item>
                            <n-button
                                class="w-full py-5 text-lg font-bold"
                                attr-type="button"
                                :secondary="true"
                                :round="true"
                                type="primary"
                                size="large"
                                @click="PostLogin('业务员')"
                            >登录
                            </n-button>
                        </n-form-item>
                    </n-form>
                </n-tab-pane>
                <n-tab-pane name="维修员" tab="维修员">
                    <n-form id="form" ref="formRef" :model="formValue" :rules="rules" :show-label="false">
                        <n-form-item label="用户名" path="id">
                            <n-input v-model:value="formValue.id" class="p-2" placeholder="账号" :round="true"/>
                        </n-form-item>
                        <n-form-item label="密码" path="password">
                            <n-input
                                v-model:value="formValue.password"
                                class="p-2"
                                placeholder="密码"
                                type="password"
                                @keyup.enter="PostLogin('维修员')"
                                :round="true"
                            />
                        </n-form-item>
                        <n-form-item>
                            <n-checkbox v-model:checked="needSave">记住我</n-checkbox>
                        </n-form-item>
                        <n-form-item>
                            <n-button
                                class="w-full py-5 text-lg font-bold"
                                attr-type="button"
                                :secondary="true"
                                :round="true"
                                type="primary"
                                size="large"
                                @click="PostLogin('维修员')"
                            >登录
                            </n-button>
                        </n-form-item>
                    </n-form>
                </n-tab-pane>
            </n-tabs>
            <div class="mt-2">
                还没有账号？
                <a id="loginLink" href="../active">点我注册</a>
            </div>
        </div>
        <login-bg :theme-color="bgThemeColor"/>
    </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, Ref, ref} from 'vue';
import {Router} from 'vue-router';
import {useRouterPush} from '@/composables';
import {getColorPalette, mixColor, storage} from '@/utils';
import {loginApi} from '@/apis/user';
import {useThemeStore} from '@/store';
import {LoginBg} from './components';
import {DarkModeSwitch} from "@/components";
import {UserLoginResponse} from "@/interface";

const {routerPush} = useRouterPush();
const theme = useThemeStore();
const bgThemeColor = computed(() => (theme.darkMode ? getColorPalette(theme.themeColor, 7) : theme.themeColor));
const bgColor = computed(() => {
    const COLOR_WHITE = '#ffffff';
    const ratio = theme.darkMode ? 0.5 : 0.2;
    return mixColor(COLOR_WHITE, theme.themeColor, ratio);
});
const formValue: Ref<{ id: string; password: string }> = ref({id: '', password: ''});
declare const window: Window & { $message: any; $router: Router };
const rules: object = {
    id: {
        required: true,
        validator(_rule: any, value: string) {
            if (!value) {
                return new Error('请输入工号。');
            }
            if (!/^(\d+)$/.test(value)) {
                return new Error('请输入正确的工号。');
            }
            return true;
        },
        trigger: 'blur'
    },
    password: {
        required: true,
        message: '请输入密码。',
        trigger: ['input', 'blur']
    }
};
const GetCookie = (): void => {
    if (document.cookie.length > 0) {
        const cookie: string[] = document.cookie.split('; ');
        cookie.forEach(function (element): void {
            const result: string[] = element.split('=');
            if (result[0] === 'id') {
                formValue.value.id = result[1];
            } else if (result[0] === 'password') {
                formValue.value.password = result[1];
            } else if (result[0] === 'role') {
                defaultRole.value = result[1];
            }
        });
    }
};
onMounted(() => {
    storage.remove('token');
    GetCookie();
});
const formRef: Ref = ref(null);
const needSave: Ref<boolean> = ref(true);
const SetCookie = (id: string, password: string, role: string, exdays: number): void => {
    const exdate: Date = new Date();
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
    window.document.cookie = `id` + `=${id};path=/;expires=${exdate.toUTCString()}`;
    window.document.cookie = `password` + `=${password};path=/;expires=${exdate.toUTCString()}`;
    window.document.cookie = `role` + `=${role};path=/;expires=${exdate.toUTCString()}`;
};
const PostLogin = (role: string): void => {
    SetCookie('', '', '', -1);
    formRef.value.validate((errors: boolean) => {
        if (!errors) {
            loginApi({id: formValue.value.id, password: formValue.value.password, role: role})
                .then((response: UserLoginResponse) => {
                    window.$message.success('登录成功');
                    const token: string = response.token;
                    storage.set('token', token);
                    storage.set('role', role);
                    if (needSave.value) {
                        SetCookie(formValue.value.id, formValue.value.password, role, 7);
                    }
                    routerPush({name: 'home'});
                })
                .catch((_error: {}) => {
                });
        } else {
            window.$message.error('请正确输入信息');
        }
    });
};

function refresh(value: string): void {
    formValue.value.id = '';
    formValue.value.password = '';
    defaultRole.value = value;
}

let defaultRole: Ref<string> = ref('业务员');

defineExpose({formRef, formValue, rules, needSave, PostLogin});
</script>
<style scoped>
label {
    color: white;
}

#loginLink {
    color: #246ace;
}
</style>
