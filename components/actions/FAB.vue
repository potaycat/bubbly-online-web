<template>
    <div class="FAB lift">
        <button @click="$emit('clicked')">
            <i style="pointer-events: none" class="material-icons-round">{{icon}}</i>
            <transition name="text_begone">
                <span v-if="$store.state.scrollinUp">&nbsp; {{actionName}}</span>
            </transition>
        </button>
    </div>
</template>

<script>
export default {
    props: [
        'actionName',
        'icon',
    ]
}
</script>

<style>
.FAB button{
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 10px rgba(0,0,0,0.23);
    position: fixed;
    bottom: 70px;
    right: 20px;
    background: rgba(72, 133, 237, 0.95);
    border-radius:100px;
    display: flex;
    padding: 16px;
    color: #fff;
}
.FAB span{
    margin: 4px 0;
    pointer-events: none;
}.FAB button :not( :active ){
    transition: .15s;
}

.text_begone-enter-active,
.text_begone-leave-active {
  transition: .2s;
}
.text_begone-enter,
.text_begone-leave-to {
  font-size: 0;
  /* padding-top: 8px; */
  /* opacity: 0; */
}
</style>