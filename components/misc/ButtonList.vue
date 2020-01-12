<template>
    <div style="width:100%">
        <div v-for="(cmdGroup, i) in allCommands" class="generic-btn-ls__group" :key="i">
            <div v-for="(cmd, j) in cmdGroup" :key="j"
                class="generic-btn-ls__btn glow" :style="cmd.style"
                @click="$parent[cmd.action]()"
            >
                <i class="material-icons-round">{{ cmd.icon }}</i>
                <p>{{ cmd.lable }}</p>
                <i class="material-icons-round">{{ cmd.scndIcon }}</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['allCommands']
}
</script>



<style>
.generic-btn-ls__group {
    margin-top: 20px;
}
.generic-btn-ls__btn {
    width: 100%;
    border-bottom: solid 1px #ddd;
    padding: 12px 20px;
    display: flex;
}
.generic-btn-ls__btn > p {
    margin: 0 auto 0 15px;
}

.mnge__mod-list > h4 {
    margin: 60px 0 10px 15px;
    color: #999;
}
</style>