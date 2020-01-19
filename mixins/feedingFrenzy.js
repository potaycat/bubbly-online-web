import StatusIndicator from '@/components/misc/feedingFrenzy/StatusIndicator'
export const feedingFrenzy = {
    components: {StatusIndicator},
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
        lastInList() {
            return this.fetchedData[this.fetchedData.length-1]
        },
        urlConstruct() {
            const u = this.feedUrl
            return `${u.slice(-1)=="&" ? u : u+"?"}offset=${this.lastInList[this.$options.offsetProp]}`
        },
        scrollCtnr() { return this.$refs.feed },
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
                this.$store.state.auth.head)
                .then(res => {
                    if (res.data.length == 0) this.reachedEnd = true
                    resAction(res.data)
                    this.loading4More = false
                })
        },
        fillFeeder(data) {this.fetchedData.push(...data)},
        firstFetch() { // careful as it may duplicated requests
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
    watch: {
        'fetchedData.length'(newVal) { // virtual scroll substitute
            if (newVal > 100) {
                this.fetchedData = this.fetchedData.slice(-10)
            }
        }
    },
    activated() {
        const update = this.$store.state.postx.currentPost
        if (update) {
            const post = this.fetchedData.find(post => post.id == update.id)
            if (post && update.reactions) {
                post.my_react = update.my_react
                this.$set(post, 'reactions', update.reactions)
                this.$store.commit('postx/LOAD_POST', null)
            }
        }
    },
}

export const refreshFrenzy = {
    activated() {
        if (this.fetchedData.length) {
            this.firstFetch()
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
    activated() { if (!this.scrolling_up) this.$store.commit('TOGGLE_SCRL_DIR') },
    mounted() {
        const scrllable = this.scrollCtnr
        scrllable.scrollTop = this.lastScrollPosition
        scrllable.addEventListener('scroll', () => {
            if (scrllable.scrollTop > this.$options.prevScrTp) {
                if (this.scrolling_up) this.$store.commit('TOGGLE_SCRL_DIR')
            } else if (!this.scrolling_up) this.$store.commit('TOGGLE_SCRL_DIR')
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
                }, 90)
            })
        });
    }
}