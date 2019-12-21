<template>
    <div :class="['cmty-picker', launchLs?'cmty-picker--picking':null,
        pinboard?'cmty-picker--pinboard':null, attention?'--over-here':null
    ]">
        <div class="pickr-main-bar box-shadow-1" @click="launchLs=true">
            <div v-if="!community.icon_img" class="cmty_ico pickr--blank-ico" />
            <img v-else :src="community.icon_img" class="cmty_ico">
            <i class="material-icons-outlined pmb-i">search</i>
            <input class="pickr__cmty-name no-bg"
                :value="nameInput" placeholder="Pick a community"
                @input="nameInput=$event.target.value"
            >
            <i class="material-icons-outlined">{{launchLs?'expand_less':'expand_more'}}</i>
        </div>
        <transition name="fade">
            <!-- TODO refactor this animation -->
            <section v-if="launchLs" class="total_darkness no-bg" @click.self="launchLs=false">
                <transition name="zoom_in_fade" appear>
                    <div class="cmty-pickr-drpdwn shiny-white-bg box-shadow-2">
                        <p v-if="!filtered.length" class="drpdwn__empty">No results</p>
                        <div v-for="cmty in filtered"
                            :key="cmty.id"
                            class="cmty-drpdwn__item glow"
                            @click="$router.replace({query: {to: cmty.id}});
                                launchLs = false;
                                nameInput = getJoinedById(cmty.id).name
                            "
                        >
                            <img :src="cmty.icon_img" class="cmty_ico">
                            <p class="drpdwn__cmty-name">{{cmty.name}}</p>
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
    props: ['pinboard', 'attention'],
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
    margin: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    position: relative;
}
.pickr-main-bar, .cmty-drpdwn__item {
    padding: 4px;
    display: flex;
    align-items: center;
}
.cmty-drpdwn__item {
    padding: 5px 3px;
}

.pickr-main-bar .cmty_ico, .cmty-drpdwn__item .cmty_ico {
    height: 30px;
    min-width: 30px;
    max-width: 30px;
}
.pickr--blank-ico {
    border: dashed 1px #aaa;
}
.pickr__cmty-name, .drpdwn__cmty-name {
    margin-right: auto;
}

.pmb-i {
    font-size: 18px;
    margin-left: 4px;
    color: #888;
    transition: .5s;
    opacity: 0;
}
.pickr__cmty-name {
    font-size: 18px;
    border-width: 1px;
    border-color: #00000000;
    outline: none;
    width: 100%;
    font-size: 16px;
    transition: .2s;
}

.cmty-pickr-drpdwn {
    max-height: 60vh;
    overflow: auto;
    width: 95%;
    margin-top: 120px;
    border-radius: 5px;

}
.drpdwn__cmty-name, .cmty-pickr-drpdwn .cmty_ico {
    margin-left: 10px;
}

.cmty-picker .total_darkness {
    align-items: flex-start;
    /* height: calc(100vh - 96px);
    top: 96px; */
}


.cmty-picker--picking .pickr-main-bar {
    z-index: 99999999;
}
.cmty-picker--picking .pmb-i {
    opacity: 1;
}
.cmty-picker--picking .pickr__cmty-name {
    border-bottom: solid 1px var(--primary-color) !important;
}

.cmty-picker--pinboard {
    pointer-events: none;
}
.cmty-picker--pinboard i:last-child {
    display: none;
}
.cmty-picker.--over-here .pickr__cmty-name {
    border-bottom: solid 1px red;
}.cmty-picker.--over-here .pickr__cmty-name::placeholder {
    color: red;
}
.drpdwn__empty {
    color: #888;
    text-align: center;
    padding: 5px;
}
</style>