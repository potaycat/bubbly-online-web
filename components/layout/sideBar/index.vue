<template>
    <div class="side-bar-ctnr">
        <keep-alive>
            <component class="side-bar" :is="currentRoute" />
        </keep-alive>
    </div>
</template>

<script>
import Generic from "./Generic"
import Cmtymembers from "./CmtyMembers"
import Postreactors from "./PostReactors"
export default {
    components: {
        Generic,
        Cmtymembers,
        Postreactors,
    },
    computed: {
        currentRoute() {
            switch (this.$route.name) {
                case 'home' || 'explore':
                    return 'generic'
                case 'explore':
                    return 'generic'
                case 'communities-id':
                    return 'cmtymembers'
                case 'post-slug':
                    return 'postreactors'
                default:
                    return ''
            }
        }
    }
};
</script>

<style>
.side-bar-ctnr {
    position: absolute;
    left: calc(15% + 580px);
    top: 0;
    width: 24%;
    max-height: 100vh;
}
@media only screen and (min-width: 1200px) {
    .side-bar-ctnr {
        position: relative;
        left: unset;
        width: 310px;
        margin-left: 30px;
    }
}

.side-bar .side-bar__item {
    margin-top: 64px;
    border-radius: 20px;
    background: #f7f7f7;
    transition: .3s;
    max-height: 40vh;
}
</style>