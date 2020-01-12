<template>
<transition name="fade" appear>
    <div v-if="lockable||locked" class="lockable-tab-ctnr" ref="tabCtnr">
        <div :class="['tabs-round', lockTabs ? 'locked-tabs': 'unlocked-tabs']">
            <!-- COPY -->
            <button v-for="(tab, index) in tabs" 
                :key="index"
                @click="$emit('switchTo', index)"
                v-bind:id="[currentTab==index ? 'focusing' :null]"
            >{{ tab }}</button>

        </div>
    </div>

    <div v-else :class="['tabs-round', 
        contractless?null:['top-lev-tabs', $store.state.scrollinUp?null:'top-lev-contract']
    ]">
        <!-- PASTE -->
        <button v-for="(tab, index) in tabs"
            :key="index"
            @click="$emit('switchTo', index)"
            v-bind:id="[currentTab==index ? 'focusing' :null]"
        >{{ tab }}</button>

    </div>
</transition>
</template>

<script>
export default {
    props: {
        tabs: Array,
        currentTab: Number,
        lockable: Boolean,
        locked: Boolean,
        contractless: Boolean,
    },
    data() {
        return {
            lockTabs: false,
        }
    },
    mounted() {
        if (this.lockable) {
            const tabs = this.$refs.tabCtnr
            const scroll = this.$parent.$refs.feed
            scroll.addEventListener('scroll', () => {
                if (scroll.scrollTop > tabs.offsetTop-56) {
                    this.lockTabs = true
                } else {
                    this.lockTabs = false
                }
            }, {
                capture: true,
                passive: true})
        }
        this.lockTabs = this.locked
    },
}
</script>

<style>
.lockable-tab-ctnr {
    min-height: 60px;
    margin-top: 10px;
    width: 100%;
}
.lockable-tab-ctnr .unlocked-tabs {
    position: relative;
}
.locked-tabs {
    transition: .2s;
    position: absolute;
    /* margin-left: -8px; */
    top: 56px;
    width: 100%;
    padding-top: 1px !important;
    background: linear-gradient(180deg,
        rgba(255, 255, 255, 0.836) 40%,
        rgba(0, 0, 0, 0) 92%) !important;
}
.unlocked-tabs {
    background: none !important;
}



.top-lev-tabs {
    transition: .5s;
    position: absolute;
    top: 56px;
}
.top-lev-contract {
    margin-top: -56px;
}


.tabs-round {
    left: 0;
    right: 0;
    display: flex;
    padding: 10px 30px;
    z-index: 99;
    background: linear-gradient(180deg,
        rgba(255, 255, 255, 0.9) 50%,
        rgba(0, 0, 0, 0) 100%);
    overflow: auto;
}
.tabs-round button{
    margin: auto;
    border-radius: 100px; /* breaks transitions, be careful */
    padding: 5.5px;
    width: 999px;
    font-weight: bold;
    font-size: 11px;
    background: #00000000;
    color: #00000055;
    white-space: nowrap;
}
.tabs-round #focusing {
    background: #ddd;
    color: #000;
}
@media (hover: hover) {
    .tabs-round button:hover {
       background: #eee;
    }
}
.tabs-round button:active {
    background: #e5e5e5;
}
</style>
