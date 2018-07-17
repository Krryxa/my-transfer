<template>
  <main class="main">
    <h1>{{ title }}</h1>
    <el-form>
      <!-- 仓库 -->
      <el-form-item label="仓库：">
        <el-checkbox-group v-model="warehouseObj" @change="handleWhChange">
          <el-checkbox :label="item" v-for="(item,index) in warehousesList" :key="index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 地区 -->
      <districts :wareHousePro="provinceList" :wareHouseFlag="wareHouseFlag"></districts>
    </el-form>
  </main>
</template>

<script>
import Districts from './Districts';

export default {
  data () {
    return {
      title: '更多设置',
      warehouseObj: [], // 选中的仓库对象
      warehouse: [], // 仓库

      provinceList: [], // 仓库对应的省id
      wareHouseFlag: false, // 分仓的省id加载完毕的标志
      warehousesList: [ // 仓库信息
        {
          'key': 'NH',
          'name': '南海',
          'province': [ // 该仓库对应的省的id值
            '101101',
            '101102',
          ],
        },
        {
          'key': 'SH',
          'name': '上海',
          'province': [
            '101104',
            '101105',
          ],
        },
        {
          'key': 'CD',
          'name': '成都',
          'province': [
            '101103',
          ],
        },
        {
          'key': 'BJ',
          'name': '北京',
          'province': [
            '101106',
            '101107',
          ],
        },
        {
          'key': 'HZ',
          'name': '华中',
          'province': [
            '101108',
            '101109',
          ],
        },
      ],
    };
  },
  created () {
    this.getWareHouses();
  },
  methods: {
    // 获取仓库数据
    async getWareHouses () {
      // 默认勾选所有仓库
      this.warehouseObj = this.warehousesList; // 选中的仓库对象
      this.warehouse = this.warehousesList.map(val => val.key); // 选中的仓库id

      this.wareHouseFlag = true; // 加载完毕
      // this.warehousesList 数组：[{key:'', province:[],},...]
      for (let val of this.warehousesList) {
        // 每个数组元素去空格后合并成一个数组
        this.provinceList = this.provinceList.concat(val['province'].map(vq => vq.trim()));
      }
    },
    // 点击某个仓库，对应地区联动选择，value - 已选择的仓库对象
    handleWhChange (value) {
      this.warehouse = value.map(val => val.key);
      // 先清空
      this.provinceList = [];
      // value 数组：[{key:'', province:[],},...]
      for (let val of value) {
        // 每个数组元素去空格后合并成一个数组
        this.provinceList = this.provinceList.concat(val['province'].map(vq => vq.trim()));
      }
    },
  },
  components: {
    Districts,
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 1000px;
  height: auto;
  margin: 0 auto;
}
</style>
