<template>
    <div class="the_big_frame">
    <div class="common_ls_cntainr --dtail-app-bar">
        <ActivityView />
        <ButtonList :allCommands="[
            [
                {lable: 'Tiếng Việt (sẽ có)', scndIcon: '', action: 'performToVN'},
                {lable: 'English', scndIcon: 'done', action: 'performToEN'},
            ]
        ]"/>
    </div>
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import ButtonList from '@/components/misc/ButtonList'
export default {
    meta: {
        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "Change Language"
    },
    components: {ActivityView, ButtonList},
    methods: {
        performToVN() {
        },
        performToEN() {
        },
    }
}
</script>