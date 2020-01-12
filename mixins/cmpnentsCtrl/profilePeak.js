import ProfilePeak from '@/components/chat/room/ProfilePeak'
import { parent } from '../fancyTransition/zoom_from_click'
export const profilePeak = {
    components: {ProfilePeak},
    mixins: [parent],
    data:() => ({
        peakingAt: null,
    }),
    methods: {
        performDisplay(profile) { // zoom_from_click mixin
            this.peakingAt = profile
        },
        onClose(didSomething) {
            this.peakingAt = null
            if (didSomething) {
                this.onDidSomething()
            }
        },
        onDidSomething() {
            console.log("ProfilePeak did something")
        }
    }
}