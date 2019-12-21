<template>
    <div>
        <!-- <Tabs
            :tabs="['CỘNG ĐỒNG', 'CÁ NHÂN']"
            :currentTab="currentTab"
            @switchTo="newTab"
        /> -->
        <keep-alive>
            <JoinedCmtyFeed v-if="currentTab==0" />
            <JoinedCmtyFeed v-if="currentTab==1" />
        </keep-alive>

        <FAB @clicked="$router.push('/post/compose')"
            icon= "add"
            actionName= "Write a post"
        />
        <!-- <button style="position:fixed;top:50%;right:150px;z-index:99999" @click="DEBUG()">DEBUG</button> -->
    </div>
</template>

<script>
import { tabs } from '@/mixins/cmpnentsCtrl/tabs'
import FAB from '@/components/misc/FAB'
import JoinedCmtyFeed from './JoinedCmtyFeed'

export default {
    components: {
        FAB,
        JoinedCmtyFeed,
    },
    mixins: [
        tabs,
    ],
    methods: {
        DEBUG() {
            this.$axios.post('posts/1/comments/create',
            {text:"bruhhhh"}
            , this.$store.state.authHeader)
                .then(res => {
                    console.log(res);
                    
                })
        }
    }
}
</script>
