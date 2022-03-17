<template>
    <dark-mode-container class="global-header flex-y-center h-full">
        <global-logo v-if="showLogo" :show-title="true" :style="{ width: theme.sider.width + 'px' }" class="h-full"/>
        <div v-if="!showHeaderMenu" class="flex-1-hidden flex-y-center h-full">
            <menu-collapse v-if="showMenuCollape"/>
            <global-breadcrumb v-if="theme.header.crumb.visible"/>
        </div>
        <div v-else :style="{ justifyContent: theme.menu.horizontalPosition }"
             class="flex-1-hidden flex-y-center h-full">
            <header-menu/>
        </div>
        <n-space align="center" class="bigSpace mx-5" justify="space-between">
            <n-button class="returnButton" @click="goPre">返回</n-button>
            <n-button :bordered="false" class="exitButton" @click="showExitModal = true">
                <n-icon size="30">
                    <exit-outline/>
                </n-icon>
            </n-button>
        </n-space>
        <div class="flex items-center h-full">
            <global-search/>
            <github-site/>
            <full-screen/>
            <theme-mode/>
            <!-- TODO 封装为组件 -->
            <hover-container class="w-40px h-full" tooltip-content="退出">
                <n-button :bordered="false" class="w-35px h-full" @click="showExitModal = true">
                    <icon-mdi:footer class="text-20px"/>
                </n-button>
            </hover-container>
        </div>
    </dark-mode-container>
    <!-- 退出登录模态框 -->
    <div>
        <n-modal v-model:show="showExitModal">
            <n-card :bordered="false" class="exitModalCard" size="huge" title="提示">
                <div class="exitModalContent">即将退出登录，是否继续？</div>
                <n-button class="confirmButton" @click="ExitLogin">确认</n-button>
                <n-button class="returnButton" type="primary" @click="showExitModal = false">返回</n-button>
            </n-card>
        </n-modal>
    </div>
</template>

<script lang="ts" setup>
import {defineComponent, ref, Ref} from 'vue';
import {Router} from 'vue-router';
import {ExitOutline} from '@vicons/ionicons5';
import {DarkModeContainer} from '@/components';
import {useThemeStore} from '@/store';
import {useRouterPush} from '@/composables';
import {storage} from '@/utils';
import type {GlobalHeaderProps} from '@/interface';
import {useStore} from '@/stores/store';
import GlobalSearch from '../GlobalSearch/index.vue';
import GlobalLogo from '../GlobalLogo/index.vue';
import {FullScreen, GithubSite, GlobalBreadcrumb, HeaderMenu, MenuCollapse, ThemeMode} from './components';

const {routerPush, routerBack} = useRouterPush();

interface Props {
    /** 显示logo */
    showLogo: GlobalHeaderProps['showLogo'];
    /** 显示头部菜单 */
    showHeaderMenu: GlobalHeaderProps['showHeaderMenu'];
    /** 显示菜单折叠按钮 */
    showMenuCollape: GlobalHeaderProps['showMenuCollape'];
}

defineProps<Props>();

const theme = useThemeStore();

const store = useStore();

const showExitModal: Ref<boolean> = ref(false);
defineComponent({
    components: {
        ExitOutline
    }
});

declare const window: Window & { $router: Router };

function goPre(): void {
    routerBack();
}

function ExitLogin(): void {
    storage.remove('token');
    routerPush({name: 'login'});
}


defineExpose({ExitLogin, goPre, showExitModal});
</script>

<style scoped>
.bigSpace {
    height: 60px;
}

.returnButton {
    margin-left: 10px;
}

.curDate {
    font-size: 15px;
}

.exitModalCard {
    width: 300px;
    text-align: center;
}

.exitModalContent {
    font-size: medium;
}

.willGameCard {
    width: 800px;
}

.confirmButton {
    margin-top: 15px;
}

.returnButton {
    margin-left: 15px;
}

.firstTeam {
    display: flex;
    justify-content: end;
    align-items: Center;
}

.secondTeam {
    display: flex;
    justify-content: start;
    align-items: Center;
}

.teamName {
    font-size: 30px;
}

.gamePoint {
    font-size: 40px;
}

.colon {
    font-size: 40px;
    text-align: center;
}

.tenSpan {
    width: 10%;
}

.fiveSpan {
    width: 5%;
}

.teamAvatar {
    width: 60px;
    height: 60px;
    padding: 5px;
}
</style>
