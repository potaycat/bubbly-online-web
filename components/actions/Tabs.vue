<template>
    <transition name="fade">
        <div v-if="tabList" class="tabs">
            <button v-for="(tab, index) in tabList"
                :key="index"
                @click="$store.commit('changeSubTab', index)"
                v-bind:id="[activeSubTab==index ? 'focusing' :null]"
            >{{ tab }}</button>
        </div>
    </transition>
</template>

<script>
export default {

}
</script>

<style>

</style>
