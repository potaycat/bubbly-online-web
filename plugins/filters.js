import Vue from "vue"

Vue.filter('timeAgo', value => {
    const delta = new Date() - new Date(value)
    const output = delta + " ago"
    return output
});

Vue.filter('tiemstamp', value => {
    const d = new Date(value);
    const now = new Date();
    
    let h = d.getHours();
    let m = d.getMinutes();
    if(h<10) h='0'+h
    if(m<10) m='0'+m
    let timeStr = h + ':' + m;

    if (now - d > 86400000) {
        let dd = d.getDate();
        let mm = d.getMonth()+1; 
        let yy = d.getFullYear().toString().substr(-2);
        if(dd<10) dd='0'+dd
        if(mm<10) mm='0'+mm
        timeStr = dd + '/' + mm + '/' + yy;
    }
    return timeStr
});

Vue.filter('lastMsgDspl', msg => {
    let message = ""
    // if (msg.author.username==store.state.auth.my_profile.username) {
    //     message += "Me: " 
    // }
    switch (msg.msg_type) {
        case 1:
            message += msg.content
            break
        case 2:
            message += "[Image]"
            break
        case 3:
            message += "[Youtube video]"
            break
        case 4:
            message += "[Voice note]"
            break
        case 8:
            message += "New chat room!"
            break
        default:
            message += "Sent a message"
    }
    return message
});