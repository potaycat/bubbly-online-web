<template>
    <section class="active_in">
        <h3 id="tt">Joined communities</h3>
        <CList v-for ="membership in memberships"
            :key= "membership.timestamp"
            :community = "membership.community"
            :reputation_point = "membership.reputation_point"
        />
        <span id="sm">See all</span>
    </section>
</template>

<script>
import CList from './CList'
export default {
    props: [
		'memberships',
    ],
    components: {
        CList,
    },
}
</script>

<style>
.active_in {
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
.active_in #tt{
    font-weight: normal;
    padding: 11px 16px;
}
.active_in #sm{
    padding: 9px;
    text-align: center;
}

</style>
