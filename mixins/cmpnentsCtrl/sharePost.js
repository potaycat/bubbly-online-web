import Share from '@/components/post/Share'
import { parent } from '../fancyTransition/zoom_from_click'
export const sharePost = {
    components: { Share },
    mixins: [parent],
    data:() => ({
        sharing: false,
    }),
    methods: {
        onClose() {
            this.sharing = false
        },
    }
}