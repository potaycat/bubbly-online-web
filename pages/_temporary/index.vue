<template>
    <div class="dialog-view-container" :style="`width:${$options.width}px`">
        <section class="dialog-text-view">
            <div class="the-line" />
            <div v-for="item in transribtion.data" :key="item.start_time">
                <div class="dialog-text__item-container">
                    <div class="dialog-text__knob" :style="
                        `border-color:${$options.colorLs[speakerList.indexOf(item.speaker_id)]}`"
                    />
                    <div class="dialog-text__info">
                        <strong :style="
                            `color:${$options.colorLs[speakerList.indexOf(item.speaker_id)]}`"
                        >{{item.speaker_id}}</strong>
                        <p>{{item.start_time | toTimestamp}}</p>
                    </div>
                    <span class="dialog-text__text">
                        {{item.text}}
                    </span>
                </div>
            </div>
        </section>
        <div class="visual" :style="`height:${$options.height*speakerList.length}px`">
            <div class="speech-section" v-for="(item, i) in transribtion.data"
                :key="item.start_time"
                :style="`width:${(item.end_time-item.start_time)*scaleFactor}px;height:${$options.height}px;
                    margin-right:${((transribtion.data[i+1]||{}).start_time-item.end_time)*scaleFactor}px;
                    top:${speakerList.indexOf(item.speaker_id)*$options.height}px;
                    background:${$options.colorLs[speakerList.indexOf(item.speaker_id)]}
                `"
            />
            <p class="trnscrbtion-dur">{{duration | toTimestamp}}</p>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'blank',
    // options: {
       width: window.innerWidth/2,
       height: 12,
       colorLs: ['dodgerblue', 'springgreen', 'red', 'yellow', 'orange', 'brown'],
    // },
    data:() => ({
        transribtion: {
            "data": [
                {
                "start_time": 0.07,
                "speaker_id": "S0",
                "end_time": 5.23,
                "text": "thì nay không năm"
                },
                {
                "start_time": 7.46,
                "speaker_id": "S0",
                "end_time": 13.559999999999999,
                "text": "hay là như thế nào"
                },
                {
                "start_time": 13.56,
                "speaker_id": "S1",
                "end_time": 33.46,
                "text": "một ngày thì các em có bao nhiêu tiền thì còn truy cập nếu mình không hề đi"
                },
                {
                "start_time": 35.66,
                "speaker_id": "S0",
                "end_time": 52.89,
                "text": "hết mà không bị phát sinh thêm phí sử dụng ba mươi ngày khiến các ngành đăng ký thì có ba miền bắc một trăm hai"
                },
                {
                "start_time": 52.89,
                "speaker_id": "S1",
                "end_time": 58.49,
                "text": "thì có tám trăm ba mươi ngày khiến các ngài"
                },
                {
                "start_time": 58.49,
                "speaker_id": "S0",
                "end_time": 67.25,
                "text": "ba của mình"
                },
                {
                "start_time": 67.25,
                "speaker_id": "S1",
                "end_time": 86.14,
                "text": "sẽ được miễn phí tất cả dưới hai mươi phút năm mươi phút nữa mình sẽ có hai đăng ký có thể đăng ký"
                },
                {
                "start_time": 88.78,
                "speaker_id": "S0",
                "end_time": 91.64,
                "text": "cuộc gọi nội dưới hai mươi"
                },
                {
                "start_time": 91.64,
                "speaker_id": "S0",
                "end_time": 109.41,
                "text": "tất cả để truy cập vào mạng"
                },
                {
                "start_time": 111.94,
                "speaker_id": "S0",
                "end_time": 126.17999999999999,
                "text": "anh sẽ thông báo ngay giữa váy và sau khi kết thúc cuộc gọi này một tin nhắn từ đầu số một bảy một năm ngày máy"
                },
                {
                "start_time": 126.18,
                "speaker_id": "S0",
                "end_time": 135.24,
                "text": "phát hiện hài lòng với em"
                },
                {
                "start_time": 138.03,
                "speaker_id": "S0",
                "end_time": 151.22,
                "text": "khởi động lại lần sau thì có thể thao tác khoa sao không chín tám"
                },
                {
                "start_time": 154.46,
                "speaker_id": "S1",
                "end_time": 173.96,
                "text": "có nghĩa là mình đã tính theo chu kỳ ba mươi ngày kể từ ngày hôm nay hôm nay là ngày hai mươi tám tháng chín đến ngày hai mươi tám tháng mười hệ thống dễ dàng trước ngày hai mươi tám tháng mười trăm chín mươi nghìn đồng trong tài khoản phóng sẽ sôi động gia hạn cho mình mà mình không cần phải đăng kí nữa nếu không đăng ký"
                },
                {
                "start_time": 173.96,
                "speaker_id": "S0",
                "end_time": 176.87,
                "text": "sử dụng"
                },
                {
                "start_time": 180.5,
                "speaker_id": "S1",
                "end_time": 195.96,
                "text": "tắt đi lại và năm mươi phút hỏa hoạn nạn sang tháng cao hệ thống"
                }
            ],
            "version_code": 1
        }
    }),
    computed: {
        duration() {
            const dat = this.transribtion.data
            return dat[dat.length-1].end_time
        },
        scaleFactor() {
            return this.$options.width / this.duration
        },
        speakerList() {
            return [...new Set(this.transribtion.data.map(obj => obj.speaker_id))]
        }
    },
    filters: {
        toTimestamp(val) {
            const hours = Math.floor(val / 3600)
            let minutes = Math.floor(val / 60)
            let second = Math.floor(val)
            if (hours) minutes -= hours*60
            if (minutes) second -= minutes*60
            if (minutes < 10) minutes = `0${minutes}`
            if (second < 10) second = `0${second}`
            return `${hours}:${minutes}:${second}`
        }
    }
}
</script>

<style>
.dialog-view-container {
    display: flex;
    flex-direction: column;
}
.visual {
    background: white;
    border: solid 1px #ccc;
    padding: 15px 0;
    box-sizing: unset;
    border-radius: 0 0 5px 5px;
    display: flex;
    z-index: 2;
}
.speech-section {
    position: relative;
    background: blue;
}
.dialog-text-view {
    background: rgb(236, 242, 248);
    max-height: 500px;
    overflow: auto;
}
.the-line {
    position: absolute;
    left: 29px;
    width: 2px;
    height: 100%;
    background: rgb(180, 195, 211);
}
.dialog-text__item-container {
    display: flex;
    position: relative;
    margin: 20px 25px;
}
.dialog-text__info {
    min-width: 110px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
}
.dialog-text__info > p {
    color: #777;
    font-size: 85%;
}
.dialog-text__knob {
    content: " ";
    height: 10px;
    width: 10px;
    border-radius: 100px;
    border: solid 2px;
    position: absolute;
    left: 0;
    margin-top: 6px;
    background: white;
}
.trnscrbtion-dur {
    position: absolute;
    right: 0;
    bottom: 0;
    background: #aaa;
    border-radius: 5px;
    color: white;
    font-size: 11px;
    padding: 0 3px;
}
</style>