<template>
  <div class="manage-wrap">
    <el-card shadow="never">
      <div slot="header">
        <span class="title">{{ $route.meta.title }}</span>
        <el-form class="p-w">
          <el-row>
            <el-col :span="24">
              <el-form-item label="产业类型">
                <ul>
                  <li
                    class="header-tab-item"
                    v-for="(item, index) in industryType"
                    :key="item.dictValue"
                    @click="switchIndustryType(item, index)"
                    :class="{ active: index === currentType }"
                  >
                    {{ item.dictLabel }}
                  </li>
                </ul>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>

    <!--表格-->
    <el-card shadow="never" class="mt10">
      <el-row class="mt20">
        <div class="table-list">
          <el-table :data="auditFlow" v-loading="tableLoading" border>
            <el-table-column
              prop="year"
              label="流程"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.approveType === 1 ? "初审" : "复审" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="deptName"
              label="审核部门"
              width="200"
              align="center"
            >
            </el-table-column>
            <el-table-column label="可操作人员" align="center">
              <template slot-scope="scope">
                <el-tag
                  effect="plain"
                  v-for="item in scope.row.users"
                  :key="item.id"
                  class="ml10"
                  >{{ item.userName }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <span class="t-o" @click="addPerson(scope.row)"
                  >选择审批人</span
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
    </el-card>
    <el-dialog
      title="配置审核人员"
      :visible.sync="dialogPersonVisible"
      width="30%"
    >
      <el-form
        :model="dialogPersonForm"
        label-width="100px"
        :rules="dialogPersonFormRules"
        ref="dialogPersonForm"
      >
        <el-form-item label="审批部门" prop="approveDeptId">
          <el-select
            v-model="dialogPersonForm.approveDeptId"
            placeholder="请选择"
            @change="selectDept"
            size="medium"
          >
            <el-option
              :label="item.deptName"
              :value="item.deptId"
              v-for="item in deptList"
              :key="item.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批人" prop="approveUserId">
          <el-select
            v-model="dialogPersonForm.approveUserId"
            placeholder="请选择"
            :disabled="disabled"
            multiple
            size="medium"
          >
            <el-option
              :label="item.userName"
              :value="item.userId"
              v-for="item in userList"
              :key="item.userId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPersonVisible = false" size="medium"
          >取 消</el-button
        >
        <el-button type="primary" @click="handlePersonSubmit" size="medium"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { list, save, del } from "@/api/project/process";
import { listDept } from "@/api/system/dept";
import { listUser } from "@/api/system/user";
export default {
  data() {
    return {
      deptList: [],
      userList: [],
      disabled: true,
      deptId: "",
      dialogPersonForm: {
        approveType: "",
        approveDeptId: "",
        approveUserId: []
      },
      dialogPersonVisible: false,
      dialogPersonFormRules: {
        approveDeptId: [
          {
            required: true,
            message: "请选择审批部门",
            trigger: "change"
          }
        ],
        approveUserId: [
          {
            required: true,
            message: "请选择审批人",
            trigger: "change",
            type: "array"
          }
        ]
      },
      tableLoading: true,
      industryType: [],
      currentType: 0,
      auditFlow: []
    };
  },
  mounted() {
    this.getDicts("industry_type").then(response => {
      this.industryType = response.data;
      this.dialogPersonForm.approveType = response.data[0].dictValue;
      this.getAuditFlow();
    });
    listDept().then(res => {
      this.deptList = res.data;
    });
  },
  methods: {
    getAuditFlow() {
      list({ approveType: this.dialogPersonForm.approveType })
        .then(res => {
          if (res.code === 200) {
            console.log("流程", res.data.data);
            this.tableLoading = false;
            this.auditFlow = res.data.data;
          }
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    selectDept(val) {
      this.deptId = val;
      this.getUserList();
      this.dialogPersonForm.approveUserId = [];
    },
    //获取用户列表
    getUserList() {
      this.disabled = true;
      let data = {
        pageNum: 1,
        pageSize: 100,
        deptId: this.deptId
      };
      listUser(data).then(res => {
        this.disabled = false;
        this.userList = res.rows;
      });
    },
    switchIndustryType(item, index) {
      this.currentType = index;
      this.dialogPersonForm.approveType = item.dictValue;
      this.getAuditFlow();
    },
    addPerson(row) {
      console.log(row);
      this.dialogPersonVisible = true;
      this.dialogPersonForm = row;
      // let approveUserId = row.approveUserId.splite(",");
      // debugger;
      this.dialogPersonForm.approveUserId = row.users.map(item => item.userId);
      this.deptId = row.approveDeptId;
      this.getUserList();
    },
    //添加审核人员
    handlePersonSubmit() {
      this.$refs.dialogPersonForm.validate(valid => {
        if (!valid) return;
        let data = {
          approveId: this.dialogPersonForm.approveType,
          id: this.dialogPersonForm.id,
          approveDeptId: this.dialogPersonForm.approveDeptId,
          approveUserId: this.dialogPersonForm.approveUserId.join(","),
          approveType: this.dialogPersonForm.approveType
        };
        console.log("提交的数据", data);
        save(data).then(res => {
          if (res.code === 200) {
            this.$message.success("配置审核人员成功");
            this.dialogPersonVisible = false;
            this.getAuditFlow();
          }
        });
      });
    },
    handleClose(item) {
      console.log(item);

      // this.$confirm("是否确认删除该审核人吗?", "提醒", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(function() {
      //     this.handlePersonSubmit();
      //   })
      //   .then(() => {
      //     this.getAuditFlow();
      //     this.msgSuccess("删除成功");
      //   })
      //   .catch(function() {});
    }
  },
  watch: {
    dialogPersonVisible(val) {
      if (!val) {
        this.$refs.dialogPersonForm.resetFields();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.p-w {
  position: relative;
  top: 25px;
}
</style>
