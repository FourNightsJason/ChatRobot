let robotDialog = {
    template: `
        <div :class="chat.id=='菲菲'?'':'user'">
            <div id="headIcon" :class="chat.id=='菲菲'?'':'user'"></div>
            <div>
                <span id="nickname" :class="chat.id=='菲菲'?'':'user'">{{chat.id}}</span><br>
                <span :class="chat.id=='菲菲'?'':'user'" id="dialog"><span>{{chat.dialog}}</span></span>
            </div>
        </div>
    `,
    props: ['chat']
};
let App = {
    template: `
        <div id="app">
            <header><marquee behavior="alternate">欢迎来到闲聊天室</marquee></header>
            <main>
                <article>
                    <section ref="chatBox">
                        <div v-for="(chat,index) in chatList" is="robotDialog" :key="index" :chat="chat"></div>
                    </section>
                    <section>
                        <textArea autofocus placeholder="请输入消息……" @change="inputMsg" ref="text" /><!--
                     --><input type="button" value="发送" @click="send">
                    </section>
                </article>
                <aside>
                    <div id="first"></div>
                    <div id="second"></div>
                    <div id="third"></div>
                    <div id="border"></div>
                    <div id="content"></div>
                    <div id="hide">►</div>
                </aside>
            </main>
        </div>
    `,
    data() {
        return {
            msg: '',
            response: '',
            robotName: '菲菲',
            nickname: '小四',
            chatList: [],
            // chatObj: { id: '菲菲', dialog: '' }
        }
    },
    methods: {
        inputMsg(e) {
            this.msg = e.target.value;
        },
        send() {
            if (this.msg) {
                this.chatList.push({ id: this.nickname, dialog: this.msg });
                this.$refs.text.value = '';
                this.$refs.text.focus();
                // 原生ajax
                // let xhr = new XMLHttpRequest();
                // xhr.open('get', 'http://192.168.5.235:8000/fe1316/chatRobot/api/api.php?msg=' + this.msg, true);
                // xhr.send();
                // xhr.onreadystatechange = function () {
                //     if (xhr.readyState === 4) {
                //         if (xhr.status === 200) {
                //             this.response = JSON.parse(xhr.responseText).content;
                //             console.log(JSON.parse(xhr.responseText).content);
                //         }
                //     }
                // }

                // axios.js
                axios.get('http://192.168.5.235:8000/fe1316/chatRobot/api/api.php', { params: { msg: this.msg } }).then((data) => {
                    this.response = data.data.content;
                    if (this.response) {
                        this.response = this.response.replace(/\{br\}/g, '\n')
                    } else {
                        this.response = '我听不懂啊，混蛋，说点我懂的啊！';
                    }
                    this.chatList.push({ id: this.robotName, dialog: this.response });
                    this.msg = '';
                })
            } else {
                alert('消息不能为空，你看着办吧！');
            }
        }
    },
    watch: {
        chatList() {
            this.$nextTick(() => {
                this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight // 滚动高度
            })
        }
    },
    components: { robotDialog }
}
new Vue({
    el: '#app',
    render: h => h(App),
    components: { App }
})