<template>
    <section class="relationships">
        <h3 id="flng">Following</h3>
        <div id="s">
            <n-link class="pfp-l" :to="'/user/' + user.to_user.username" v-for="user in following" :key="user.id">
                <img class="relation_pfp" :src="user.to_user.profile_pic"/>
            </n-link>
        </div>

        <h3 id="flr">Followers</h3>
        <div id="s">
            <n-link class="pfp-l" :to="'/user/' + user.from_user.username" v-for="user in followers" :key="user.id">
                <img class="relation_pfp" :src="user.from_user.profile_pic"/>
            </n-link>
        </div>
    </section>
</template>

<script>
export default {
    props: [
        'followers',
        'following',
    ]
}
</script>

<style>
.relationships {
    background-color: white;
    max-width: 700px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    
    border-radius: 15px;
    border: 1px;
    border-style: solid;
    border-color: #ccc;

    margin: 12px 8px 0 8px;
    display: flex;
    flex-direction: column;
}
.relationships #flng{
    font-weight: normal;
    padding: 12px;
}

.relationships #flr{
    font-weight: normal;
    padding: 8px 0 12px 12px;
    border: 0;
    border-top: 1px;
    border-style: solid;
    border-color: #ccc;
}

.relationships #s{
    display: flex;
}
.relationships .pfp-l{
    margin: 0 0 8px 12px ;
}

.relation_pfp {
    border-radius: 50%;
    width: 35px;
    height: 35px;
}
</style>
