<template>
  <div class="manage-wrap">
    <template v-if="!showHandleComponent">
      <!--搜索条件-->
      <el-card shadow="never">
        <div slot="header">
          <span class="title">项目管理</span>
          <span class="operate" @click="moreSearchOptios = !moreSearchOptios">
            <span>{{ moreSearchOptios ? "收起" : "展开" }}</span>
            <i
              class="iconfont"
              :class="moreSearchOptios ? 'iconarrowup' : 'iconarrowdown'"
            ></i>
          </span>
        </div>
        <el-form label-width="100px" :model="searchForm" ref="searchForm">
          <el-row :gutter="10">
            <el-col :sm="12" :lg="5">
              <el-form-item label="项目状态">
                <el-select
                  placeholder="请选择"
                  size="medium"
                  v-model="searchForm.projectState"
                >
                  <el-option
                    :label="item.name"
                    :value="item.code"
                    v-for="item in projectStatus"
                    :key="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="审核状态">
                <el-select
                  placeholder="请选择"
                  size="medium"
                  v-model="searchForm.reviewState"
                >
                  <el-option
                    :label="item.name"
                    :value="item.code"
                    v-for="item in auditStatus"
                    :key="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="项目名称">
                <el-input
                  placeholder="请输入"
                  v-model="searchForm.projectName"
                  size="medium"
                  :maxlength="20"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="产业类型">
                <el-select
                  placeholder="请选择"
                  size="medium"
                  v-model="searchForm.industryTypeId"
                >
                  <el-option
                    :label="item.industryName"
                    :value="item.id"
                    v-for="item in industryTypeList"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :sm="12" :lg="4" class="right">
              <el-form-item label-width="0">
                <el-button type="primary" size="medium" @click="search"
                  >查询</el-button
                >
                <el-button plain size="medium" @click="resetQuery"
                  >重置</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
          <!--展开内容-->
          <el-row :gutter="10" v-show="moreSearchOptios">
            <el-col :sm="12" :lg="5">
              <el-form-item label="引入单位">
                <el-select
                  placeholder="请选择"
                  size="medium"
                  v-model="searchForm.importCompany"
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
            <el-col :sm="12" :lg="5">
              <el-form-item label="在龙注册名称">
                <el-input
                  placeholder="请输入"
                  v-model="searchForm.enrollCompany"
                  size="medium"
                  :maxlength="20"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="招商区块">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-select
                      placeholder="请选择"
                      size="medium"
                      v-model="searchForm.value9"
                    >
                      <el-option label="浙江省" value="1"></el-option>
                    </el-select>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-select
                      placeholder="请选择"
                      size="medium"
                      v-model="searchForm.value10"
                    >
                      <el-option label="杭州" value="1"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="落地区块">
                <el-input
                  placeholder="请输入"
                  v-model="searchForm.fallArea"
                  size="medium"
                  :maxlength="20"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="投资方式">
                <el-select
                  placeholder="请选择"
                  size="medium"
                  v-model="searchForm.investmentTypeId"
                >
                  <el-option
                    v-for="dict in investmentMethod"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="合同投资额">
                <el-input
                  placeholder="请输入(万元以上)"
                  v-model="searchForm.value12"
                  size="medium"
                  :maxlength="50"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="注册金额">
                <el-input
                  placeholder="请输入(万元以上)"
                  v-model="searchForm.value13"
                  size="medium"
                  :maxlength="50"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="用地亩数">
                <el-input
                  placeholder="请输入(亩以上)"
                  v-model="searchForm.value13"
                  size="medium"
                  :maxlength="50"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="录入时间">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-date-picker
                      v-model="searchForm.value14"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-date-picker
                      v-model="searchForm.value15"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="签约时间">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-date-picker
                      v-model="searchForm.value16"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-date-picker
                      v-model="searchForm.value17"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="开工时间">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-date-picker
                      v-model="searchForm.value16"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-date-picker
                      v-model="searchForm.value17"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="投产时间">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-date-picker
                      v-model="searchForm.value16"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-date-picker
                      v-model="searchForm.value17"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <!--表格-->
      <el-card shadow="never" class="mt10">
        <el-row>
          <el-button type="primary" size="medium" @click="addProject"
            >新增项目</el-button
          >
          <el-button size="medium">导出报表</el-button>
        </el-row>
        <el-row class="mt20">
          <div class="table-list" v-loading="tableLoading">
            <el-table :data="tableData" border>
              <el-table-column
                prop="projectName"
                label="项目名称"
                align="center"
              >
              </el-table-column>
              <el-table-column label="项目状态" align="center" width="100">
                <template slot-scope="scope">
                  <span>
                    {{ projectStatusName(scope.row.projectState) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="industryTypeName"
                label="产业类型"
                align="center"
                width="100"
              >
              </el-table-column>
              <el-table-column label="招商区块" align="center">
                <template slot-scope="scope">
                  <span>{{
                    `${scope.row.provinceName}/${scope.row.cityName}`
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="investmentCompany"
                label="投资单位"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="enrollCompany"
                label="在龙注册企业名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="contractMoney"
                label="投资金额"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="investmentTypeName"
                label="投资方式"
                align="center"
                width="100"
              >
              </el-table-column>
              <el-table-column prop="signDate" label="签约时间" align="center">
              </el-table-column>
              <el-table-column label="审核状态" align="center" width="100">
                <template slot-scope="scope">
                  <span>
                    {{ auditStatusName(scope.row.reviewState) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <span class="t-o mr10" @click="getProjectDetail(scope.row)"
                    >编辑</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-row>
        <el-row class="mt20 page-right">
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
        </el-row>
      </el-card>
    </template>
    <HandleComponent
      v-model="showHandleComponent"
      :details="handleNeedDetails"
    ></HandleComponent>
  </div>
</template>

<script>
import baseList from "@/mixins/base-list";
import dict from "@/mixins/dict";
import HandleComponent from "./HandleProject.vue";
import { getProjectList, getDetail } from "@/api/project/project";
export default {
  mixins: [baseList, dict],
  components: {
    HandleComponent
  },
  data() {
    return {};
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let params = {
        ...this.queryParams,
        ...this.searchForm
      };
      console.log("查询参数", params);
      getProjectList(params)
        .then(res => {
          this.tableLoading = false;
          if (res.code === 200) {
            this.tableData = res.rows;
            this.total = res.total;
          }
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    addProject() {
      this.handleNeedDetails = {};
      this.showHandleComponent = true;
    },
    getProjectDetail(row) {
      getDetail(row.id).then(res => {
        if (res.code === 200) {
          this.showHandleComponent = true;
          this.handleNeedDetails = res.data;
        }
      });
    }
  }
};
</script>
