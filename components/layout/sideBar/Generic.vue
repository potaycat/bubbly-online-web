<template>
    <div>
        <Cmnties class="side-bar__item"
            title="💪 Check out these great communities 👇"
            :toFetch="cmntyLsUrl"
        />
        <Users class="side-bar__item side-bar__item__rec-users"
            title="✨ Check out these awesome people 👇"
            :toFetch="userLsUrl"
        />
    </div>
</template>

<script>
import Cmnties from './feed/Cmnties'
import Users from './feed/Users'

export default {
    components: { Cmnties, Users },
    computed: {
        cmntyLsUrl() {
            return `communities/?search=${'a'}&limit=5&`
        },
        userLsUrl() {
            return `accounts/?search=${'l'}&limit=5&`
        }
    }
}
</script>

<style>
.side-bar__item__rec-users {
    margin-top: 20px !important;
    /* border-radius: unset !important; */
    /* above code makes mix-blend-mode work bruh */
}
.side-bar__item:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>