<template>
    <div class="the_big_frame">
    <div class="common_ls_cntainr --dtail-app-bar">
        <ActivityView />
        <ButtonList :allCommands="[
            [
                {lable: 'Tiếng Việt (sắp có)', scndIcon: '', action: 'performToVN'},
                {lable: 'English', scndIcon: 'done', action: 'performToEN'},
            ]
        ]"/>
    </div>
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
import { appBarTitle } from '@/mixins/appBarStuff'
import { disableHamburger } from '@/mixins/appBarStuff'
import ButtonList from '@/components/misc/ButtonList'
export default {
    components: {ActivityView, ButtonList},
    mixins: [appBarTitle, disableHamburger],
    data:() => ({
        appBarDisplayTitle: "Change Language",
    }),
    methods: {
        performToVN() {
        },
        performToEN() {
        },
    }
}
</script>