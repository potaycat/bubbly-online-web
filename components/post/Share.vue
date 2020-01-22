<template>
<transition name="fade" appear >
    <div class="total_darkness no-bg is-fixed" @click.self="close">
        <transition name="zoom_from_click" appear @enter="enter" >
            <div class="share-ctnr shiny-white-bg box-shadow-3">
                <div class="share__service glow"
                    v-for="service in [
                        {action: 'rePost', title: 'Write a post with link to this post', icon: 'create'},
                        ...moreSharingoption
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
                    :href="`http://twitter.com/share?url=${postLink}&text=${sharePhrase}`"
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
    props: [ 'post' ],
    computed: {
        sharePhrase() {
            return (this.post.title ? this.post.title+" -" : "From") + " Bubbly"
        },
        postLink() {
            // return `${window.location.origin}/post/${this.post.slug||this.post.id}`
            return `${window.location.origin}/post/${this.post.id}/${this.post.slug||""}`
        },
        moreSharingoption() {
            if (navigator.share) { // Web Share API
                return [{action: 'launchWebShareAPI', title: 'More...', icon: '_'}]
            } else {
                return [
                    {action: 'copyURL', title: 'Copy post URL', icon: 'link'},
                    {action: 'fbShare', title: 'Share to Facebook', icon: 'share'},
                    {action: 'twitterShare', title: 'Share to Twitter', icon: 'share'},
                ]
            }
        }
    },
    methods: {
        launchWebShareAPI() {
            navigator.share({
                title: this.sharePhrase,
                url: this.postLink
            })
                .then(() => {
                    this.close()
                })
                .catch(console.error)
        },
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
                })
        }
    },
}
</script>

<style>
.share-ctnr {
    padding: 10px 0;
    max-width: 320px;
    border-radius: 10px;
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
