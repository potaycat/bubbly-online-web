<template>
    <div :class="['cmnty-picker', launchLs?'cmnty-picker--picking':null, pinboard?'cmnty-picker--pinboard':null]">
        <div class="pickr-main-bar box-shadow-1" @click="launchLs=true">
            <div v-if="!community.icon_img" class="cmnty_ico pickr--blank-ico" />
            <img v-else :src="community.icon_img" class="cmnty_ico">
            <i class="material-icons-outlined pmb-i">search</i>
            <input class="pickr__cmnty-name no-bg"
                :value="nameInput" placeholder="Pick a community"
                @input="nameInput=$event.target.value"
            >
            <i class="material-icons-outlined">{{launchLs?'expand_less':'expand_more'}}</i>
        </div>
        <transition name="fade">
            <!-- TODO refactor this animation -->
            <section v-if="launchLs" class="total_darkness no-bg" @click.self="launchLs=false">
                <transition name="zoom_in_fade" appear>
                    <div class="cmnty-pickr-drpdwn shiny-white-bg box-shadow-2">
                        <div v-for="cmnty in filtered"
                            :key="cmnty.id"
                            class="cmnty-drpdwn-item glow"
                            @click="$router.replace({query: {to: cmnty.id}});
                                launchLs = false;
                                nameInput = getJoinedById(cmnty.id).name
                            "
                        >
                            <img :src="cmnty.icon_img" class="cmnty_ico">
                            <p class="drpdwn__cmnty-name">{{cmnty.name}}</p>
                        </div>
                    </div>
                </transition>
            </section>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    data:() => ({
        launchLs: false,
        nameInput: ""
    }),
    props: ['pinboard'],
    watch: {
        launchLs: {
            immediate: true,
            handler(boolVal) {
                if (boolVal) {
                    this.nameInput = ""
                } else if (!this.nameInput) {
                    this.nameInput = this.community.name
                } // because watcher runs before route change, results in previous community
            },
        },
    },
    computed: {
        ...mapGetters({
            getJoinedById: 'communityx/getJoinedById',
        }),
        community() {
            return this.getJoinedById(this.$route.query.to) || {}
        },
        listDisplay() {
            return this.$store.state.communityx.joined
        },
        filtered() {
            if (!this.nameInput) {
                return this.listDisplay
            }
            return this.listDisplay.filter(obj => {
                return obj.name
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd')
                    .includes(
                        this.nameInput
                            .toLowerCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .replace(/đ/g, 'd')
                    )
            })
        }
    },
    activated() {
        this.nameInput = this.community.name // keep-alive bruh
    },
    created() {
        this.$store.dispatch("communityx/getJoinedCmnties")
    }
}
</script>

<style>
.pickr-main-bar {
    margin: 15px 10px;
    border-radius: 10px;
    position: relative;
}
.pickr-main-bar, .cmnty-drpdwn-item {
    padding: 4px;
    display: flex;
    align-items: center;
}
.cmnty-drpdwn-item {
    padding: 5px 3px;
}

.pickr-main-bar .cmnty_ico, .cmnty-drpdwn-item .cmnty_ico {
    height: 30px;
    min-width: 30px;
    max-width: 30px;
}
.pickr--blank-ico {
    border: dashed 1px #aaa;
}
.pickr__cmnty-name, .drpdwn__cmnty-name {
    margin-right: auto;
}

.pmb-i {
    font-size: 18px;
    margin-left: 4px;
    color: #888;
    transition: .5s;
    opacity: 0;
}
.pickr__cmnty-name {
    font-size: 18px;
    border-width: 1px;
    border-color: #00000000;
    outline: none;
    width: 100%;
    font-size: 16px;
    transition: .2s;
}

.cmnty-pickr-drpdwn {
    max-height: 60vh;
    overflow: auto;
    width: 100%;
    margin: 111px 10px 0 10px;
    border-radius: 5px;

}
.drpdwn__cmnty-name, .cmnty-pickr-drpdwn .cmnty_ico {
    margin-left: 10px;
}

.cmnty-picker .total_darkness {
    align-items: flex-start;
    /* height: calc(100vh - 96px);
    top: 96px; */
}


.cmnty-picker--picking .pickr-main-bar {
    z-index: 99999999;
}
.cmnty-picker--picking .pmb-i {
    opacity: 1;
}
.cmnty-picker--picking .pickr__cmnty-name {
    border-bottom: solid 1px deepskyblue;
}

.cmnty-picker--pinboard {
    pointer-events: none;
}
.cmnty-picker--pinboard i:last-child {
    display: none;
}
</style>