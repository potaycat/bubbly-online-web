<template>
    <div>
        <keep-alive>
        
        <Mien />
        <!-- <FindChats v-if="activeSubTab==1" /> -->
        </keep-alive>
    </div>
</template>

<script>
import Mien from './list/Mien'
// import Find from './list/ExploreChats'

export default {
    components: {
        Mien,
        // FindChats,
    },
    data() {
        return {
        }
    },
}
</script>

<style>
</style>
