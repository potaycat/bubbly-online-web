<template>
    <div class="feeding-status-ctnr">
        <Spinner v-if="isFetching" class="feeding-status__spinner"/>
        <div v-else-if="listLen" class="reached-end">•</div>
        <h3 v-else-if="!listLen && headsup" class="empty-fetchedLs">
            {{ headsup }}
        </h3>
    </div>
</template>

<script>
import Spinner from '@/components/misc/Spinner'
export default {
    components: {Spinner},
    props: {
        listLen: Number,
        isFetching: Boolean,
        headsup: {
            type: String,
            default: "Nothing to see here... yet."
        },
    }
};
</script>

<style>
.feeding-status-ctnr {
    align-self: center;
    display: flex;
    justify-content: center;
}
.feeding-status__spinner {
    margin-top: 15px;
}
.empty-fetchedLs {
    color: #999;
    margin: 30px;
    text-align: center;
}
.reached-end {
    color: #ccc;
    font-size: 39px;
}
</style>