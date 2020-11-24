<template>
  <div class="manage-wrap">
    <el-card shadow="never">
      <div class="edit-head">
        <div class="title">
          年产50000吨不锈钢管坯<span class="state green">已签约</span>
        </div>
        <div class="right-side">
          <el-button size="medium">返回</el-button>
          <el-button type="primary" size="medium">提交</el-button>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" class="edit-form mt10">
      <el-form label-position="top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="栏目一" name="first">
            <div class="type-title">基础信息</div>
            <el-row :gutter="30">
              <el-col :sm="12" :lg="5">
                <el-form-item label="姓名">
                  <el-input
                    placeholder="请输入姓名"
                    size="medium"
                    value="张萌"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="5">
                <el-form-item label="性别">
                  <el-select
                    placeholder="选择性别"
                    size="medium"
                    v-model="form.sex"
                  >
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="5">
                <el-form-item label="出生日期">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.date"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="5">
                <el-form-item label="注册金额" class="unit">
                  <el-input
                    placeholder="请输入注册金额"
                    size="medium"
                    value=""
                  ></el-input>
                  <span class="text">万元</span>
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="5">
                <el-form-item label="区块">
                  <el-row :gutter="0">
                    <el-col span="11">
                      <el-select placeholder="请选择省" size="medium">
                        <el-option label="浙江省" value="浙江省"></el-option>
                      </el-select>
                    </el-col>
                    <el-col class="line" span="2">-</el-col>
                    <el-col span="11">
                      <el-select placeholder="请选择市" size="medium">
                        <el-option label="杭州" value="杭州"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="type-title">其他信息</div>
            <el-row :gutter="30">
              <el-col :sm="12" :lg="5">
                <el-form-item label="其他残疾">
                  <el-radio v-model="form.radio" label="1">是</el-radio>
                  <el-radio v-model="form.radio" label="2">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="15">
                <el-form-item label="多选">
                  <el-checkbox-group v-model="form.checkList">
                    <el-checkbox label="复选框 A"></el-checkbox>
                    <el-checkbox label="复选框 B"></el-checkbox>
                    <el-checkbox label="禁用" disabled></el-checkbox>
                    <el-checkbox label="选中且禁用" disabled></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="10">
                <el-form-item label="原因">
                  <el-input
                    type="textarea"
                    placeholder="请输入"
                    :autosize="{ minRows: 5, maxRows: 8 }"
                    v-model="form.desc"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="10">
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    placeholder="请输入"
                    :autosize="{ minRows: 5, maxRows: 8 }"
                    v-model="form.desc"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="12" :lg="20">
                <div class="table-list">
                  <div class="table-label">合同额分配情况（单位：万元）</div>
                  <el-table :data="tableData" border>
                    <el-table-column prop="date" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="140">
                      <template slot-scope="scope">
                        <el-link type="primary">添加</el-link>
                        <el-link type="danger">删除</el-link>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="栏目二" name="second"
            ><table
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="custom-table"
            >
              <tbody>
                <tr>
                  <th width="160">类目</th>
                  <th>一产</th>
                  <th>二产</th>
                  <th>三产</th>
                  <th>总计</th>
                </tr>
                <tr>
                  <td align="center">11</td>
                  <td>
                    <el-input
                      placeholder="请输入姓名"
                      size="medium"
                      value="张萌"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      placeholder="请输入姓名"
                      size="medium"
                      value="张萌"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      placeholder="请输入姓名"
                      size="medium"
                      value="张萌"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      placeholder="请输入姓名"
                      size="medium"
                      value="张萌"
                    ></el-input>
                  </td>
                </tr>
              </tbody></table
          ></el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      form: {
        date: "",
        sex: "",
        radio: "",
        checkList: ["选中且禁用", "复选框 A"],
        desc: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
