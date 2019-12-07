<template>
    <div class="the_big_frame">
        <nav :class="['explore__srch-bar-ctn app-bar',
            $store.state.scrollinUp ? null: 'top-lev-contract',
            kw ? '--expanded-srch' : null
        ]">
            <div class="explr__srch-bar">
                <i class="material-icons-round">search</i>
                <input placeholder="Search Bubbly" @input="debounceSearch">
            </div>
        </nav>
        <Tabs
            :tabs="['CỘNG ĐỒNG', 'MỌI NGƯỜI', 'BÀI ĐĂNG']"
            :currentTab="currentTab"
            @switchTo="newTab"
        />
        <div class="common_ls_cntainr --top-lev-app-bar --with-tabs cards-wrapper" ref="feed">
            <component :is="exploreType"
                v-for="item in fetchedData"
                :key="item.id"
                v-bind="{[exploreType]: item}"
            />
            <Spinner style="margin-top:15px" v-if="loading4More" />
            <h3 class="empty-fetchedLs"  v-if="empty">No results</h3>
        </div>
    </div>
</template>

<script>
import { tabs } from '@/mixins/cmpnentsCtrl/tabs'

import Community from '@/components/community/list/CmntyItem'
import Profile from '@/components/profile/list/UserItem'
import Post from '@/components/post/postCard/'
import { feedingFrenzy, postFeed, maintainScrllPos, scrlDirection } from '@/mixins/feedingFrenzy'

export default {
    components: {
        Community,
        Profile,
        Post,
    },
    mixins: [tabs, feedingFrenzy, postFeed, maintainScrllPos, scrlDirection],
    // this.$options.nonReactiveData {
        debounce: null,
    // },
    data:() => ({
        kw: ""
    }),
    watch: {
        kw() {
            this.firstFetch()
        },
        currentTab(val) {
            this.fetchedData = []
            this.firstFetch()
            if (val == 1) { // bruh it's profile field
                this.$options.offsetProp = 'username'
            } else this.$options.offsetProp = 'id'
        },
    },
    computed: {
        feedUrlPrefix() {
            switch (this.currentTab) {
                case 0:
                    return `communities/`
                case 1:
                    return `accounts/`
                case 2:
                    return `posts/search/`
            }
        },
        feedUrl() {
            return `${this.feedUrlPrefix}?search=${this.kw}&`
        },
        exploreType() {
            return this.currentTab == 0 ? "community" :
                this.currentTab == 1 ? "profile" :
                this.currentTab == 2 ? "post" : ""
        }
    },
    methods: {
        debounceSearch(event) {
            clearTimeout(this.$options.debounce)
            this.$options.debounce = setTimeout(() => {
                this.kw = event.target.value
            }, 600)
        }
    }
}
</script>

<style>
.explore__srch-bar-ctn {
    margin-left: 50px;
    width: calc(100% - 50px);
}
.--expanded-srch {
    transition: .2s;
    margin-left: 0;
    width: 100%;
}
.explr__srch-bar {
    display: flex;
    align-items: center;
    border: solid 1px #ccc;
    border-radius: 100px;
    margin: 14px 15px;
    background: #eee;
}

.explr__srch-bar > i {
    /* color: rgba(72, 133, 237, 0.5); */
    color: #aaa;
    margin: 0 7px;
}
.explr__srch-bar > input {
    border: none;
    outline: none;
    background: none;
    width: 100%;
    height: 30px;
}
</style>