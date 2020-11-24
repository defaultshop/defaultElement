<template>
  <div class="manage-wrap">
    <div v-if="!showHandleComponent">
      <el-card shadow="never">
        <div slot="header">
          <span class="title">{{ $route.meta.title }}</span>
        </div>
        <el-form label-width="80px" :model="searchForm">
          <el-row :gutter="10">
            <el-col :sm="12" :lg="5">
              <el-form-item label="年度">
                <el-date-picker
                  v-model="searchForm.year"
                  type="year"
                  format="yyyy 年"
                  value-format="yyyy"
                  placeholder="请选择"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="所属部门">
                <el-select
                  placeholder="请选择"
                  size="medium"
                  v-model="searchForm.deptId"
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
              <el-form-item label="部门类型">
                <el-select
                  placeholder="请选择"
                  size="medium"
                  v-model="searchForm.value3"
                >
                  <el-option
                    v-for="dict in deptTypeList"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
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
        </el-form>
      </el-card>

      <!--表格-->
      <el-card shadow="never" class="mt10">
        <el-row>
          <el-button type="primary" size="medium" @click="addYearIndicator"
            >新增</el-button
          >
        </el-row>
        <el-row class="mt20">
          <div class="table-list">
            <el-table border :data="tableData" v-loading="tableLoading">
              <el-table-column
                prop="year"
                label="年度"
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="deptName" label="所属部门" align="center">
              </el-table-column>
              <el-table-column
                prop="actualDomesticCapital"
                label="实际利用内资（亿元）"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="itemCount"
                label="引进项目总数"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="bigItemCount"
                label="大项目数"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="fallItem" label="落地项目" align="center">
              </el-table-column>
              <el-table-column
                prop="produceItem"
                label="投产项目"
                align="center"
              >
              </el-table-column>

              <el-table-column
                prop="actualForeignCapital"
                label="实际利用外资（亿元）"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="industryType"
                label="操作"
                width="100"
                align="center"
              >
                <template slot-scope="scope">
                  <span class="t-o mr10" @click="getYearDetail(scope.row)"
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
    </div>
    <HandleIncator
      v-model="showHandleComponent"
      :details="handleNeedDetails"
    ></HandleIncator>
  </div>
</template>
<script>
import HandleIncator from "./HandleIncator.vue";
import baseList from "@/mixins/base-list";
import dict from "@/mixins/dict";
import { getPageList, getDetail } from "@/api/system/year-indicator";
export default {
  mixins: [baseList, dict],
  components: {
    HandleIncator
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
      getPageList(params)
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
    addYearIndicator() {
      this.showHandleComponent = true;
      this.handleNeedDetails = {};
    },
    getYearDetail(row) {
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
