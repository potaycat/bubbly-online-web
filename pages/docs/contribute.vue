<template>
    <div>
        <ActivityView />
        <section class="doc-content --dtail-app-bar">
            <p></p>
            <h3>😃 Like what's around here?</h3>
            <p>
                Bubbly was made entirely by a college kid in his free time.
                Keeping the site up and running wouldn't be possible without
                your help.
            </p>
            <p>
                Consider donating by:
            </p>
            <p>
                You can also help out the project by emailing
                <a href="mailto:hoanglongmit@gmail.com?subject=I want Bubbly endorsement"
                    class="hoverline">hoanglongmit@gmail.com</a>
            </p>
            <p style="font-family:monospace,monospace;font-size:10px">
                <br>-----------<br>
                // TODO<br>
                - ranked posts (sort by hot)<br>
                - password reset sequence<br>
                - multilang<br>
                - async notification (performance boost)<br>
                - VIP accounts<br>
                - OAuth login with Facebook/Google<br>
                - prettier logo<br>
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
    components: {ActivityView}
}
</script>
