<template>
  <div>
    <el-form-item label="地区：">
      <transfer :titleId="0" :operation="operation[0]" :district-list="provinceList" @check-district="checkProvince" @selected-checked="selectedProvince"></transfer>
      <transfer :titleId="1" :operation="operation[1]" ref="city" :district-list="cityList" @check-district="checkCity" @selected-checked="selectedCity"></transfer>
      <transfer :titleId="2" :operation="operation[2]" ref="country" :district-list="country" @selected-checked="selectedCountry"></transfer>
      <span class="inner-center el-icon-d-arrow-right"></span>
      <transfer :titleId="3" :operation="operation[3]" style="width: 260px" :district-list="selectDistrict" @delete-checked="deleteCheck"></transfer>
    </el-form-item>
  </div>
</template>

<script>
import Transfer from './Transfer';

export default {
  props: {
    wareHousePro: { // 分仓对应的省id
      type: Array,
    },
    wareHouseFlag: {
      type: Boolean,
    },
  },
  data () {
    return {
      operation: ['添加选中省份', '添加选中城市', '添加选中区域', '删除选中地区'],
      flag: false, // 分仓对应的省id变量的监听器的锁，第一次触发不执行，数据还未初始化
      provinceList: [], // 省级数据
      cityList: [], // 市级数据
      country: [], // 区级数据

      selectDistrict: [], // 选中的区域数据对象

      proFilter: [], // 省级过滤id
      cityFilter: [], // 市级过滤id
      countryFilter: [], // 县级过滤id

      districtListList: {
        'province': {
          '101101': '北京市',
          '101102': '天津市',
          '101103': '广东省',
          '101104': '山西省',
          '101105': '河北省',
          '101106': '广西壮族自治区',
          '101107': '甘肃省',
          '101108': '湖北省',
          '101109': '湖南省',
          '101110': '福建省',
          '101111': '内蒙古自治区',
          '101112': '青海省',
        },
        'city': {
          '101101': [
            {
              'id': 101101101112,
              'text': '通州区',
            },
            {
              'id': 101101101111,
              'text': '房山区',
            },
          ],
          '101102': [
            {
              'id': 101102101111,
              'text': '西青区',
            },
            {
              'id': 101102101112,
              'text': '津南区',
            },
          ],
          '101103': [
            {
              'id': 101102101351,
              'text': '河源市',
            },
            {
              'id': 101164001112,
              'text': '惠州市',
            },
          ],
        },
        'country': {
          '101101101112': [
            {
              'id': 106105142126,
              'text': '和布克赛尔蒙古自治县',
            },
            {
              'id': 106105142125,
              'text': '裕民县',
            },
          ],
          '101101101111': [
            {
              'id': 106105143124,
              'text': '哈巴河县',
            },
            {
              'id': 106105143125,
              'text': '青河县',
            },
          ],
          '101102101351': [
            {
              'id': 106105143124,
              'text': '龙川县',
            },
            {
              'id': 106105143125,
              'text': '紫金县',
            },
          ],
          '101164001112': [
            {
              'id': 106465133124,
              'text': '惠阳区',
            },
            {
              'id': 106197987125,
              'text': '惠城区',
            },
          ],
        },
      },
    };
  },
  computed: {
    // 映射出选中区域的数据Id
    selectDistrictId () {
      return this.selectDistrict.map(val => val.id);
    },
  },
  watch: {
    // 监听点击分仓，所自动勾选的省
    wareHousePro (newVal, oldVal) {
      // 当区域数据和分仓数据加载后才能解锁
      if (this.flag && this.wareHouseFlag) {
        this.watchWarehouse(newVal, oldVal);
      }
    },
  },
  created () {
    this.getDistrict();
  },
  methods: {
    // 获取区域数据
    async getDistrict () {
      // 从后台传回经过处理的数据
      this.flag = true; // 数据加载完成，解锁
      // 当分仓数据加载后才能解锁
      if (this.wareHouseFlag) {
        this.watchWarehouse(this.wareHousePro, []); // 执行一次分仓与区域选择的联动
      }
      this.getProvince();
    },
    // 分仓对应的省id的监听器方法
    watchWarehouse (newVal, oldVal) {
      // 列举出已选的id
      let selectedId = this.selectDistrict.map(val => val.id);
      let selectedIdAry = [];
      let selectedArray = [];

      // 循环新值，得出要勾选的省级id
      for (let val of newVal) {
        // 只找出没有包含的省，才添加进selectDistrict
        if (!selectedId.includes(val)) {
          // 查出对应省的名称
          let title = this.districtListList['province'][val];
          // 省级id添加进selectedIdAry
          selectedIdAry.push(val);
          // 省级对象添加进selectedArray
          selectedArray.push({
            id: val,
            text: title,
          });
        }
      }
      // 从省级添加到已选区域的方法，参数：第一个：省级对象数组，第二个：所选择的省级id数组
      this.selectedProvince(selectedArray, selectedIdAry);

      let deleteSelected = [];
      // 循环旧值，得出取消勾选的省级id
      for (let val of oldVal) {
        // 进行比较，如果新值中不包含此id，就是要准备取消，并且第二个条件是必须是已经勾选，才能取消
        if (!newVal.includes(val) && selectedId.includes(val)) {
          // 查出对应省的名称
          let title = this.districtListList['province'][val];
          // 省级对象添加进selectedArray
          deleteSelected.push({
            id: val,
            text: title,
          });
        }
      }
      // 执行删除区域对象的方法，参数：要删除的区域对象数组
      this.deleteCheck(deleteSelected);
    },
    // 获取省级数据
    getProvince () {
      this.provinceList = []; // 首先清空
      for (let key in this.districtListList['province']) {
        this.provinceList.push({
          id: key,
          text: this.districtListList['province'][key],
        });
        // 省级过滤处理
        this.filterProvince();
      }
    },
    // 获取市级数据，子组件自定义的穿梭框传回的数据，val：[区域obj, 区域obj,...]
    checkProvince (val) {
      let obj = val[val.length - 1];
      let flag = true;
      if (obj !== undefined) {
        let id = obj.id;
        for (let key in this.districtListList['city']) {
          if (id === key) {
            // 匹配到的id，将对应的市级数据传递到子组件
            this.cityList = this.districtListList['city'][key];
            // 过滤处理
            this.filterCity();
            // 过滤处理
            // 再清空上一次的县级数据
            this.country = [];
            // 将父级对象放进市级组件
            this.$refs.city.father = {
              id: id,
              text: obj.text,
            };
            flag = false;
            break;
          }
        }
      }
      // 如果市级没有匹配到，市级和区级都显示为空
      if (flag) {
        this.cityList = [];
        this.country = [];
      }
    },
    // 获取县级数据，子组件自定义的穿梭框传回的数据，val：[区域obj, 区域obj,...]
    checkCity (val) {
      let obj = val[val.length - 1];
      let flag = true;
      if (obj !== undefined) {
        let id = obj.id;
        for (let key in this.districtListList['country']) {
          if (id.toString() === key) {
            // 匹配到的id，将对应的区级数据传递到子组件
            this.country = this.districtListList['country'][key];
            // 过滤处理
            this.filterCountry();
            // 获取省级的数据
            let fatherId = this.$refs.city.father.id;
            let fatherText = this.$refs.city.father.text;
            // 拼接上市级数据放进县级组件
            this.$refs.country.father = {
              id: fatherId + '-' + id,
              text: fatherText + '-' + obj.text,
            };
            flag = false;
            break;
          }
        }
      }
      // 区级没有匹配到，显示为空
      if (flag) {
        this.country = [];
      }
    },
    // 从省级添加到已选区域，参数：val：省级对象数组，filterId：所选择的省级id数组
    selectedProvince (val, filterId) {
      this.selectDistrict = this.selectDistrict.concat(val);
      this.proFilter = this.proFilter.concat(filterId);
      // 如果过滤的市级区域，还有县级区域，合并成一个市级
      for (let val of filterId) {
        for (let vq of this.selectDistrict) {
          let selectId = vq.id.split('-');
          // 拆分的数组长度大于1，说明有市级以下的区域，合并成一个省级区域
          if (selectId.length > 1 && selectId[0] === val) {
            // 在已选择的区域中删除市级数据，合并成一个省级
            this.selectDistrict = this.selectDistrict.filter(vl => vl !== vq);
            // 当前省级已被合并，从过滤数组中删除该市级和县级数据
            this.cityFilter = this.cityFilter.filter(vf => vf.toString() !== selectId[1]);
            this.countryFilter = this.countryFilter.filter(vs => vs.toString() !== selectId[2]);
          }
        }
      }
      // 清空下面的市级和县级区域
      this.cityList = [];
      this.country = [];
      // 过滤处理
      this.filterProvince();
    },
    // 从市级添加到已选区域
    selectedCity (val, filterId) {
      this.selectDistrict = this.selectDistrict.concat(val);
      this.cityFilter = this.cityFilter.concat(filterId);
      // 如果过滤的市级区域，还有县级区域，合并成一个市级
      for (let val of filterId) {
        for (let vq of this.selectDistrict) {
          let selectId = vq.id.split('-');
          // 拆分的数组长度为3，说明有县级区域，并且该市级区域与当前加入市级区域的id相同，合并成一个市级区域
          if (selectId.length === 3 && selectId[1] === val.toString()) {
            // 在已选择的区域中删除县级数据，合并成一个市级
            this.selectDistrict = this.selectDistrict.filter(vl => vl !== vq);
            // 当前市级已被合并，从过滤数组中删除该县级数据
            this.countryFilter = this.countryFilter.filter(vs => vs.toString() !== selectId[2]);
          }
        }
      }
      // 清空下面的县级区域
      this.country = [];
      // 过滤处理
      this.filterCity();
    },
    // 从县级添加到已选区域
    selectedCountry (val, filterId) {
      this.selectDistrict = this.selectDistrict.concat(val);
      this.countryFilter = this.countryFilter.concat(filterId);
      // 过滤处理
      this.filterCountry();
    },
    // 省级过滤处理
    filterProvince () {
      let newPro = Array.from(this.provinceList);
      for (let val of this.proFilter) {
        newPro = newPro.filter(vq => vq.id !== val);
      }
      this.provinceList = Array.from(newPro);
    },
    // 市级过滤处理
    filterCity () {
      let newCity = Array.from(this.cityList);
      for (let val of this.cityFilter) {
        newCity = newCity.filter(vq => vq.id !== val);
      }
      this.cityList = Array.from(newCity);
    },
    // 县级过滤处理
    filterCountry () {
      let newCountry = Array.from(this.country);
      for (let val of this.countryFilter) {
        newCountry = newCountry.filter(vq => vq.id !== val);
      }
      this.country = Array.from(newCountry);
    },
    // 删除已选区域，参数：selecteVal：要删除的区域对象数组
    deleteCheck (selecteVal) {
      for (let val of selecteVal) {
        let selectId = val.id.split('-');
        let length = selectId.length;
        if (length === 1) {
          // 长度只有1，只有省级数据，删除对应省级的filter中的数据
          this.proFilter = this.proFilter.filter(vs => vs !== selectId[0]);
          // 重新获取县级数据
          this.getProvince();
        } else if (length === 2) {
          // 长度为2，到达市级数据，删除对应市级的filter中的数据
          this.cityFilter = this.cityFilter.filter(vs => vs.toString() !== selectId[1]);
          // 重新获取市级数据
          this.checkProvince([this.$refs.city.father]);
        } else {
          // 长度为3，到达县级数据，删除对应县级的filter中的数据
          this.countryFilter = this.countryFilter.filter(vs => vs.toString() !== selectId[2]);
          // 重新获取县级数据，参数：当前市级ID的对象数组：obj:[{id:id,text:text}]
          let fatherId = this.$refs.country.father.id.split('-')[1];
          let fatherText = this.$refs.country.father.text.split('-')[1];
          let obj = [{id: fatherId, text: fatherText}];
          this.checkCity(obj);
        }
        // 刷新已选区域
        this.selectDistrict = this.selectDistrict.filter(vd => vd.id !== val.id);
      }
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
</style>
