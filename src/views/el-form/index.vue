/** * create by zhangxiang on 2021-01-26 15:29 * 类注释： * 备注： */
<template>
  <div class="index">
    <select-tree width="200" v-model="selected" :options="options" :props="defaultProps"></select-tree>
    <!--    <tree-select width="200" v-model="selected" :options="options" :props="defaultProps"></tree-select>-->
    <m-form
        ref="mForm"
        :formData="formData"
        :formCols="formCols"
        :rules="rules"
        @event="event"
        @submit="submit">
      <template #test>
        <el-input v-model="formData.date5"></el-input>
      </template>
    </m-form>
  </div>
</template>

<script type="text/ecmascript-6">
import mForm from '@/components/form'
import selectTree from "@/components/selectTree";
import treeSelect from "@/components/treeSelect/treeSelect";
import {CascaderOptions} from './data'
import TreeSelect from "../../components/treeSelect/treeSelect";

export default {
  name: "index",
  components: {
    TreeSelect,
    mForm,
    selectTree
  },
  props: {},
  data() {
    return {
      selected: '',

      defaultProps: {
        // parent: 'parentId',   // 父级唯一标识
        value: 'label',          // 唯一标识
        label: 'label',       // 标签显示
        children: 'children', // 子级
      },
      // 数据列表
      options: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      format: "yyyy年MM月dd日 HH时mm分ss",
      tiem: "",
      CascaderOptions: CascaderOptions,
      formData: {
        data27: "32134324",
      },
      formCols: [
        [
          {
            eType: 'Input',
            placeholder: "请输入姓名",
            label: "Input",
            prop: 'name1',
            noShow: false,
            span: 6,
            suffixIcon: "el-icon-eleme"
          },
          {eType: 'slot', label: "自定义slot", slotName: "test", prop: 'date5', span: 6,},
          {
            eType: 'Radio',
            label: "Radio",
            options: [{label: "手机", value: "0"}, {label: "电脑", value: "1"}],
            prop: 'date10',
            span: 6,
          },
          {
            eType: 'RadioButton',
            label: "RadioButton",
            options: [{label: "手机", value: "0"}, {label: "电脑", value: "1"}],
            prop: 'date11',
            span: 6,
          },
        ],
        [
          {
            eType: 'InputNumber',
            label: "InputNumber",
            prop: 'date16',
            span: 6,
          },
          {
            eType: 'CheckButton',
            label: "CheckButton",
            noShow: false,
            // options: [{label: "手机", value: "0"}, {label: "电脑", value: "1"}],
            // options: '手机,电脑',
            options: ['手机', '电脑'],
            prop: 'date15',
            span: 6,
          },
          {
            eType: 'Check',
            label: "CheckBox",
            // options: [{label: "手机", value: "0"}, {label: "电脑", value: "1"}],
            options: '手机,电脑',
            prop: 'date13',
            span: 6,
          },
          {
            eType: 'DatePicker',
            type: 'year',
            label: "year",
            valueFormat: "yyyy",
            prop: 'date18',
            span: 6,
          },
        ],
        [
          {
            eType: 'Select',
            label: "Select",
            options: [{label: "手机", value: "0"}, {label: "电脑", value: "1"}],
            prop: 'date17',
            span: 6,
          },
          {
            eType: 'DatePicker',
            type: 'date',
            label: "date",
            valueFormat: "yyyy-MM-dd",
            prop: 'date19',
            span: 6,
          },
          {
            eType: 'DatePicker',
            type: 'datetime',
            label: "datetime",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            prop: 'date20',
            span: 6,
          },
          {
            eType: 'Check',
            label: "CheckBox",
            options: '手机',
            prop: 'date30',
            span: 6,
          },
        ],
        [
          {
            eType: 'DatePicker',
            type: 'daterange',
            label: "daterange",
            valueFormat: "yyyy-MM-dd",
            prop: 'date21',
            span: 6,
          },
          {
            eType: 'DatePicker',
            type: 'datetimerange',
            label: "datetimerange",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            prop: 'date22',
            span: 6,
          },
          {
            eType: 'DatePicker',
            type: 'dates',
            label: "dates",
            valueFormat: "yyyy-MM-dd",
            prop: 'date23',
            span: 6,
          },
          {
            eType: 'TimePicker',
            label: "TimePicker",
            prop: 'date24',
            noShow: false,
            span: 6,
          },
        ],
        [
          {
            eType: 'Switch',
            label: "Switch",
            prop: 'date25',
            span: 6,
          },
          {
            eType: 'Slider',
            label: "Slider",
            prop: 'date26',
            noShow: false,
            span: 6,
          },
          {
            eType: "Span",
            prop: "data27",
            // noFormItem: true,
            span: 6,
            formatter: (data) => {
              console.log(data)
            }
          },
          {
            eType: 'Rate',
            label: "Rate",
            prop: 'date29',
            span: 6,
          },
        ],
        [
          {
            eType: 'Icon',
            elementUi: true,
            label: "elementUIIcon",
            class: "el-icon-share",
            prop: 'date31',
            span: 6,
          },
          {
            eType: 'Icon',
            label: "Icon",
            class: "icon-yiduxinxi",
            prop: 'date32',
            span: 6,
          },
          {
            eType: 'Cascader',
            label: "Cascader",
            options: [],
            prop: 'date33',
            span: 6,
          },
        ],
        [{
          eType: 'Editor',
          label: "Editor",
          height: 300,
          prop: 'date35',
          span: 24,
        },],
        [
          {eType: 'Button', value: "提交", type: "success", prop: 'submit', span: 2,},
          {eType: 'Button', value: "重置", type: "success", prop: 'reset', span: 2,}
        ]
      ],
      rules: {
        date5: [
          {required: true, message: '请选择活动区域', trigger: 'change'}
        ],
        date11: {required: true, message: '请选择活动区域', trigger: 'change'},
        date35: {required: true, message: '请选择活动区域', trigger: 'change'},
      },
      show: true
    }
  },
  computed: {},
  methods: {
    /**
     * 各种事件合集
     * @param params
     */
    event(params) {
      console.log(params, this.formData)
      this.$refs.mForm.setNoShow('date10', this.show)
      this.$refs.mForm.setOptions('date15',
          [
            {label: "手机", value: "0"},
            {label: "电脑", value: "1"},
            {label: "平板", value: "2"}
          ])
      this.show = !this.show
    },
    /**
     * 提交事件
     */
    submit() {
      this.$refs.mForm.setNoShow("date13", true)
      this.$refs.mForm.setOptions("date33", this.CascaderOptions)
      console.log('submit', this.formData)
    },
    submits() {
      Promise.all([this.$refs.mForm.submit(), this.$refs.mForm1.submit()]).then(datas => {
        console.log("---同时提交-->", '校验成功')
      })
    }
  },
  activated() {
  },
  mounted() {
  },
  created() {
    let format = "yyyy年MM月dd日 hh时mm分ss秒";
    console.log("---1----->", format)
    let index = format.indexOf('HH') !== -1 ? format.indexOf('HH') : format.indexOf('hh')
    console.log(index)
    console.log(format.slice(0, format.indexOf('HH') !== -1 ? format.indexOf('HH') : format.indexOf('hh')))
    console.log(format.slice(format.indexOf('HH') !== -1 ? format.indexOf('HH') : format.indexOf('hh'), format.length - 1))
    console.log("---2----->", format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?y{2,4}/g, '').trim())
    console.log("---3----->", format.replace(/\W?m{1,2}|\W?ZZ/g, '').replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, '').trim())
  }

}

// var extractDateFormat = exports.extractDateFormat = function extractDateFormat(format) {
//   return format.replace(/\W?m{1,2}|\W?ZZ/g, '').replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, '').trim();
// };
//
// var extractTimeFormat = exports.extractTimeFormat = function extractTimeFormat(format) {
//   return format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?y{2,4}/g, '').trim();
// };
</script>

<style scoped lang="less" rel="stylesheet/less"></style>
