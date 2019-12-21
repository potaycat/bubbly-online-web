<template>
    <div class="blank-layout-ctnr">
        <style>
            :root {
                --primary-color: #ee981e;
                --secondary-color: #ee55a4;
            }
        </style>
        <transition name="page_zoom">
            <Nuxt class='blank-layout'/>
        </transition>
    </div>
</template>

<style>
.blank-layout-ctnr {
    display: flex;
    justify-content: center;
}
.blank-layout {
    width: 550px;
    position: relative;
}
</style>