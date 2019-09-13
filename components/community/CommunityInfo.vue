<template>
    <section class="c_info">
        <img id="pic" :src="community.icon_img" />
        <div class="big_pic">
            <img id="cover" :src="community.cover_img" />
            <section id="name">{{ community.name }}</section>
            <section id="bio">{{ community.moto }}</section>
            <div class="c_actions">
                <div class="bt">
                    <Button text="Join" fill />
                </div>
            </div>
        </div>
    </section>
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
.big_pic {
    background-color: white;
    max-width: 950px;
    min-width: 300px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    border-radius: 15px;
    margin: -8px 8px 0 8px;
}
.big_pic #cover {
    border-radius: 15px 15px 0 0;
    /*box-shadow: inset 0 0 10px #000;*/
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    z-index: -1;
}
#pic {
    border: 3px solid #fff;
    position: relative;
    top: 340px;
    left: 20px;
    border-radius: 25%;
    width: 100px;
    height: 100px;
    margin-top: -999px;
}
.big_pic #name {
    margin: 5px 0 0 125px;
    font-weight: bold;
    font-size: 24px;
}
.big_pic #bio {
    padding: 12px 17px;
    /* text-align: center; */
}

.c_actions {
    padding: 7px 17px 17px 17px;
    display: flex;
    justify-content: center;
}

.c_actions .bt {
    width: 100%;
    margin: auto;
}
</style>
