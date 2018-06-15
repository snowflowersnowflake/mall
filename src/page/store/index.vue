<template>
    <div class="store_wrap">
        <header>
            <a href="" class="back">
                <i></i>
            </a>
            <div class="search-box">
                <i class="el-icon-search"></i>
                <input type="text" placeholder="请输入商家、商品名称">
            </div>
        </header>
        <div class="store_msg">
            <div class="logo_wrap">
                <img src="static/shops/logo_01.png" alt="">
            </div>
            <div class="collection">
                <i class="el-icon-star-off"></i>
            </div>
            <h3>商店名字</h3>
            <div class="base_info">
                <span>评价4.4</span>|
                <span>月售1691</span>|
                <span>蜂鸟快送月25分钟</span>
            </div>
            <div class="hide_able">
                <div class="title">优惠</div>
                <ul>
                    <li>
                        <span class="mj">满减</span>
                        <p>满25减12，满40减18，满65减25</p>
                    </li>
                    <li>
                        <span class="mj">满减</span>
                        <p>满25减12，满40减18，满65减25</p>
                    </li>
                    <li>
                        <span class="mj">满减</span>
                        <p>满25减12，满40减18，满65减25</p>
                    </li>
                    <li>
                        <span class="mj">满减</span>
                        <p>满25减12，满40减18，满65减25</p>
                    </li>
                </ul>
                <div class="title">服务</div>
                <ul>
                    <li>
                        <span>拒单赔</span>
                        <p>满25减12，满40减18，满65减25</p>
                    </li>
                    <li>
                        <span>开发票</span>
                        <p>满25减12，满40减18，满65减25</p>
                    </li>
                </ul>
                <div class="title">公告</div>
                <p>欢迎光临,用餐高峰请提前下单</p>
            </div>

        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.store_wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
  header {
    flex: none;
    background-color: #ddd;
    height: 324 / @r;
    padding-top: 50 / @r;
    position: relative;
    overflow: hidden;
    .back {
      position: absolute;
      width: 60 / @r;
      height: 60 / @r;
      padding: 10 / @r;
      top: 50 / @r;
      left: 50 / @r;
      display: block;
      i {
        display: block;
        width: 100%;
        height: 100%;
        transform: rotate(-45deg);
        border-top: 3 / @r solid #fff;
        border-left: 3 / @r solid #fff;
      }
    }
    .search-box {
      width: 60%;
      margin: 0 auto;
      display: flex;
      background-color: #fff;
      border-radius: 3 / @r;
      font-size: 42 / @r;
      height: 108 / @r;
      justify-content: center;
      align-items: center;
      color: #9e9e9e;
      input {
        background-color: transparent;
        border: none;
        font-size: 42 / @r;
        color: #666;
        margin-left: 16 / @r;
      }
    }
  }
  .store_msg {
    flex: auto;
    padding-top: 92 / @r;
    position: relative;
    .logo_wrap {
      position: absolute;
      width: 228 / @r;
      height: 228 / @r;
      left: 50%;
      top: -177 / @r;
      transform: translateX(-50%);
      border-radius: 6 / @r;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .collection {
      width: 102 / @r;
      height: 102 / @r;
      border-radius: 50%;
      position: absolute;
      top: -51 / @r;
      right: 50 / @r;
      box-shadow: 0 0 10 / @r rgba(0, 0, 0, 0.4);
      background-color: #fff;
      text-align: center;
      i {
        font-size: 60 / @r;
        line-height: 102 / @r;
        color: #ff4c62;
      }
    }
    h3 {
      font-size: 58 / @r;
      text-align: center;
      color: #333;
      padding-bottom: 46 / @r;
      font-weight: bold;
    }
    .base_info {
      font-size: 32 / @r;
      color: #999;
      text-align: center;
      line-height: 32 / @r;
      span {
        font-size: 32 / @r;
        color: #666;
        margin: 0 18 / @r;
      }
    }
    .hide_able {
      padding: 60 / @r 45/@r 0;
      .title {
        font-size: 42 / @r;
        color: #333;
        padding-bottom: 45/@r;
        font-weight: bold;
      }
      ul {
        overflow: hidden;
        transition: 0.5s;
        &.close {
          height: 120 / @r;
        }
        li {
          height: 40 / @r;
          display: flex;
          align-content: center;
          font-size: 28 / @r;
          color: #666;
          overflow: hidden;
          margin-bottom: 25 / @r;
          span {
            //width: 72 / @r;
            padding: 0 6/@r;
            text-align: center;
            height: 40 / @r;
            border-width: 2 / @r;
            border-style: solid;
            line-height: 36 / @r;
            font-size: 28 / @r;
            border-radius: 4 / @r;
            margin-right: 10 / @r;
            &.sd {
              color: #768663;
              border-color: #cadebd;
              background-color: #ebfae7;
            }
            &.mj,
            &.hb,
            &.tj,
            &.zp {
              color: #ce7b77;
              border-color: #f4cfcc;
              background-color: #fff4f2;
            }
            &.vip {
              color: #b66d30;
              border-color: #e3d4ae;
              background-color: #fffef7;
            }
          }
          p {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 40 / @r;
            max-width: 800 / @r;
            font-size: 32/@r;
          }
        }
      }
      >p {
          font-size: 32/@r;
          color: #666;
      }
    }
  }
}
</style>