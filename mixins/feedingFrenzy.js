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
            return this.fetchedData[this.fetchedData.length-1][this.$options.offsetProp]
        },
        urlConstruct() {
            const u = this.feedUrl
            return `${u.slice(-1)=="&" ? u : u+"?"}offset=${this.offset}`
        },
        scrollCtnr() { return this.$refs.feed },
        empty() {
            return !this.loading4More && !this.fetchedData.length
        }
    },
    created() {
        this.firstFetch()
    },
    mounted() {
        this.scrllActive()
    },
    methods: {
        fetch(url=this.urlConstruct, resAction=this.fillFeeder) {
            this.loading4More = true
            this.$axios.get(url,
                this.$store.state.authHeader)
                .then(res => {
                    if (res.data.length == 0) this.reachedEnd = true
                    resAction(res.data)
                    this.loading4More = false
                })
        },
        fillFeeder(data) {this.fetchedData.push(...data)},
        firstFetch() {
            const replace = (data) => this.fetchedData = data
            this.fetch(this.feedUrl, replace)
            this.reachedEnd = false
            this.$nextTick(() => {
                try {
                    this.scrollCtnr.scrollTop = 0
                } catch (error) {
                    // console.log("CATCHED: "+error)
                }
            })
        },
        scrllActive() {
            const scrllable = this.scrollCtnr
            scrllable.scrollTop = this.lastScrollPosition
            scrllable.addEventListener('scroll', () => {
                // Infinite scroll. 500px till bottom of page
                if (scrllable.scrollTop + scrllable.clientHeight > scrllable.scrollHeight - 500) {
                    if (!this.loading4More && !this.reachedEnd) {
                        this.fetch(this.urlConstruct, this.fillFeeder)
                    }
                }
            }, { capture: false, passive: true })
        }
    },
}

export const postFeed = {
    activated() {
        const update = this.$store.state.postx.currentPost
        if (update) {
            const post = this.fetchedData.find(post => post.id == update.id)
            if (post && update.reactions) {
                post.my_react = update.my_react
                this.$set(post, 'reactions', update.reactions)
                this.$store.commit('postx/loadPost', null)
            }
        }
    },
}

export const refreshFrenzy = {
    activated() {
        this.firstFetch()
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