import Spinner from '@/components/things/Spinner'
export const feedingFrenzy = {
    components: {Spinner},
    data() {
        return {
            fetchedData: [],
            loading4More: false,
            reachedEnd: false,
        }
    },
    // this.$options.nonReactiveData {
        // cache: 'st_feed',
    // }
    computed: {
        offset() {
            const last = this.fetchedData[this.fetchedData.length-1]
            return last ? last.id : ""
        },
        urlConstruct() {
            const u = this.feedUrl
            return `${u.slice(-1)=="&"?u:u+"?"}offset=${this.offset}`
        },
        scrollCtnr() {return this.$refs.feed},
    },

    created() {
        this.fetchCache()
        this.fetch()
    },
    mounted() {
        this.scrllActive()
    },
    methods: {
        fetchCache() {
            // let stored2 = this.$store.state.ramCache[this.cache]
            // if (stored2) {
            //     this.fetchedData = stored2
            // }
        },
        fetch() {
            console.log("fetching for more");
            
            this.loading4More = true
            this.$axios.get(this.urlConstruct,
                this.$store.state.authHeader)
                    .then(res => {
                        if (res.data.length == 0) this.reachedEnd = true
                        this.fetchedData.push(...res.data)
                        this.fetchedData.push(...res.data)
                        this.fetchedData.push(...res.data)
                        this.fetchedData.push(...res.data)
                        this.loading4More = false
                    })
        },
        scrllActive() {
            const container = this.scrollCtnr
            container.scrollTop = this.lastScrollPosition
            container.addEventListener('scroll', () => {
                // Infinite scroll. 200px till bottom of page
                if (container.scrollTop + container.clientHeight > container.scrollHeight - 200) {
                    if (!this.loading4More && !this.reachedEnd) {
                        this.fetch()
                    }
                }
            }, {capture: true, passive: true})
        }
    },
}

export const scrlDirection = {
    // this.$options.nonReactiveData {
        prevScrTp: 0,
    // }
    computed: {
        scrolling_up() {
            return this.$store.state.scrollinUp
        },
    },
    mounted() {
        if (!this.scrolling_up) this.$store.commit('toggleScrDir')
        const container = this.$refs.feed
        container.scrollTop = this.lastScrollPosition
        container.addEventListener('scroll', () => {
            if (container.scrollTop > this.$options.prevScrTp) {
                if (this.scrolling_up) this.$store.commit('toggleScrDir')
            } else if (!this.scrolling_up) this.$store.commit('toggleScrDir')
            this.$options.prevScrTp = container.scrollTop
        }, {
            capture: true,
            passive: true
        })
    },
}