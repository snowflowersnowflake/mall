<template>
    <div class="address_list">
        <header>
            <div class="back" @click="$router.back(-1)">
                <i class="el-icon-arrow-left"></i>
            </div>
            <h3>收货地址</h3>
            <router-link to="/editaddress" class="add">
                新增地址
            </router-link>
        </header>
        <div class="list_wrap">
            <ul>
                <li>
                    <div class="text">
                        <h3>中建三局-写字楼</h3>
                        <h4>武珞路456号 8楼</h4>
                        <p>许(先生) 17607198430</p>
                    </div>

                    <router-link :to="{path:'/editaddress',query:{id:'92153026548183343'}}" class="edit">
                        <i class="el-icon-edit-outline"></i>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
@import "~@/style/base.less";
.address_list {
  background-color: #f5f5f5;
  height: 100%;
  header {
    position: relative;
    background: linear-gradient(to right, #02aaff, #0387ff);
    height: 188 / @r;
    .back {
      position: absolute;
      top: 90 / @r;
      left: 60 / @r;
      color: #fff;
      font-size: 56 / @r;
    }
    .add {
      position: absolute;
      top: 100 / @r;
      right: 60 / @r;
      color: #fff;
      font-size: 56 / @r;
    }
    h3 {
      font-size: 60 / @r;
      color: #fff;
      padding-top: 96 / @r;
      text-align: center;
    }
  }
  .list_wrap {
    ul {
      padding-left: 50 / @r;
      background-color: #fff;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2 / @r solid #eee;
        padding: 50 / @r 50 / @r 50 / @r 0;
        .text {
          color: #333;
          h3 {
            font-size: 46 / @r;
            font-weight: bold;
          }
          h4 {
            font-size: 40 / @r;
            padding: 20/@r 0 40/@r;
            line-height: 50/@r;
          }
          p {
              font-size: 40/@r;
              color: #999;
          }
        }
          .edit {
              padding: 10/@r;
              i {
                  font-size: 60/@r;
                  color: #999;
              }
          }
      }
    }
  }
}
</style>