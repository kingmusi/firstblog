<template>
    <div id="clock">{{nowTime}}</div>
</template>

<script>
export default {
    data() {
        return {
            nowTime: ""
        };
    },
    methods: {
        timeFormate(timeStamp) {
            
            let hh =
                new Date(timeStamp).getHours() < 10
                    ? "0" + new Date(timeStamp).getHours()
                    : new Date(timeStamp).getHours();
            let mm =
                new Date(timeStamp).getMinutes() < 10
                    ? "0" + new Date(timeStamp).getMinutes()
                    : new Date(timeStamp).getMinutes();
            let ss =
                new Date(timeStamp).getSeconds() < 10
                    ? "0" + new Date(timeStamp).getSeconds()
                    : new Date(timeStamp).getSeconds();
            
            this.nowTime =
                hh +
                ":" +
                mm +
                ":" +
                ss 
        },
        nowTimes() {
            this.timeFormate(new Date());
            setInterval(this.nowTimes, 1000);
            this.clear();
        },
        clear() {
            clearInterval(this.nowTimes);
            this.nowTimes = null;
        }
    },
    mounted() {
      this.nowTimes()
    }
};
</script>

<style scoped>
#clock {
    font-family: 'Share Tech Mono', monospace;
    text-align: center;
    width: 100%;
    font-size:50px;
    color: #db7093;
    text-shadow: 0 0 20px #DC143C, 0 0 20px rgba(10, 175, 230, 0);
}
</style>