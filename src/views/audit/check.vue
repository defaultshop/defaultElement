<template>
  <div class="manage-wrap">
    <template v-if="!showHandleComponent">
      <el-card shadow="never">
        <div slot="header">
          <span class="title">{{ $route.meta.title }}</span>
        </div>
        <el-form
          label-width="80px"
          :model="searchForm"
          :inline="true"
          ref="searchForm"
        >
          <el-row :gutter="10">
            <el-col :sm="12" :lg="5">
              <el-form-item label="项目类型">
                <el-select
                  placeholder="请选择"
                  size="medium"
                  v-model="searchForm.value1"
                >
                  <el-option label="区域一" value="1"></el-option>
                  <el-option label="区域二" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="审核状态">
                <el-select
                  placeholder="请选择"
                  size="medium"
                  v-model="searchForm.value2"
                >
                  <el-option label="区域一" value="1"></el-option>
                  <el-option label="区域二" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="项目名称">
                <el-input
                  placeholder="请输入"
                  size="medium"
                  v-model.trim="searchForm.value3"
                  :maxlength="20"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="4" class="right">
              <el-form-item label-width="0">
                <el-button type="primary" size="medium" @click="handleQuery"
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
          <el-button size="medium">导出报表</el-button>
        </el-row>
        <el-row class="mt20">
          <div class="table-list">
            <el-table :data="tableData" border>
              <el-table-column
                prop="date"
                label="项目编号"
                align="center"
                width="100"
              >
              </el-table-column>
              <el-table-column prop="name" label="项目名称" align="center">
              </el-table-column>
              <el-table-column
                prop="address"
                label="项目状态"
                align="center"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="产业类型"
                align="center"
                width="100"
              >
              </el-table-column>
              <el-table-column prop="address" label="招商区块" align="center">
              </el-table-column>
              <el-table-column prop="address" label="投资单位" align="center">
              </el-table-column>
              <el-table-column
                prop="address"
                label="在龙注册企业名称"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="address" label="投资金额" align="center">
              </el-table-column>
              <el-table-column
                prop="address"
                label="投资方式"
                align="center"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="审批状态"
                align="center"
                width="100"
              >
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-link type="primary">审核</el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-row>
        <el-row class="mt20">
          <pagination
            v-show="total > 0"
            :total="100"
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
import HandleComponent from "./HandleDetails.vue";
export default {
  mixins: [baseList],
  components: {
    HandleComponent
  },
  data() {
    return {};
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
