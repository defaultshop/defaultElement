<template>
  <div class="add-indicator" v-if="currentStatus">
    <div class="manage-wrap">
      <el-card shadow="never">
        <div class="edit-head">
          <div class="title">{{ currentTitle }}</div>
          <div class="right-side">
            <el-button size="medium" @click="currentStatus = false"
              >返回</el-button
            >
            <el-button type="primary" size="medium" @click="handleSubmit"
              >提交</el-button
            >
          </div>
        </div>
      </el-card>
      <el-card shadow="never" class="edit-form mt10">
        <el-form
          label-position="top"
          :model="handleForm"
          ref="handleForm"
          :rules="rules"
        >
          <div class="type-title">基础信息</div>
          <el-row>
            <el-col :span="7">
              <el-form-item label="年度" prop="year">
                <el-date-picker
                  v-model="handleForm.year"
                  type="year"
                  format="yyyy 年"
                  value-format="yyyy"
                  placeholder="请选择"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="所属单位" prop="deptId">
                <el-select
                  placeholder="请选择"
                  size="medium"
                  v-model="handleForm.deptId"
                >
                  <el-option
                    :label="item.deptName"
                    :value="item.deptId"
                    v-for="item in deptList"
                    :key="item.deptId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="type-title">总指标</div>
          <el-row>
            <el-col :span="7">
              <el-form-item label="实际利用内资" prop="actualDomesticCapital">
                <el-row :gutter="0">
                  <el-col :span="20">
                    <el-input-number
                      size="medium"
                      v-model="handleForm.actualDomesticCapital"
                      :precision="2"
                      placeholder="请输入"
                      :controls="false"
                      :min="0"
                    ></el-input-number>
                  </el-col>
                  <el-col :span="4">
                    <span class="ml10">亿元</span>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="引进项目总数" prop="itemCount">
                <el-input
                  placeholder="请输入"
                  size="medium"
                  v-model="handleForm.itemCount"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="其中大项目数量" prop="bigItemCount">
                <el-input
                  placeholder="请输入"
                  size="medium"
                  v-model="handleForm.bigItemCount"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="落地项目" prop="fallItem">
                <el-input
                  placeholder="请输入"
                  size="medium"
                  v-model="handleForm.fallItem"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="投产项目" prop="produceItem">
                <el-input
                  placeholder="请输入"
                  size="medium"
                  v-model="handleForm.produceItem"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="实际利用外资" prop="actualForeignCapital">
                <el-row :gutter="0">
                  <el-col :span="20">
                    <el-input-number
                      size="medium"
                      v-model="handleForm.actualForeignCapital"
                      :precision="2"
                      placeholder="请输入"
                      :controls="false"
                      :min="0"
                    ></el-input-number>
                  </el-col>
                  <el-col :span="4">
                    <span class="ml10">美元</span>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="type-title">指标详情（牵头）</div>
          <div class="table-list">
            <el-table border :data="tableData">
              <el-table-column
                prop="investmentName"
                label="类目"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="first" label="一产">
                <template slot-scope="scope">
                  <el-input
                    placeholder="请输入"
                    size="medium"
                    v-model="tableData[scope.$index][scope.column.property]"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="second" label="二产">
                <template slot-scope="scope">
                  <el-input
                    placeholder="请输入"
                    size="medium"
                    v-model="tableData[scope.$index][scope.column.property]"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="third" label="三产">
                <template slot-scope="scope">
                  <el-input
                    placeholder="请输入"
                    size="medium"
                    v-model="tableData[scope.$index][scope.column.property]"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="total" label="总计">
                <template slot-scope="scope">
                  <el-input
                    placeholder="请输入"
                    size="medium"
                    v-model="tableData[scope.$index][scope.column.property]"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="type-title">指标详情（自身任务）</div>
          <div class="table-list">
            <el-table border :data="tableData1">
              <el-table-column
                prop="investmentName"
                label="类目"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="first" label="一产">
                <template slot-scope="scope">
                  <el-input
                    placeholder="请输入"
                    size="medium"
                    v-model="tableData1[scope.$index][scope.column.property]"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="second" label="二产">
                <template slot-scope="scope">
                  <el-input
                    placeholder="请输入"
                    size="medium"
                    v-model="tableData1[scope.$index][scope.column.property]"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="third" label="三产">
                <template slot-scope="scope">
                  <el-input
                    placeholder="请输入"
                    size="medium"
                    v-model="tableData1[scope.$index][scope.column.property]"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="total" label="总计">
                <template slot-scope="scope">
                  <el-input
                    placeholder="请输入"
                    size="medium"
                    v-model="tableData1[scope.$index][scope.column.property]"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import dict from "@/mixins/dict";
import { add, edit } from "@/api/system/year-indicator";
export default {
  mixins: [dict],
  data() {
    return {
      currentStatus: false,
      currentTitle: "",
      handleForm: {},
      rules: {
        year: [
          {
            required: true,
            message: "请选择年度",
            trigger: "change"
          }
        ],
        deptId: [
          {
            required: true,
            message: "请选择所属单位",
            trigger: "change"
          }
        ]
      },
      investmentTypeList: [],
      tableData: [],
      tableData1: []
    };
  },
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    details: {
      type: Object,
      default: {}
    }
  },
  computed: {
    detailComputed() {
      return this.details;
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.handleForm.validate(valid => {
        if (!valid) return;
        console.log("提交的数据", this.handleForm);
        this.handleForm.headIndustryNormInfos = this.tableData;
        this.handleForm.selfIndustryNormInfos = this.tableData1;
        if (!this.details.id) {
          add(this.handleForm).then(res => {
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.currentStatus = false;
            }
          });
          return;
        }
        edit(this.handleForm).then(res => {
          if (res.code === 200) {
            this.$message.success("编辑成功");
            this.currentStatus = false;
          }
        });
      });
    }
  },
  mounted() {
    if (!this.details.id) {
      this.getDicts("investment_type").then(response => {
        console.log(response);
        this.tableData = response.data.map(item => {
          return {
            investmentType: item.dictValue,
            investmentName: item.dictLabel
          };
        });
        this.tableData1 = response.data.map(item => {
          return {
            investmentType: item.dictValue,
            investmentName: item.dictLabel
          };
        });
        console.log("组装后", this.tableData);
        console.log("组装后1", this.tableData1);
      });
    }
  },
  watch: {
    value(val) {
      this.currentStatus = val;
    },
    currentStatus(val) {
      this.$emit("input", val);
      if (this.details.id) {
        this.currentTitle = "编辑年度指标";
      }
    },
    detailComputed(val) {
      if (val.id) {
        this.handleForm = val;
        this.tableData = val.headIndustryNormInfos;
        this.tableData1 = val.selfIndustryNormInfos;
      }
    }
  }
};
</script>
