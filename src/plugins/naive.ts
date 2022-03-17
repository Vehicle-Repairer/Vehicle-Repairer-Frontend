import type {App} from 'vue';
import {
    create,
    NBreadcrumb,
    NBreadcrumbItem,
    NButton,
    NCard,
    NCheckbox,
    NColorPicker,
    NConfigProvider,
    NDataTable,
    NDescriptions,
    NDescriptionsItem,
    NDialogProvider,
    NDivider,
    NDrawer,
    NDrawerContent,
    NDropdown,
    NEmpty,
    NForm,
    NFormItem,
    NGradientText,
    NGrid,
    NGridItem,
    NH1,
    NH2,
    NH3,
    NIcon,
    NInput,
    NInputGroup,
    NInputNumber,
    NLayout,
    NLayoutSider,
    NList,
    NListItem,
    NLoadingBarProvider,
    NMenu,
    NMessageProvider,
    NModal,
    NNotificationProvider,
    NPagination,
    NPopover,
    NProgress,
    NRate,
    NScrollbar,
    NSelect,
    NSlider,
    NSpace,
    NSpin,
    NStatistic,
    NSwitch,
    NTabPane,
    NTabs,
    NTag,
    NThing,
    NTimeline,
    NTimelineItem,
    NTooltip
} from 'naive-ui';

/** 按需引入naiveUI */
export default function setupNaiveUI(app: App) {
    const naive = create({
        components: [
            NBreadcrumb,
            NBreadcrumbItem,
            NButton,
            NCard,
            NCheckbox,
            NColorPicker,
            NConfigProvider,
            NDataTable,
            NDescriptions,
            NDescriptionsItem,
            NDialogProvider,
            NDivider,
            NDrawer,
            NDrawerContent,
            NDropdown,
            NEmpty,
            NForm,
            NFormItem,
            NGradientText,
            NGrid,
            NGridItem,
            NH1,
            NH2,
            NH3,
            NIcon,
            NInput,
            NInputGroup,
            NInputNumber,
            NList,
            NListItem,
            NLoadingBarProvider,
            NModal,
            NMenu,
            NMessageProvider,
            NNotificationProvider,
            NPopover,
            NScrollbar,
            NSelect,
            NSpace,
            NStatistic,
            NSwitch,
            NSpin,
            NTabs,
            NTabPane,
            NTag,
            NThing,
            NTimeline,
            NTimelineItem,
            NTooltip,
            NPagination,
            NProgress,
            NSlider,
            NLayoutSider,
            NLayout,
            NRate
        ]
    });
    app.use(naive);
}