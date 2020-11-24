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

    <el-card shadow="never" class="detail-box mt10">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="栏目一" name="first">
          <div class="type-title">基础信息</div>
          <el-row :gutter="30">
            <el-col :sm="12" :lg="5">
              <div class="item">
                <span class="label">姓名</span>
                <span class="text">张天佑</span>
              </div>
            </el-col>
            <el-col :sm="12" :lg="5">
              <div class="item">
                <span class="label">性别</span>
                <span class="text">女</span>
              </div>
            </el-col>

            <el-col :sm="12" :lg="5">
              <div class="item">
                <span class="label">出生日期</span>
                <span class="text">2020.02.02</span>
              </div>
            </el-col>
            <el-col :sm="12" :lg="5">
              <div class="item">
                <span class="label">家庭电话</span>
                <span class="text">15898748789</span>
              </div>
            </el-col>
            <el-col :sm="12" :lg="5">
              <div class="item">
                <span class="label">户籍所在地</span>
                <span class="text">浙江舟山</span>
              </div>
            </el-col>
          </el-row>

          <div class="type-title">其他信息</div>
          <el-row :gutter="30">
            <el-col :sm="12" :lg="10">
              <div class="item">
                <span class="label">原因</span>
                <span class="text"
                  >这里是具体流失原因这里是具体流失原因这里是具体
                </span>
              </div>
            </el-col>
            <el-col :sm="12" :lg="10">
              <div class="item">
                <span class="label">原因</span>
                <span class="text"
                  >这里是具体流失原因这里是具体流失原因这里是具体
                </span>
              </div>
            </el-col>
            <el-col :sm="12" :lg="20">
              <div class="item single-row">
                <span class="label">备注</span>
                <span class="text"
                  >这里是具体流失原因这里是具体流失原因这里是具体
                  流失原因这里是具体流这里是具体流失原因这里是具
                  体流失原因这里是具体流失原因这里是具体流。这里是具体流失原因这里是具体流失原因这里是具体
                  流失原因这里是具体流这里是具体流失原因这里是具
                  体流失原因这里是具体流失原因这里是具体流。这里是具体流失原因这里是具体流失原因这里是具体
                  流失原因这里是具体流这里是具体流失原因这里是具
                  体流失原因这里是具体流失原因这里是具体流。这里是具体流失原因这里是具体流失原因这里是具体
                  流失原因这里是具体流这里是具体流失原因这里是具
                  体流失原因这里是具体流失原因这里是具体流。</span
                >
              </div>
            </el-col>

            <el-col :sm="12" :lg="5">
              <div class="item">
                <span class="label">其他</span>
                <span class="text">其他</span>
              </div>
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
          >栏目二栏目二栏目二</el-tab-pane
        >
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
