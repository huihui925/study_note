<template>
  <div class="personalMsg">
    <!-- 头部 -->
    <van-nav-bar title="个人资料" left-arrow @click-left="onClickLeft" />

    <!-- 个人信息面板 -->
    <ul class="personal-container">
      <!-- 头像 -->
      <li class="personal-item">
        <div class="title">头像</div>
        <div class="right">
          <div class="img">
            <!-- <img
              src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3834578341,1318817857&fm=26&gp=0.jpg"
              alt=""
            /> -->
            <div class="licenseUpload">
              <img :src="avatar" />
              <input
                type="file"
                name="fileToUpload"
                class="fileToUpload"
                accept="image/png,image/gif,image/jpeg"
                id="uploadInput"
                @change="checkFile"
              />
            </div>
          </div>

          <div class="jiantou">
            <img src="@/assets/imgs/baisejiantou.png" alt="" />
          </div>
        </div>
      </li>
      <!-- 昵称 -->
      <li class="personal-item" @click="toggleDialog">
        <div class="title">昵称</div>
        <div class="right">
          <div class="nick">
            {{ nicknames }}
          </div>
          <div class="jiantou">
            <img src="@/assets/imgs/baisejiantou.png" alt="" />
          </div>
        </div>
      </li>
      <!-- id -->
      <li class="personal-item">
        <div class="title">ID</div>
        <div class="right">
          <div>
            {{ ids }}
          </div>
        </div>
      </li>
      <!-- 推荐码 -->
      <li class="personal-item">
        <div class="title">推荐码</div>
        <div class="right">
          <div>
            {{ this.$store.state.userInfo.mycode }}
          </div>
        </div>
      </li>
    </ul>

    <!-- 弹框 -->
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="block">
          <div class="change-name">
            <label for="name" class="name">修改昵称:</label>
            <input
              type="text"
              id="name"
              class="inp-name"
              placeholder="请输入修改的昵称"
              v-model="changename"
              ref="inpFile"
            />
          </div>
          <div class="btn">
            <button @click="cancle">取消</button>
            <button @click="confirm">确定</button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import axios from "axios";
import { Notify, Uploader } from "vant";
import LoginVue from "../../Login/Login.vue";
export default {
  data() {
    return {
      nickname: "superman", //昵称
      id: localStorage.getItem('id'), //id
      mycode: "", //推荐码
      changename: "",
      show: false,
      imgs: {},
    };
  },
  created() {
    //从本地获取id
    let id = localStorage.getItem("id");
    this.id = id;
    this.getUserInfo();
    this.confirm();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toggleDialog() {
      this.show = true;
    },
    cancle() {
      this.show = false;
    },
    //确认按钮修改昵称
    confirm() {
      //发送请求
      console.log(this.changename);
      this.$request({
        method: "post",
        url: `/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=member.info.updatenick`,
        data: {
          id: this.id,
          nickname: this.changename,
        },
      })
        .then((res) => {
          this.nickname = this.changename;
          this.getUserInfo();
          if (res.status == 1) {
            Notify({
              message: res.result.message,
              color: "#fff",
              background: "#F8A04A",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.show = false;
    },

    //触发个人资料的接口
    getUserInfo() {
      this.$store.dispatch("getUserMsg");
    },


    //本地头像回填
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },


    //上传图片
    checkFile(e) {
      var self = this;
      let file = e.target.files[0];
      let param = new FormData(); // 创建form对象
      param.append("file", file); // 通过append向form对象添加数据
      param.append("id", this.id); 
      // 通过append向form对象添加数据
      param.append("chunk", "0"); // 添加form表单中其他数据
      // console.log(param.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      // console.log(file)
      // this.url = this.getObjectURL(file)
      // 添加请求头
      axios
        .post(
          "http://dz010.wanwusl.com/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=member.info.updatehead",
          param,
          config,
        )
        .then((res) => {
          console.log('result',res);
          let {status,result} = res.data
          console.log('result',result)
          if(status==1){
            console.log("头像修改成功")
          }
          this.getUserInfo()  //头像上传成功后重新调用头像接口
        });
     },
  },
  computed: {
    nicknames() {
      return this.$store.state.userInfo.nickname;
    },
    ids() {
      return this.$store.state.userInfo.id;
    },
    mycodes() {
      return this.$store.state.userInfo.mycode;
    },
    avatar(){
      return this.$store.state.userInfo.avatar;
    }
  },
};
</script>

<style lang="less">
.personal-container {
  width: 92vw;
  height: 68.4vw;
  border-radius: 1.6vw;
  background: rgba(53, 54, 60, 1);
  margin: 5.33vw 4vw;
  padding: 0px 30px;
  .personal-item {
    line-height: 17.2vw;
    border-bottom: 1px solid #4c4e57;
    display: flex;
    vertical-align: middle;
    justify-content: space-between;
    align-items: center;

    .title {
      flex: 1;
      font-size: 4vw;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      letter-spacing: 1vw;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      letter-spacing: 1vw;
      white-space: nowrap;
      .nick {
        width: 26.67vw;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: right;
      }
    }
    .img {
      width: 12.13vw;
      height: 12.13vw;
      border: 4px solid rgba(255, 255, 255, 1);
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .jiantou {
      width: 4.53vw;
      height: 4.53vw;
      margin-bottom: 10.27vw;
      margin-left: 4vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  //去掉最后一个li的下边框
  .personal-item:last-child {
    border-bottom: 0;
  }
}
//弹框样式
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    width: 82.67vw;
    height: 37.67vw;
    background-color: #fff;
    border-radius: 2.67vw;
  }
  .change-name {
    padding: 8vw 4vw;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    opacity: 0.6;
    .name {
      color: #000;
    }
    .inp-name {
      color: #000;
      border: 0;
      text-indent: 2.67vw;
    }
  }
  .btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 2.67vw;
    button {
      border: 0;
      padding: 10px 40px;
      border-radius: 6px;
      // background:rgb(32, 32, 32);
      opacity: 0.6;
       background-image: linear-gradient(to right, #F8A04A , #F7DB90); 
    }
  }
}

//头像上传
.licenseUpload {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9f8f7;
}

.licenseUpload img {
  width: 6.4rem;
  height: 3.5rem;
}

.licenseUpload #uploadInput {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>
