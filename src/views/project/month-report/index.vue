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
              <el-form-item label="年度">
                <el-date-picker
                  v-model="searchForm.year"
                  type="year"
                  placeholder="请选择"
                  format="yyyy 年"
                  value-format="yyyy"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :lg="5">
              <el-form-item label="月份">
                <el-date-picker
                  v-model="searchForm.month"
                  type="month"
                  placeholder="请选择"
                  format="MM 月"
                  value-format="MM"
                >
                </el-date-picker>
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
        <el-row class="mt20">
          <div class="table-list">
            <el-table :data="tableData" v-loading="tableLoading" border>
              <el-table-column prop="year" label="年度" align="center">
              </el-table-column>
              <el-table-column prop="month" label="月份" align="center">
              </el-table-column>
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-link
                    type="primary"
                    class="ml10"
                    @click="download(scope.row)"
                    >下载</el-link
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
  </div>
</template>

<script>
import { list } from "@/api/project/statement";
import baseList from "@/mixins/base-list";
export default {
  mixins: [baseList],
  mounted() {
    this.getList();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getList() {
      let params = {
        ...this.queryParams,
        ...this.searchForm
      };
      list(params)
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
    download(row) {
      if (row.path) {
        window.open(row.path);
      }
    }
  }
};
</script>
