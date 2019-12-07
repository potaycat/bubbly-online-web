import Tabs from '@/components/misc/Tabs'
export const tabs = {
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