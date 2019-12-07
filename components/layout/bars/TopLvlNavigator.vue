<template>
    <nav :class="['bottom-nav-bar', $store.state.topLevelDestination?null:'--not-top']">
        <div v-for="icon in topLevelDestinLs" :key="icon.id"
            @click="$router.push(icon.toRoute)"
            class="push lift bottom-nav__btn"
            :style="icon.id==$store.state.topLevelDestination ?
                'color:rgb(72, 133, 237)' : 'color:#ccc'"
        >
            <i class="material-icons-round">{{icon.icon}}</i>
            <p>{{ icon.lable }}</p>
        </div>
    </nav>
</template>

<script>
export default {
    data: () => ({
        topLevelDestinLs: [
            {
                id: 1,
                icon: "home",
                toRoute: "/home",
                lable: "Home"
            },
            {
                id: 5,
                icon: "search",
                toRoute: "/explore",
                lable: "Explore"
            },
            {
                id: 2,
                icon: "group_work",
                toRoute: "/community",
                lable: "Communities"
            },
            {
                id: 3,
                icon: "chat_bubble",
                toRoute: "/chat",
                lable: "Messaging"
            },
            {
                id: 4,
                icon: "notifications",
                toRoute: "/notifications",
                lable: "Notifications"
            },
        ]
    }),
}
</script>

<style>
.bottom-nav-bar {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    z-index: 99;
    width: 100%;
    box-shadow: 0 0 20px rgba(0,0,0,0.15);
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.bottom-nav__btn {
    padding: 12px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    /* justify-content: center; */
}
.bottom-nav__btn > i {
    font-size: 27px;
}
.bottom-nav__btn > p {
    display: none;
}
.--not-top {
    display: none;
}

@media only screen and (min-width: 500px) {
    .--not-top {
        display: flex;
    }
    .bottom-nav-bar {
        position: absolute;
        width: 65px;
        left: 0;
        height: 100vh;
        box-shadow: none;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        font-size: 22px;
    }
    .bottom-nav__btn {
        width: 80%;
        text-align: center;
        margin: 5px 0;

        background: linear-gradient(-70deg, white 50%, #666 50%);
        background-size: 210%;
        background-position: right bottom;
    }
    .bottom-nav__btn:hover {
        background-position: left bottom;
    }
}
@media only screen and (min-width: 1100px) {
    .bottom-nav-bar {
        width: 20%;
        /* margin-left: calc(50% - 550px); */
    }
    .bottom-nav__btn {
        width: 200px;
        /* margin-right: auto; */
    }
    .bottom-nav__btn > p {
        display: inline;
        margin-left: 10px;
        font-weight: bolder;
        font-size: 20px;
    }
}
</style>