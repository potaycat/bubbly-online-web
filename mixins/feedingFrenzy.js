import Spinner from '@/components/misc/Spinner'
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
        offsetProp: 'id',
    // }
    computed: {
        offset() {
            const last = this.fetchedData[this.fetchedData.length - 1]
            return last ? last[this.$options.offsetProp] : ""
        },
        urlConstruct() {
            const u = this.feedUrl
            return `${u.slice(-1) == "&" ? u : u + "?"}offset=${this.offset}`
        },
        scrollCtnr() { return this.$refs.feed },
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
            this.loading4More = true
            this.$axios.get(this.urlConstruct,
                this.$store.state.authHeader)
                .then(res => {
                    if (res.data.length == 0) this.reachedEnd = true
                    this.fetchedData.push(...res.data)
                    this.loading4More = false
                })
        },
        fetchNRefresh() {
            this.loading4More = true
            this.$axios.get(this.feedUrl,
                this.$store.state.authHeader)
                .then(res => {
                    this.fetchedData = res.data
                    this.loading4More = false
                })
        },
        scrllActive() {
            const scrllable = this.scrollCtnr
            scrllable.scrollTop = this.lastScrollPosition
            scrllable.addEventListener('scroll', () => {
                // Infinite scroll. 200px till bottom of page
                if (scrllable.scrollTop + scrllable.clientHeight > scrllable.scrollHeight - 200) {
                    if (!this.loading4More && !this.reachedEnd) {
                        this.fetch()
                    }
                }
            }, { capture: false, passive: true })
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
        scrollCtnr() { return this.$refs.feed },
    },
    activated() { if (!this.scrolling_up) this.$store.commit('toggleScrDir') },
    mounted() {
        const scrllable = this.scrollCtnr
        scrllable.scrollTop = this.lastScrollPosition
        scrllable.addEventListener('scroll', () => {
            if (scrllable.scrollTop > this.$options.prevScrTp) {
                if (this.scrolling_up) this.$store.commit('toggleScrDir')
            } else if (!this.scrolling_up) this.$store.commit('toggleScrDir')
            this.$options.prevScrTp = scrllable.scrollTop
        }, {
            capture: false,
            passive: true
        })
    },
}


export const maintainScrllPos = {
    // https://github.com/vuejs/vue-router/issues/1187
    data: () => ({
        scroll_positions: {},
    }),
    mounted() {
        this.$router.afterEach((to, from) => {
            this.scroll_positions[from.name] = this.scrollCtnr.scrollTop;

            let scroll = 0;
            if (this.scroll_positions.hasOwnProperty(to.name)) {
                scroll = this.scroll_positions[to.name];
            }
            this.$nextTick(() => {
                setTimeout(() => { // TODO fix
                    this.scrollCtnr.scrollTop = scroll
                }, 100)
            })
        });
    }
}