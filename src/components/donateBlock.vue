<template>
  <div>
    <div>
      本站为便利玩家而制作，初版数据来源于漫猫、战纪等网站。
      <br>在后续发展中，我们进行了辛苦的收集与更新工作，只为给热爱SD的玩家提供更好用的工具。
      <br>
      <strong>
        点击“SD敢达OL” 微信
        <strong>小程序</strong> 中的广告，可以更好的帮助网站留存和发展。
      </strong>
      <br>为了网站的留存和发展，希望帮助到的玩家能给予一点点支持，你就是我们最大的动力。
    </div>
    <br>
    <el-row type="flex" justify="center">
      <img src="img/donate/wx.png" class="QRimg">
      <img src="img/donate/zfb.png" class="QRimg">
      <!-- <img src="img/donate/donate.webp" class="QRimg"> -->
      <!-- <v-img id="Avatar_dlg" src="img/donate/donate.webp" aspect-ratio="1" class="QRimg" width="300"></v-img> -->
      <!-- <v-img id="Avatar_dlg" src="img/ad/wx1.png" aspect-ratio="1" class="QRimg" max-width="200"></v-img>
      <v-img id="Avatar_dlg" src="img/ad/zfb1.png" aspect-ratio="1" class="QRimg" max-width="200"></v-img>-->
    </el-row>
    <br>
    <el-row>
      <p class="transition-box">建议和吐槽，请发至作者邮箱：rabbit586@163.com</p>
      <p class="transition-box">数据库错误，请发给G-Joker：935954867@qq.com</p>
      <p class="transition-box">小程序“关于”按钮，也可以反馈各种问题</p>
    </el-row>
    <div>
      欢迎积极反馈，我们会持续更新的！
      <p>
        欢迎到
        <strong>
          <a href="https://tieba.baidu.com/f?kw=sd%E6%95%A2%E8%BE%BE&ie=utf-8" target="_blank">SD敢达吧</a>
        </strong>灌水^_^
      </p>
    </div>
    <el-card shadow="always" id="contributor_Card">
      网站建设贡献者：
      <ul>
        <li>
          <a href="http://tieba.baidu.com/home/main?un=兔子巫puppy" target="_blank">兔子巫puppy</a>
        </li>
        <li>
          <a href="http://tieba.baidu.com/home/main?un=上杉星诡" target="_blank">上杉星诡</a>
          <a href="https://weibo.com/u/3292621703" target="_blank" style="font-size:8px">(weibo)</a>
        </li>
        <li>
          <a href="http://tieba.baidu.com/home/main?un=木丁丁的凹凸曼" target="_blank">木丁丁的凹凸曼</a>
        </li>
        <li>
          <a href="https://weibo.com/u/1966968723" target="_blank">时间女神的错爱</a>
        </li>
        <li>
          <a href="http://tieba.baidu.com/home/main/?un=爻枵" target="_blank">世说心语</a>
        </li>
        <li>
          <a href="http://tieba.baidu.com/home/main?un=№冰雪飞扬⊙" target="_blank">冰雪飞扬</a>
        </li>
        <li>
          <a href="http://tieba.baidu.com/home/main?un=kay0034" target="_blank">春熙路刀客</a>
        </li>
        <li>崇拜奶闹</li>
        <li>
          <a href="http://tieba.baidu.com/home/main?un=古柔辰" target="_blank">ᎬᎪᎢᏌᎡᎬ</a>
        </li>
        <li>
          <a href="http://tieba.baidu.com/home/main?un=普仔仔" target="_blank">普仔仔</a>
        </li>
        <li>还有很多默默无闻的大佬们</li>
      </ul>
    </el-card>
    <div>
      <p>对web技术感兴趣，或者想与我交流，可以关注我的个人账号：</p>
      <p>
        渣浪微博：
        <a href="https://weibo.com/u/1564552980" target="_blank">@6dbm</a>
      </p>
      <div>
        <p>微信公众号：兔子歪理</p>
        <img src="img/donate/gongzhonghao.jpg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "donateBlock"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.QRimg {
  max-width: 600px;
  float: left;
}
#contributor_Card a {
  color: black;
  margin: 0;
  padding: 0;
  border: 0;
  font: 12px/1.5 Tahoma, "Microsoft Yahei", "Simsun";
  color: #333;
  text-decoration: none;
  list-style: none;
}
@media only screen and (max-width: 500px) {
  .QRimg {
    width: 50%;
    float: left;
    align-content: center;
  }
}
</style>
