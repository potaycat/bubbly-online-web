<template>
    <div>
        <ActivityView />
        <section class="doc-content --dtail-app-bar">
            <p></p>
            <h3>😃 Like what's around here?</h3>
            <p>
                Bubbly was made entirely by a college kid in his free time.
                Keeping the site up and running wouldn't be possible without
                your support.
            </p>
            <p>
                Consider donating <a class="hoverline" href="#">here</a>
            </p>
            <p>
                You can also help out the project by emailing
                <a :href="`mailto:${email}?subject=I want Bubbly endorsement`"
                    class="hoverline">{{email}}</a>
            </p>
            <p style="font-family:monospace,monospace;font-size:10px">
                // TODO<br>
                - ranked posts (sort by hotness)<br>
                - password reset sequence<br>
                - multilang<br>
                - VIP accounts<br>
                - async database<br>
                - scalable database (most challenging)<br>
                - ...<br>
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
        appBarTitle: "Donate/Get involved"
    },
    components: {ActivityView},
    data:() => ({
        email: process.env.GENERAL_EMAIL
    })
}
</script>
