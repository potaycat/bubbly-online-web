<template>
<transition name="fade" appear >
    <div class="total_darkness no-bg" @click.self="close">
        <transition name="zoom_from_click" appear @enter="enter" >
            <div class="share-ctnr shiny-white-bg box-shadow-3">
                <div class="share__service glow"
                    v-for="service in [
                        {action: 'rePost', title: 'Write a post with link to this post', icon: 'create'},
                        {action: 'copyURL', title: 'Copy post URL', icon: 'link'},
                        {action: 'fbShare', title: 'Share to Facebook', icon: 'share'},
                        {action: 'twitterShare', title: 'Share to Twitter', icon: 'share'},
                    ]"
                    :key="service.action"
                    @click="performAct(service.action)"
                >
                    <i class="material-icons-round">{{ service.icon }}</i>
                    {{ service.title }}
                </div>

                <a 
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${postLink}`"
                    ref="fbLink" target="_blank" style="display:none"
                />
                <a 
                    :href="`http://twitter.com/share?url=${postLink}&text=${$options.sharePhrase}`"
                    ref="twitterLink" target="_blank" style="display:none"
                />

            </div>
        </transition>
    </div>
</transition>
</template>

<script>
import { child } from '@/mixins/fancyTransition/zoom_from_click'

export default {
    mixins: [child],
    props: ['postId'],
    // consts {
        sharePhrase: encodeURIComponent("Từ Bubbly"),
    //},
    computed: {
        postLink() {
            return `${window.location.origin}/post/${this.postId}`
        }
    },
    methods: {
        close() {
            this.$parent.onClose()
        },
        performAct(method) {
            this[method]()
            this.close()
        },

        fbShare() { this.$refs.fbLink.click() },
        twitterShare() { this.$refs.twitterLink.click() },
        rePost() { this.$router.push(`/post/compose?init=${this.postLink}`) },
        copyURL() {
            navigator.clipboard.writeText(this.postLink)
                .then(() => {
                })
                .catch(err => {
                    console.error('CATCHED: ', err);
                });
        }
    },
}
</script>

<style>
.share-ctnr {
    padding: 10px 0;
    max-width: 320px;
    border-radius: 10px;
    overflow: hidden;
}
.share__service {
    padding: 10px;
    display: flex;
    align-items: center;
}
.share__service > i {
    margin: 0 12px 0 0;
}
</style>
