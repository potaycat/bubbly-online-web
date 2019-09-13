<template>
    <n-link class="membership-block" :to="'/community/' + community.slug">
        <img id="cp" :src="community.c_icon_img"/>
        <div id="mb-txt">
            <span id="c-name">{{ community.name }}</span>
            <span id="repu">Reputation: {{ reputation_point}}</span>
        </div>
    </n-link>
</template>

<script>
export default {
    props: [
		'joined_date',
		'community',
		'is_mod',
		'reputation_point',
    ],
}
</script>

<style scoped>
.membership-block {
    background: rgb(252, 252, 252);

    border: 0;
    border-top: 1px;
    border-bottom: 1px;
    border-style: solid;
    border-color: #ccc;

    width: 100%;
    height: auto;
    margin: 0;

    display: flex;

}
.membership-block #cp {
    border-radius: 25%;
    width: 50px;
    height: 50px;
    margin: 15px;
}

.membership-block #mb-txt{
    display: flex;
    flex-direction: column;
}
.membership-block #repu {
    font-size: 14px;
    margin: 1px;
}
.membership-block #c-name {
    font-weight: bold;
    font-size: 20px;
    margin: 18px 0 0 0;
}
</style>
