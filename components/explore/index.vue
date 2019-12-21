<template>
    <div class="the_big_frame">
        <nav :class="['explore__srch-bar-ctn app-bar',
            $store.state.scrollinUp ? null: 'top-lev-contract',
            kw ? '--expanded-srch' : null
        ]">
            <div class="explr__srch-bar">
                <i class="material-icons-round">search</i>
                <input ref="srch_bx" placeholder="Search Bubbly" @input="debounceSearch">
                <div v-if="kw" class="clr_srch glow" @click="kw='';$refs.srch_bx.value=''">x</div>
            </div>
        </nav>
        <Tabs
            :tabs="['COMMUNITIES', 'PEOPLE', 'POSTS']"
            :currentTab="currentTab"
            @switchTo="newTab"
        />
        <div class="common_ls_cntainr --top-lev-app-bar --with-tabs cards-wrapper" ref="feed">
            <component :is="exploreType"
                v-for="item in fetchedData"
                :key="item.id"
                v-bind="{[exploreType]: item}"
            />
            <StatusIndicator :isFetching="loading4More" :listLen="fetchedData.length"
                headsup="No results"/>
        </div>
    </div>
</template>

<script>
import { tabs } from '@/mixins/cmpnentsCtrl/tabs'

import Community from '@/components/community/list/CmtyItem'
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
    // nonReactive: {
        debounce: null,
    // },
    data:() => ({
        kw: "",
        exploreType: '',
        feedUrlPrefix: '',
    }),
    computed: {
        feedUrl() {
            return `${this.feedUrlPrefix}?search=${this.kw}&`
        },
    },
    watch: {
        feedUrl() {
            this.firstFetch()
        },
        currentTab: {
            immediate: true,
            handler(val) {
                this.fetchedData = []
                this.$options.offsetProp = 'id'
                switch (val) {
                    case 0:
                        this.exploreType = 'community'
                        this.feedUrlPrefix = 'communities/'
                        break
                    case 2:
                        this.exploreType = 'post'
                        this.feedUrlPrefix = 'posts/search/'
                        break
                    case 1:
                        this.exploreType = 'profile'
                        this.feedUrlPrefix = 'accounts/'
                        this.$options.offsetProp = 'username'
                }
            }
        },
    },
    methods: {
        debounceSearch(evt) {
            clearTimeout(this.$options.debounce)
            this.$options.debounce = setTimeout(() => {
                this.kw = evt.target.value
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
    /* transition: .2s; */
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
.clr_srch {
    position: absolute;
    right: 25px;
    background: #999;
    font-size: 10px;
    width: 13px;
    text-align: center;
    border-radius: 50px;
    color: white;
}
</style>