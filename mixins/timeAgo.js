export const timeAgo = {
    methods: {
        timeAgo(le_tiem) {
            let d = new Date(le_tiem)
            let now = new Date()
            
            let delta = now - d

            let timestampString = delta + " ago"

            return timestampString
        },
    },
}