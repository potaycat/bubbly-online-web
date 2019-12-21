<template>
    <div class="feeding-status-ctnr">
        <h3 class="empty-fetchedLs" v-if="!isFetching && !listLen && headsup">
            {{ headsup }}
        </h3>
        <Spinner class="feeding-status__spinner" v-if="isFetching" />
    </div>
</template>

<script>
import Spinner from '@/components/misc/Spinner'
export default {
    components: {Spinner},
    props: {
        isFetching: {},
        listLen: {},
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
</style>