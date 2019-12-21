import Vue from "vue"


function timestamp_date(d) {
    let dd = d.getDate()
    let mm = d.getMonth() + 1
    let yy = d.getFullYear().toString().substr(-2)
    if (dd < 10) dd = `0${dd}`
    if (mm < 10) mm = `0${mm}`
    return `${dd}/${mm}/${yy}`
}
function timestamp_time(d) {
    let h = d.getHours()
    let m = d.getMinutes()
    if (h < 10) h = `0${h}`
    if (m < 10) m = `0${m}`
    return `${h}:${m}`
}

Vue.filter('timeAgo', value => {
    const ago = new Date(value)
    const delta = new Date() - ago
    const sec_num = delta / 1000
    const days = Math.floor(sec_num / 86400)
    if (days>0 && days<=7) {
        return `${days}d`
    }
    const hours = Math.floor(sec_num / 3600)
    if (hours>0 && hours<=24) {
        return `${hours}h`
    }
    const minutes = Math.floor(sec_num / 60)
    if (minutes>0 && minutes<=60) {
        return `${minutes}m`
    }
    if (sec_num <= 60) {
        return "Just now"
    }
    return timestamp_date(ago)+", "+timestamp_time(ago)
})


Vue.filter('tiemstamp', value => {
    const d = new Date(value)
    if (new Date() - d < 86400000) {
        return timestamp_time(d)
    }
    return timestamp_date(d)+", "+timestamp_time(d)
})

Vue.filter('tiemstamp2', value => {
    const d = new Date(value)
    if (new Date() - d < 86400000) {
        return timestamp_time(d)
    }
    return timestamp_date(d)
})
