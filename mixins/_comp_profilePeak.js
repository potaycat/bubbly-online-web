import ProfilePeak from '@/components/chat/room/ProfilePeak'
export const _comp_profilePeak = {
    components: {ProfilePeak},
    data() {
        return {
            touchPos: null, // {x: 0, y: 0}
            peakingAt: null,
        }
    },
    methods: {
        popItUp(payload) {
            // payload: {pos: $event, profile: profileObj}
            this.touchPos = {
                x: payload.pos.clientX || 20,
                y: payload.pos.clientY || 20
            }
            this.peakingAt = payload.profile
        },
        onClose() {
            this.peakingAt = null
        }
    }
}