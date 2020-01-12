<template>
    <div>
        <ActivityView />
        <section class="doc-content --dtail-app-bar">
            <h3></h3>
            <p>
                As a newly established social network, we aspire to deliver an enjoyable 
                experience. And don't forget to spread the word with your friends 🎉 :D
            </p>
            <h3>How is community type determined?</h3>
            <p>
                A community can be:<br>
                - Public: Anyone can view and join<br>
                - Closed: Anyone can view. Anyone with an invite code can join<br>
                - Secret: Only members can view. Anyone with an invite code can join<br>
            </p>
            <h3>Why isn't my reputation updating?</h3>
            <p>
                Please allow up to 3 hours for your reputation score to update
            </p>
            <h3>My GIFs are not animating</h3>
            <p>
                GIFs and PNGs will not be compressed as long as they are less than 256kB
            </p>
        </section>
    </div>
</template>

<script>
import ActivityView from '@/components/layout/ActivityView'
export default {
    meta: {
        useAppBar: true,
        disableHamburger: true,
        appBarTitle: "About and FAQs"
    },
    components: {ActivityView}
}
</script>
