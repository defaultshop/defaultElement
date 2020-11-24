<template>
  <div class="manage-wrap">
    <el-card shadow="never">
      <div slot="header">
        <span class="title">{{ $route.meta.title }}</span>
      </div>
      <el-form
        label-width="80px"
        :model="queryParams"
        :inline="true"
        ref="queryForm"
      >
        <el-row :gutter="10">
          <el-col :sm="12" :lg="5">
            <el-form-item label="产业类型">
              <el-select
                placeholder="请选择"
                size="medium"
                v-model="queryParams.industryType"
                @keyup.enter.native="handleQuery"
              >
                <el-option
                  v-for="dict in dataDistList"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="5">
            <el-form-item label="产业名称">
              <el-input
                placeholder="请输入"
                size="medium"
                v-model.trim="queryParams.industryName"
                @keyup.enter.native="handleQuery"
                :maxlength="50"
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
        <el-button type="primary" size="medium" @click="addIndustry"
          >新增
        </el-button>
      </el-row>
      <el-row class="mt20">
        <div class="table-list">
          <el-table v-loading="loading" border :data="tableData">
            <el-table-column
              label="序号"
              type="index"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="industryTypeName"
              label="产业类型"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="industryName"
              label="产业名称"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="industryType"
              label="操作"
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                <span class="t-o mr10" @click="updateIndustry(scope.row)"
                  >编辑</span
                >
                <span class="t-o mr10" @click="handleDelete(scope.row)"
                  >删除</span
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      <el-row class="mt20 cent">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
        <!--<el-pagination-->
        <!--background-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="queryParams.pageNum"-->
        <!--:page-sizes="[10, 20, 30, 40]"-->
        <!--:page-size="queryParams.pageSize"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="total"-->
        <!--&gt;-->
        <!--</el-pagination>-->
      </el-row>
    </el-card>
    <!-- 添加弹框 -->
    <el-dialog title="项目类别" :visible.sync="dialogFormVisible" width="30%">
      <el-form
        :model="dialogForm"
        label-width="80px"
        :rules="dialogFormRules"
        ref="dialogForm"
      >
        <el-form-item label="产业类型" prop="industryType">
          <el-select
            v-model="dialogForm.industryType"
            placeholder="请选择"
            size="medium"
          >
            <el-option
              v-for="dict in dataDistList"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产业名称" prop="industryName">
          <el-input
            v-model="dialogForm.industryName"
            size="medium"
            :maxlength="50"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="medium"
          >取 消
        </el-button>
        <el-button type="primary" @click="submitForm" size="medium"
          >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, add, update, get, del } from "@/api/project/industryType";

export default {
  data() {
    return {
      // 遮罩层
      loading: true,
      form: {
        industryType: "",
        industryName: ""
      },
      dialogFormRules: {
        industryType: [
          { required: true, message: "产业类型不能为空", trigger: "change" }
        ],
        industryName: [
          { required: true, message: "产业名称不能为空", trigger: "blur" }
        ]
      },
      dialogForm: {
        industryType: "",
        industryName: ""
      },
      queryParamsDist: {
        dictType: "industry_type"
      },
      dataDistList: [],
      dialogFormVisible: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0
    };
  },
  mounted() {},
  created() {
    this.getList();

    this.getDicts("industry_type").then(response => {
      this.dataDistList = response.data;
    });
  },
  methods: {
    /** 查询数据列表 */
    getList() {
      this.loading = true;
      list(this.queryParams).then(response => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.queryForm = {};
      this.queryParams = {
        pageNum: 1,
        pageSize: 10
      };
      //this.resetForm("queryForm");
      this.handleQuery();
    },

    handleSizeChange() {},
    handleCurrentChange() {},

    addIndustry() {
      this.dialogFormVisible = true;
    },

    /** 修改按钮操作 */
    updateIndustry(row) {
      this.reset();
      get(row.id).then(response => {
        this.dialogForm = response.data;
        this.dialogFormVisible = true;
        this.title = "修改类型";
      });
    },

    // 表单重置
    reset() {
      this.dialogForm = {
        id: undefined,
        industryType: undefined,
        industryName: undefined
      };
      //this.resetForm("dialogForm");
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["dialogForm"].validate(valid => {
        if (valid) {
          if (this.dialogForm.id != undefined) {
            update(this.dialogForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.dialogFormVisible = false;
                this.getList();
              }
            });
          } else {
            add(this.dialogForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.dialogFormVisible = false;
                this.getList();
              }
            });
          }
        }
      });
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id;
      this.$confirm("是否确认删除该条数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return del(id);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.resetForm();
      }
    }
  }
};
</script>
