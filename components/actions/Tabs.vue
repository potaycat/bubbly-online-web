<template>
    <transition name="fade" appear>
        <div class="tabs">
            <button v-for="(tab, index) in tabs"
                :key="index"
                @click="$emit('switchTo', index)"
                v-bind:id="[currentTab==index ? 'focusing' :null]"
            >{{ tab }}</button>
        </div>
    </transition>
</template>

<script>
export default {
    props: [
        'tabs',
        'currentTab',
        'useCase'
    ],
    mounted() {
        if (this.useCase == "topLev") {
        }
    },
}
</script>

<style>
.tabs{
  display: flex;
  padding: 15px 30px;
  z-index: 9999;
  width: 100%;
}
.tabs button{
  margin: auto;
  border-radius: 100px; /* breaks transitions, be careful */
  padding: 5.5px;
  width: 999px;
  font-weight: bold;
  font-size: 11px;
  
  background: #ffffff00;
  color: #00000055;
}
.tabs #focusing {
  background: #ddd;
  color: #000;
}
.tabs :active {
  background: #eee;
}

</style>
