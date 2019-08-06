<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-dialog
      :visible.sync="getshow"
      width="60%"
      center
      :fullscreen="showFullDlg"
      :custom-class="''"
    >
      <el-row>
        <el-col :lg="8" :xs="8">
          <!-- <el-button @click="getOwnRobot" type="success" v-if="!gundam.getown" disabled="true">认领机体</el-button> -->
          <v-img
            id="Avatar_dlg"
            :src="`img/avatar/${gundam.ID}.png`"
            :lazy-src="`img/avatar/${gundam.ID}.png`"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="120"
          >
            <el-col slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </el-col>
          </v-img>
        </el-col>
        <el-col :lg="16" :xs="16">
          <h2 class="h2">{{gundam.Name || gundam.model}}</h2>
          <div style="font-size:10px;">
            {{gundam.nameEN}}
            <span>[{{gundam.ID}}]</span>
          </div>
          <div>
            Rank:
            <strong class="h3">{{GLOBAL.rankMap[gundam.rank]}}</strong>
          </div>
          <!-- <div>
            机体ID：
            <strong>{{gundam.ID}}</strong>
          </div>-->
          <div>{{gundam.landType}} {{gundam.fightType}}</div>
          <div>评分： {{gundam.rating}}</div>
          <div v-if="false">稀有度：{{gundam.rare}}</div>
          <div v-if="false">强度：{{gundam.strength}}</div>
        </el-col>
      </el-row>
      <br />

      <p>梦服情报</p>
      <el-row>
        <table border="1" cellspacing="0">
          <tr>
            <td style="width: 120px;">登场日期</td>
            <td style="width: 120px;">获取方式</td>
            <td style="width: 80px;">GB</td>
            <td style="width: 80px;">MB</td>
            <td style="width: 80px;">图纸</td>
            <td style="width: 80px;">稀有度</td>
            <td style="width: 80px;">强度</td>
            <td style="width: 80px;">R1代码</td>
            <td style="width: 80px;" v-if="gundam.R">R2代码</td>
          </tr>
          <tr>
            <td>{{gundam.birth_date == "1999-99-99" ? '未知':gundam.birth_date}}</td>
            <td>
              <span>{{gundam.get_way}}</span>
              <span
                v-if="gundam.Machine&&gundam.Machine.length && !gundam.get_way.includes('扭蛋')"
              >，扭蛋</span>
            </td>
            <td>{{gundam.GB_sale}}</td>
            <td>{{gundam.MB_sale}}</td>
            <td>{{gundam.map_sale}}</td>
            <td style="color:#66CCCC">{{gundam.rare}}</td>
            <td style="color:#66CCCC">{{gundam.strength}}</td>
            <td>{{Number(gundam.ID).toString(16).slice(2)}} {{Number(gundam.ID).toString(16).slice(0,2)}}</td>
            <td v-if="gundam.R">{{gundam.R}}</td>
          </tr>
        </table>
      </el-row>
      <!-- weapon block -->
      <p>武装数据</p>
      <el-row>
        <el-col
          :lg="12"
          :xs="24"
          style="border:1px solid black"
          v-for="(r) in [1,2]"
          :key="r"
          v-if="gundam[`sp${r}`]"
        >
          <el-row type="flex">
            <strong style="margin-right:20px;">武装{{r==1?"一":"二"}}</strong>
            <div>必杀：{{spMap[gundam[`sp${r}`]]}}</div>
            <div style="display:inline-block;width:22px;height:22px;">
              <v-img
                :src="`img/skill/${gundam[`sp${r}`]}.png`"
                :lazy-src="`img/skill/${gundam[`sp${r}`]}.png`"
                max-width="30"
              ></v-img>
            </div>
            <span v-if="gundam[`sp${r}_p`]">（{{gundam[`sp${r}_p`]}}）</span>
            <span v-if="gundam[`texing${r}`]">特性:{{gundam[`texing${r}`]}}</span>
          </el-row>
          <div v-for="(x,index) in [1,2,3]" :key="x" :class="index%2==0?'bg-white':'bg-olive'">
            <div class="weapon-title">
              <div style="width:93px; height:30px">
                <v-img
                  :src="`img/weapon/${gundam[`arm${r}_${x}`].img}.png`"
                  :lazy-src="`img/weapon/${gundam[`arm${r}_${x}`].img}.png`"
                ></v-img>
              </div>
              <div class="weapon-title-word">
                <el-tag
                  size="small"
                  v-if="gundam[`arm${r}_${x}`].type"
                >{{gundam[`arm${r}_${x}`].type}}</el-tag>
                <el-tag
                  type="success"
                  size="small"
                  v-if="gundam[`arm${r}_${x}`].pd"
                >{{gundam[`arm${r}_${x}`].pd}}</el-tag>
                <!-- <div color="#0776A0">{{gundam[`arm${r}_${x}`].pd}}</div> -->
                <div>{{gundam[`arm${r}_${x}`].name || "暂无数据"}}</div>
              </div>
              <!-- 武器特效 -->
              <div>
                <el-tag
                  type="warning"
                  size="small"
                  v-for="item in gundam[`arm${r}_${x}`].effact"
                  :key="item"
                >{{item}}</el-tag>
              </div>
            </div>
            <div class="weapon-table">
              <el-row>
                <el-col :span="6">
                  <div>
                    系数:
                    <strong>{{gundam[`arm${r}_${x}`].power ||"-"}}</strong>
                    <!-- 连发数量 -->
                    <span v-if="gundam[`arm${r}_${x}`].biuNum">{{gundam[`arm${r}_${x}`].biuNum}}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    攻速:
                    <strong>{{gundam[`arm${r}_${x}`].gongsu ||"-"}}</strong>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    距离:
                    <strong>{{gundam[`arm${r}_${x}`].des ||"-"}}</strong>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    延迟:
                    <strong>{{gundam[`arm${r}_${x}`].ping ||"-"}}</strong>
                  </div>
                </el-col>
                <el-row>
                  <el-col :span="6">
                    <div>弹药</div>
                  </el-col>
                  <el-col :span="6">
                    <div>装填</div>
                  </el-col>
                  <el-col :span="6">
                    <div>倒地</div>
                  </el-col>
                  <el-col :span="6">
                    <div>更多</div>
                  </el-col>
                  <el-col :span="6">
                    <div>{{gundam[`arm${r}_${x}`].ammunitition ||"-"}}</div>
                  </el-col>
                  <el-col :span="6">
                    <div>{{gundam[`arm${r}_${x}`].reload ||"-"}}</div>
                  </el-col>
                  <el-col :span="6">
                    <div>{{gundam[`arm${r}_${x}`].dfloor ||"-"}}</div>
                  </el-col>
                  <el-col :span="6">
                    <div>{{gundam[`arm${r}_${x}`].effactMore.length? gundam[`arm${r}_${x}`].effactMore.join('，'):"-"}}</div>
                  </el-col>
                </el-row>
              </el-row>
            </div>
          </div>
          <!-- 盾牌 -->
          <el-row type="flex">
            <div style="width:93px; height:30px">
              <v-img :src="`img/weapon/999.png`" :lazy-src="`img/weapon/999.png`"></v-img>
            </div>
            <el-col :span="8">血量:{{gundam.shield2.life || "?"}}</el-col>
            <el-col :span="8">防御:{{gundam.shield2.def || "?"}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- weapon block end -->
      <!-- skill -->
      <p>技能数据</p>
      <el-row>
        <el-row v-for="(item,index) in gundam.skill" :key="index">
          <el-row type="flex" v-if="index<2">
            <div style="display:inline-block;width:22px;height:22px;">
              <v-img
                :src="`img/skill/${item.id}.png`"
                :lazy-src="`img/skill/${item.id}.png`"
                max-width="30"
              ></v-img>
            </div>
            <strong>{{item.skill_name}}</strong>
          </el-row>
          <div v-if="index<2">{{item.skill_detail}}</div>
          <div v-if="index<2">{{item.ext}}</div>
        </el-row>
      </el-row>
      <p>机体参数：</p>
      <el-row>
        <el-col class="border-l" :lg="4" :xs="24">
          繁体名称
          <br />
          {{gundam.nameCN_G || "N/A"}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          攻击
          <br />
          {{gundam.ManMaoVal?gundam.ManMaoVal.att:'-'}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          防御
          <br />
          {{gundam.ManMaoVal?gundam.ManMaoVal.def:'-'}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          机动
          <br />
          {{gundam.ManMaoVal?gundam.ManMaoVal.fly:'-'}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          操控
          <br />
          {{gundam.ManMaoVal?gundam.ManMaoVal.ctl:'-'}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          4D总合
          <br />
          {{gundam.ManMaoVal?gundam.ManMaoVal.att*1+gundam.ManMaoVal.def*1+gundam.ManMaoVal.fly*1+gundam.ManMaoVal.ctl*1:'-'}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          3D总合
          <br />
          {{gundam.ManMaoVal?gundam.ManMaoVal.att*1+gundam.ManMaoVal.def*1+gundam.ManMaoVal.fly*1:'-'}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          Boost
          <br />
          {{gundam.para.boost}}
        </el-col>
        <el-col class="canshu" :lg="4" :xs="6">
          回气/消耗
          <br />
          {{gundam.para.boost_back|| '-'}}/{{gundam.para.boost_usage || '-'}}
        </el-col>
      </el-row>
      <el-row>
        <el-col class="border-l2" :lg="2" :xs="6">
          敏捷
          <br />
          {{gundam.ManMaoVal.agility || '-'}}{{gundam.ManMaoVal.agility2?'/'+gundam.ManMaoVal.agility2:''}}
        </el-col>
        <el-col class="canshu2" :lg="2" :xs="6">
          速度
          <br />
          {{gundam.ManMaoVal.fly || '-'}}{{gundam.ManMaoVal.fly2?'/'+gundam.ManMaoVal.fly2:''}}
        </el-col>
        <el-col class="canshu2" :lg="2" :xs="6">
          血量
          <br />
          {{gundam.ManMaoVal.HP || '-'}}
        </el-col>
        <el-col class="canshu2" :lg="2" :xs="6">
          索敌
          <br />
          {{gundam.ManMaoVal.dect || '-'}}
          <br />
          {{gundam.ManMaoVal.dect2?'R2:'+gundam.ManMaoVal.dect2:''}}
        </el-col>
        <el-col class="canshu2" :lg="6" :xs="6">
          机动数据
          <br />
          R1:{{gundam.ManMaoVal.boost_time}}
          <br />
          {{gundam.ManMaoVal.boost_time2?'R2:'+gundam.ManMaoVal.boost_time2:''}}
        </el-col>
        <el-col class="canshu2" :lg="6" :xs="6">
          机体代码
          <br />
          {{gundam.coding}}
        </el-col>
      </el-row>

      <!-- 合成需要 -->
      <p v-if="gundam.makeNeed&&gundam.makeNeed.length">合成需要：</p>
      <el-row>
        <el-col>
          <el-card v-for="(robots) in gundam.makeNeed" :key="robots.ID" class="mk-card">
            <a :title="robots.name" href="#Avatar_dlg" @click="updateGundam(robots)">
              <v-img
                :src="`img/avatar/${robots.id}.png`"
                :lazy-src="`img/avatar/${robots.id}.png`"
                aspect-ratio="1"
                :class="robots.role&&robots.role == 'key'? 'as-key':''"
                max-width="60"
              ></v-img>
              <br />
              <span class="mkcard-word">{{robots.name}}：{{robots.Level}}</span>
            </a>
          </el-card>
        </el-col>
      </el-row>
      <!-- 国服合成需要makeNeed_CN -->
      <p v-if="gundam.makeNeed_CN&&gundam.makeNeed_CN.length">国服合成需要：</p>
      <el-row>
        <div>
          <el-card v-for="(robots) in gundam.makeNeed_CN" :key="robots.ID" class="mk-card">
            <a :title="robots.name" href="#Avatar_dlg" @click="updateGundam(robots)">
              <v-img
                :src="`img/avatar/${robots.id}.png`"
                :lazy-src="`img/avatar/${robots.id}.png`"
                aspect-ratio="1"
                :class="robots.role&&robots.role == 'key'? 'as-key':''"
                max-width="60"
              ></v-img>
              <br />
              <span class="mkcard-word">{{robots.name}}：{{robots.Level}}</span>
            </a>
          </el-card>
        </div>
      </el-row>
      <!-- 用于合成 -->
      <p v-if="gundam.toMake&&gundam.toMake.length">用于合成：</p>
      <el-row v-if="gundam.toMake&&gundam.toMake.length">
        <div>
          <el-card v-for="(robots) in gundam.toMake" :key="robots.ID" class="mk-card">
            <a :title="robots.name" href="#Avatar_dlg" @click="updateGundam(robots)">
              <v-img
                :src="`img/avatar/${robots.id}.png`"
                :lazy-src="`img/avatar/${robots.id}.png`"
                aspect-ratio="1"
                :class="robots.role&&robots.role == 'as-ke'? 'as-key':''"
                max-width="60"
              ></v-img>
              <br />
              <span class="mkcard-word">{{robots.name}}：{{robots.Level}}</span>
            </a>
          </el-card>
        </div>
      </el-row>

      <!-- 扭蛋 -->
      <el-row>
        <strong>扭蛋机：</strong>
        <span v-if="gundam.Machine&&gundam.Machine.length">
          <el-tag v-for="(Num, index) in gundam.Machine" :key="index">{{Num}}</el-tag>
        </span>
        <span v-else>暂无扭蛋</span>
      </el-row>
      <!-- 更多信息 -->
      <el-row>
        <p>其他信息：</p>
        <p>-势力：{{gundam.force}}</p>
        <p>-{{gundam.feature}}</p>
        <p>-出自作品：{{gundam.from}}</p>
        <p>-驾驶员：{{gundam.pilot}}</p>
        <p v-if="gundam.comment">机体简评：{{gundam.comment}}</p>
        <p>
          机体story：
          <br />
          {{gundam.story}}
        </p>
      </el-row>
      <el-row type="flex" align="start" v-if="gundam.contributor && gundam.contributor.length">
        贡献者名单：
        <el-tag v-for="(p) in gundam.contributor" :key="p" type="info">{{p}}</el-tag>
      </el-row>
      <el-row type="flex">
        去往其他站点查看数据：
        <a
          style="margin-left:20px;text-decoration:none;out-line: none"
          v-if="gundam.YUKID"
          :href="`https://www.yukict.com/bbs/viewthread.php?tid=${gundam.YUKID}`"
          target="_blank"
        >YUKI</a>
        <a
          style="margin-left:20px;text-decoration:none;out-line: none"
          v-if="gundam.ID"
          :href="`http://cfo.tiraura.jp/unit_detail.php?id=${gundam.ID}`"
          target="_blank"
        >tiraura</a>
        <a
          style="margin-left:20px;text-decoration:none;out-line: none"
          v-if="gundam.ID"
          :href="`https://www.olgame.tw/sds/robot_detail.php?id=${gundam.ID}`"
          target="_blank"
        >战纪</a>
        <a
          style="margin-left:20px;text-decoration:none;out-line: none"
          v-if="gundam.ID"
          :href="`http://sdgo2018.rf.gd/search_v2?id=${gundam.ID}`"
          target="_blank"
        >rfgd</a>
      </el-row>分享机体：
      <share :config="shareconfig" v-if="!this.loading && this.getshow"></share>
      <br />

      <p>热门评论：</p>
      <el-row v-for="(item, index) in comments" :key="index">
        <el-row :style="`background-color:${bgColor[index%bgColor.length]}`">
          <el-col :lg="4" :xs="4">
            <div v-if="item.openid == 'oEH945MLNlWqiI3JlhNLaCRMuIhs'">
              <a
                href="http://tieba.baidu.com/home/main?ie=utf-8&un=Gen丿赤焰天空&fr=itb"
                target="_blank"
              >{{item.Name}}：</a>
              <br />
              <a
                href="https://tieba.baidu.com/p/6140799393?pid=125760046583&cid=125768428113&red_tag=3271522965#125768428113"
                target="_blank"
                rel="noopener noreferrer"
                style="text-decoration:none;font-size:10px;"
              >(点击查看他的帖子)</a>
            </div>
            <div v-else>{{item.Name}}：</div>
          </el-col>
          <el-col :lg="17" :xs="20">
            <div :style="`border-left: 2px solid #47a86c;`">{{item.content}}</div>
          </el-col>
          <el-col :lg="3" :xs="0">
            <i class="el-icon-star-off"></i>
            （{{item.zan}}人已赞）
          </el-col>
        </el-row>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-button type="primary" @click="getshow = false">关闭详情</el-button>
        <el-button type="warning" round @click="showMiniProgram = true">添加评论</el-button>
      </el-row>
      <div class="float-button">
        <el-button type="success" round style="margin:0" @click="goTop">
          <i class="el-icon-caret-top"></i>
        </el-button>
        <!--  -->
        <el-button type="warning" round style="margin:0" @click="showMiniProgram = true">
          <i class="el-icon-plus"></i>
        </el-button>
        <el-button type="primary" round style="margin:0" @click="getshow = false">
          <i class="el-icon-close"></i>
        </el-button>
      </div>
      <!-- 内层dialog -->
      <el-dialog width="30%" title="小程序——发现更多精彩！" :visible.sync="showMiniProgram" append-to-body>
        微信扫码，即可进入小程序参与讨论！
        <img src="img\logo\weixin.jpg" style="width: 150px;" />
      </el-dialog>
      <el-dialog
        width="30%"
        title="提交单机版机体代码"
        :visible.sync="codeDlg"
        append-to-body
        :fullscreen="showFullDlg"
      >
        <p>格式1：R1代码/R2代码 (eg: 5D 56/5E 56)</p>
        <p>格式2：R1代码/特殊代码 (eg: AB 3A/ 黄金版：E1 3A)</p>
        <el-input v-model="gundam.coding" placeholder="AB CD/EF GH" size="small" maxlength="30"></el-input>
        <br />
        <el-alert
          title="感谢贡献"
          type="warning"
          :closable="false"
          description="提交前请确认一下准确性，更新内容是为了方便大家，感谢你的贡献。"
        ></el-alert>
        <div v-if="!hasCoding">
          <p style="font-size:10px">如果愿意，请留下你的名字/ID，我们会记录贡献者的名单</p>
          <el-input v-model="contributor" placeholder="Name" size="small" maxlength="30"></el-input>
        </div>
        <el-row type="flex" align="start" v-if="gundam.contributor && gundam.contributor.length">
          贡献者名单：
          <el-tag v-for="(p) in gundam.contributor" :key="p" type="info">{{p}}</el-tag>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="codeDlg = false">取 消</el-button>
          <el-button type="primary" @click="submitCoding">提交审核</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import secret from "../utils/secret";

export default {
  data() {
    return {
      loading: false,
      fullscreenLoading: false,
      codeDlg: false,
      hasCoding: false,
      contributor: "",
      spMap: {
        "10": "乱舞型",
        "11": "全弹发射型",
        "12": "地图炮型",
        "239": "突进型"
      },
      showMiniProgram: false,
      bgColor: [
        "#FFFFCC",
        "#CCFFFF",
        "#FFCCCC",
        "#CCCCFF",
        "#FFCCCC",
        "#CCFF99",
        "#CCCCCC"
      ]
    };
  },
  computed: {
    getshow: {
      get: function() {
        return this.show || false;
      },
      set: function() {
        this.$emit("dialogData", false);
      }
    },
    shareconfig: {
      get: function() {
        return {
          url: `${window.location.href.split("/#")[0]}/detail.html?id=${
            this.gundam.ID
          }`, // 网址，默认使用 window.location.href
          // source: "http://sdplayer.club", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
          title: `${this.gundam.Name}-SD玩家要塞-SD敢达机体数据库`, // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
          // description: "", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
          image: `https://www.sdplayer.club/img/avatar/${this.gundam.ID}.png`, // 图片, 默认取网页中第一个img标签
          // sites: ["qzone", "qq", "weibo", "wechat", "douban"], // 启用的站点
          disabled: ["linkedin", "diandian", "google", "tencent"], // 禁用的站点
          wechatQrcodeTitle: "", // 微信二维码提示文字
          wechatQrcodeHelper:
            "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
        };
      },
      set: function(val) {
        return val;
      }
    },
    showFullDlg: {
      get: function() {
        let ScreenWidth = document.body.clientWidth;
        return ScreenWidth < 768 ? true : false;
      },
      set: function(val) {
        return val;
      }
    },
    newState: {
      get: function() {
        if (this.gundam.newState) return this.gundam.newState;
        if (this.gundam.get_way) return "已登场";
        return "未知";
      }
    }
  },
  props: {
    show: Boolean,
    gundam: Object,
    comments: Array
  },
  updated: function() {
    this.goTop();
  },
  methods: {
    goTop: function() {
      var div = document.querySelector(".el-dialog__wrapper");
      div.scrollTop = 0;
    },
    openCodeDlg: function() {
      this.hasCoding = this.gundam.coding ? true : false;
      this.codeDlg = true;
    },
    submitCoding: function() {
      this.gundam.needReview = true;
      this.loading = true;
      // 贡献者
      if (!this.gundam.contributor) {
        this.gundam.contributor = [];
      }
      if (this.contributor.trim()) {
        if (!this.gundam.contributor.includes(this.contributor.trim()))
          this.gundam.contributor.push(this.contributor);
      }
      this.axios
        .post("/DBmanage/commitCoding", this.gundam)
        .then(res => {
          this.loading = this.codeDlg = false;
          if (res.data.status && res.data.status == "ok") {
            this.gundam.needReview = true;
            this.$message({
              showClose: true,
              message: "提交成功，请耐心等待审核！",
              type: "success"
            });
          }
        })
        .catch(err => {
          this.loading = this.codeDlg = false;
          this.$message({
            showClose: true,
            message: "提交失败，可能遇到了一些错误...",
            type: "error"
          });
        });
    },
    specialWeapon: function(num) {
      var map = {
        "10": "乱舞型",
        "11": "全弹发射型",
        "12": "地图炮型"
      };
      return map[this.gundam[`weapon${num}`].special] || false;
    },
    updateGundam: function(robot) {
      // this.$emit("dialogData", robot);
      this.loading = true;
      let tmp = secret.Encrypt(JSON.stringify(robot)).toString();
      this.axios
        .post("/getGundam/findOne", { text: tmp }, { timeout: 40000 })
        .then(res => {
          // res.data.weaponTable = res.data.weaponTable.replace(
          //   /https\:\/\/www.olgame\.tw\/sds\/images\/weapon\/weapon_/g,
          //   "http://cdn.sdplayer.club/weapon/"
          // );
          let resData = JSON.parse(secret.Decrypt(res.data));
          this.gundam = resData.body;
          this.loading = false;
          var div = document.querySelector(".el-dialog__wrapper");
          // div.scrollTop = div.scrollHeight;
          div.scrollTop = 0;
        });
    },
    getOwnRobot() {
      this.$confirm(
        "尊敬的机师，你能否确定能准确负责地进行为期<strong>3天</strong>的资料更新?<br><strong>请一定要！ <i>保存！</i> 编辑页面的网址！</strong><br>说明：每个IP只能维护一台机体，维护，资料贡献后请把名字留下来，我们会在网站上留下你的名字。",
        "确认修改，请存储新页面的网址链接！",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "正在认领!"
          });
          this.loading = true;
          this.axios
            .post("/DBmanage/getown", { ID: this.gundam.ID })
            .then(res => {
              this.loading = false;
              if (res.data.includes("err")) {
                this.$message({
                  showClose: true,
                  message: res.data,
                  type: "error"
                });
              }
              window.location.href = res.data;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消认领"
          });
        });
    }
  }
};
</script>

<style>
.img-responsive {
  max-width: 100%;
  height: 110px;
  padding-bottom: 20%;
  overflow: hidden;
}
.img-responsive img {
  width: 42%;
}
.img-responsive-sub {
  max-width: 100%;
  width: 80px;
  height: 100px;
  padding-bottom: 10%;
  overflow: hidden;
  margin-right: 20px;
}
.img-responsive-sub img {
  width: 50%;
}
.as-key {
  background: palevioletred;
}
.mk-card {
  width: 150px;
  height: 130px;
  position: relative;
  float: left;
}
.mkcard-word {
  font-size: 8px;
}
.dlg-body {
  background-color: #f0f4c3 !important;
}
.canshu {
  height: 50px;
  border: 1px solid #dcdfe6;
  border-left-style: none;
}
.canshu2 {
  height: 60px;
  border: 1px solid #dcdfe6;
  border-left-style: none;
}
.border-l {
  height: 50px;
  border: 1px solid #dcdfe6;
  overflow: hidden;
}
.border-l2 {
  height: 60px;
  border: 1px solid #dcdfe6;
}
.weapon-title {
  display: flex;
  justify-content: flex-start;
}
.weapon-title > div {
  margin-left: 20px;
}
.weapon-title-word {
  display: flex;
  align-content: center;
  align-items: center;
}
.bg-olive {
  background-color: rgb(179, 228, 228);
}
.bg-white {
}

a:link {
  color: black;
}
.float-button {
  position: fixed;
  bottom: 10%;
  right: 8%;
  z-index: 888;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  /* background: #ff9900; */
  width: 80px;
  height: 150px;
  /* border-radius: 40px; */
  /* box-shadow: 2px 2px 2px #888888; */
  /* opacity: 0.7; */
}
</style>
