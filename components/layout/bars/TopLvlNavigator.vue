<template>
    <nav class="bottom-nav-bar" v-if="$store.state.topLevelDestination">
        <i v-for="icon in topLevelDestinLs" :key="icon.id"
            :style="icon.id==$store.state.topLevelDestination ?
                'color:rgb(72, 133, 237)' : 'color:#ddd' "
            @click="$router.push(icon.toRoute)"
            class="push lift material-icons-round">{{icon.icon}}
        </i>
    </nav>
</template>

<script>
export default {
    data: () => ({
        topLevelDestinLs: [
            {
                id: 1,
                icon: "home",
                toRoute: "/homefeed"
            },
            {
                id: 5,
                icon: "search",
                toRoute: "/explore"
            },
            {
                id: 2,
                icon: "group_work",
                toRoute: "/community"
            },
            {
                id: 3,
                icon: "chat_bubble",
                toRoute: "/chat"
            },
            {
                id: 4,
                icon: "notifications",
                toRoute: "/notifications"
            },
        ]
    }),
}
</script>

<style>
.bottom-nav-bar {
    background-color: #fff;
    position: absolute;
    bottom: 0;
    z-index: 99;
    width: 100%;
    box-shadow: 0 0 20px rgba(0,0,0,0.15);
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.bottom-nav-bar > i {
    padding: 12px;
    font-size: 27px;
    border-radius: 20px;
}
</style>