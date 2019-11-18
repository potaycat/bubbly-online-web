import Tabs from '@/components/actions/Tabs'
export const _comp_tabs = {
    components: {Tabs},
    data() {
        return {
            currentTab: 0
        }
    },
    methods: {
        newTab(num) {
            this.currentTab = num
        }
    }
}