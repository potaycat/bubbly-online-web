<template>
    <transition name="fade" appear>
        <div class="c-info card">
            <img id="cover" :src="community.cover_img" />
            <img class="comu_icon" :src="community.icon_img" />
            <section class="card-container">
                <div id="smol-info">Public • 1234 members</div>
                <div id="name">
                    What a heella long name dont you think question mark
                </div>
                <div id="bio">{{ community.moto }}</div>
                <div class="c-actions">
                    <Button text="Join" fill/>
                </div>
            </section>
        </div>
    </transition>
</template>

<script>
import Button from "@/components/actions/Button";
export default {
    components: {
        Button
    },
    props: ["community"]
};
</script>

<style scoped>
.c-info {
    max-width: 950px;
    min-width: 300px;
    margin: 0 8px;
}

.c-info #cover {
    border-radius: 15px 15px 0 0;
    /*box-shadow: inset 0 0 10px #000;*/
    /* top: 0; */
    right: 0;
    width: 100%;
    height: 270px;
    z-index: -1;
}
.c-info .comu_icon {
    border: 3px solid #fff;
    position: relative;
    left: 11px;
    margin-top: -70px;
    width: 100px;
    height: 100px;
}
.c-info #smol-info {
    color: gray;
    /* text-align: right; */
    margin: -27px 0 7px 105px;
    font-size: 14px;
}
.c-info #name {
    margin: 2px 0 5px;
    font-weight: bold;
    font-size: 23px;
}
.c-info #bio {
    padding: 10px 0;
    /* text-align: center; */
}

.c-actions {
    padding: 8px 0 20px;
    width: 100%;
}
</style>
