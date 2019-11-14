<template>
    <div>
        <Tabs
            :tabs="['CỘNG ĐỒNG', 'CÁ NHÂN']"
            :currentTab="currentTab"
            @switchTo="newTab"
        />
        <keep-alive>
            <HomeFeed v-if="currentTab==0" />
            <MyChatList v-if="currentTab==1" />
        </keep-alive>
        <!-- <button style="position:fixed;top:50%;right:150px;z-index:99999" @click="DEBUG()">DEBUG</button> -->
    </div>
</template>

<script>
import { tabs } from '@/mixins/tabs'

import HomeFeed from './post/HomeFeed'
import MyChatList from '@/components/chat/list/MyChatList'

export default {
    components: {
        HomeFeed,
        MyChatList,
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
