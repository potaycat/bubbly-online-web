export const feedingFrenzy = {
    data() {
        return {
            fetchedData: [],
            loading4More: false,
            reachedEnd: false,
        }
    },
    computed: {
        scrolling_up() {
            return this.$store.state.scrollinUp
        },
        lastScrollPosition() {
            let p = this.$store.state.scrollPosition[this.cache]
            if (p) return p
            return 0
        }
    },
    prevST: 0,
    
    methods: {
        fetch(offset) {
            this.loading4More = true
            this.$axios.get(this.urlConstruct(offset),
                this.$store.state.pheader)
            .then(res => {
                if (res.data.length == 0) this.reachedEnd = true
                this.fetchedData.push(...res.data);
                this.loading4More = false
                // return res.data
            })
        },
    },
    
    created() {
        // let stored = JSON.parse( localStorage.getItem(this.cache) )
        // if (stored){
        //     this.fetchedData = stored
        // }
        let stored2 = this.$store.state.ramCache[this.cache]
        if (stored2){
            this.fetchedData = stored2
        }
        
        if (this.lastScrollPosition > -1) {
            this.loading4More = true
            this.$axios.get(this.urlConstruct(), this.$store.state.pheader)
            .then((res) => {
                this.fetchedData = []
                this.fetchedData.push(...res.data)
                this.loading4More = false
                // localStorage.setItem(this.cache, JSON.stringify(res.data))
                // this.postProcessing()
            })
        }
    },
    mounted() {
        if (!this.scrolling_up) this.$store.commit('toggleScrDir')

        let container = document.querySelector(".la_content")
        container.scrollTop = this.lastScrollPosition
        container.addEventListener('scroll', () => {
            // scroll direction
            if (container.scrollTop > this.$options.prevST) {
                if (this.scrolling_up) this.$store.commit('toggleScrDir')
            } else if (!this.scrolling_up) this.$store.commit('toggleScrDir')
            this.$options.prevST = container.scrollTop

            // infinite scroll
            if (container.scrollTop + container.clientHeight <= container.scrollHeight-200) {
                // SCROLLED TO BOTTOM
                if (!this.loading4More && !this.reachedEnd) {
                    // this.fetch(this.peeps[this.peeps.length - 1].id)
                }
            }
        }, {
            capture: true,
            passive: true
        })
    },
    destroyed() {
        this.$store.commit('keepLastPosition', {
            'key': this.cache,
            'pos': this.$options.prevST
        })
        // this.$store.commit('keepLastPosition2', {
        //     'key': this.cache,
        //     'pos': this.fetchedData
        // })
    },
}