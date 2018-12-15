<template>
  <div>
    <el-form-item label="渠道：">
      <transfer ref="noSelect" :titleId="0" :district-list="dataListNoCheck" @check-district="checkSelect" @search-word="searchWord" @check-disable="checkDisable"></transfer>
      <div class="opera">
        <el-button icon="el-icon-arrow-left"  type="primary" circle @click="deleteData" :disabled="disablePre"></el-button>
        <el-button icon="el-icon-arrow-right" type="primary" circle @click="addData" :disabled="disableNex"></el-button>
      </div>
      <transfer ref="hasSelect" :titleId="1" :district-list="selectListCheck" @check-district="checkSelect" @search-word="searchWord" @check-disable="checkDisable"></transfer>
    </el-form-item>
  </div>
</template>

<script>
import Transfer from './Transfer';
import { setTimeout } from 'timers';

export default {
  props: {
    data: {
      type: Array,
    },
  },
  data () {
    return {
      dataList: [], // 未选中（已过滤出已选)的数据
      selectList: [], // 已选中的数据，传递到子组件的数据

      dataListNoCheck: [], // 未选中的（或已搜索）传递到子组件的数据
      selectListCheck: [], // 已选中的（或已搜索）传递到子组件的数据

      checkData: [], // 已勾选的数据（待添加或删除数据)

      noSelectkeyword: '',
      haSelectkeyword: '',

      disablePre: true,
      disableNex: true,
    };
  },
  created () {
    this.getDistrict();
  },
  methods: {
    // 分页数据
    getDistrict () {
      this.dataList = this.data;
      this.dataListNoCheck = this.dataList;
    },
    searchWord (keyword, titleId) {
      // 过滤掉数据，保留搜索的数据
      if (titleId === 0) {
        this.noSelectkeyword = keyword;
        this.dataListNoCheck = this.dataList.filter(val => val.name.includes(keyword));
      } else {
        this.haSelectkeyword = keyword;
        this.selectListCheck = this.selectList.filter(val => val.name.includes(keyword));
      }
      let refsName = titleId === 0 ? 'noSelect' : 'hasSelect';
      // 延迟执行
      setTimeout(() => {
        this.$refs[refsName].getDistrict();
      }, 0);
    },
    // 检查左右按钮可用性
    checkDisable (data, id) {
      if (id === 0) {
        data.length > 0 ? (this.disableNex = false) : (this.disableNex = true);
      } else {
        data.length > 0 ? (this.disablePre = false) : (this.disablePre = true);
      }
    },
    // 选择
    checkSelect (val) {
      this.checkData = val;
    },
    // 关键：把未选择的数据当做已选择的过滤数组，把已选择的数据当做未选择的过滤数组，在全局data进行过滤，最后进行一次搜索
    // 添加至已选
    addData () {
      let dataFilter = [
        ...this.selectList,
        ...this.checkData,
      ];
      this.dataList = this.data.filter(item1 => {
        return dataFilter.every(item2 => item2 !== item1);
      });
      this.selectList = this.data.filter(item1 => {
        return this.dataList.every(item2 => item2 !== item1);
      });
      // 搜索一次
      this.searchWord(this.noSelectkeyword, 0);
      this.searchWord(this.haSelectkeyword, 1);
    },
    // 从已选中删除
    deleteData () {
      let dataFilter = [
        ...this.dataList,
        ...this.checkData,
      ];
      this.selectList = this.data.filter(item1 => {
        return dataFilter.every(item2 => item2 !== item1);
      });
      this.dataList = this.data.filter(item1 => {
        return this.selectList.every(item2 => item2 !== item1);
      });
      // 搜索一次
      this.searchWord(this.noSelectkeyword, 0);
      this.searchWord(this.haSelectkeyword, 1);
    },
  },
  components: {
    Transfer,
  },
};
</script>

<style lang='scss' scoped>
.inner-center {
  margin: 0 5px;
}
.opera {
  position: relative;
  width: 100px;
  display: inline-block;

  .el-button.is-circle {
    border-radius: 50%;
    padding: 12px;
    display: block;
    margin: 25px auto;
  }
}
</style>
