export const chatLs = {
    methods: {
        displayLastMsg(msg){
            let string = ""
            // if (msg.author==this.$store.state.jwtlogin.my_profile.id) {
            if (msg.author==this.$store.state.jwtlogin.stored_profile.id) {
                string += "Me: " 
            }
            switch (msg.msg_type) {
                case 1:
                    string += msg.content
                    break;
                case 8:
                    string += "New chat room!"
                    break;
                case 2:
                    string += "[Image]"
                    break;
                case 3:
                    string += "[Youtube video]"
                    break;
                case 4:
                    string += "[Voice note]"
                    break;
            }
            return string
        },
        tiemstamp(le_tiem) {
            let d = new Date(le_tiem);
            let now = new Date();
            
            let h = d.getHours();
            let m = d.getMinutes();
            if(h<10) h='0'+h
            if(m<10) m='0'+m
            let timestampString = h + ':' + m;

            if (now - d > 86400000) {
                let dd = d.getDate();
                let mm = d.getMonth()+1; 
                let yy = d.getFullYear().toString().substr(-2);
                if(dd<10) dd='0'+dd
                if(mm<10) mm='0'+mm
                timestampString = dd + '/' + mm + '/' + yy;
            }
            return timestampString
        },

        toChat(room){
            this.$router.push('/chat/t/' + room.id)
            this.$store.commit('detailBanner/loadPic', {})
            this.$store.commit('detailBanner/loadText', room.name ? room.name : "Chat cộng đồng"); // fix this!
            this.$store.commit('chat/loadChat', room)
        },
    },
}