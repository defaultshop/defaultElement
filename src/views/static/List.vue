<template>
  <div class="manage-wrap">
    <!--搜索条件-->
    <el-card shadow="never">
      <div slot="header">
        <span class="title">项目管理</span>
        <span class="operate">展开<i class="iconfont iconarrowdown"></i></span>
        <!-- <span class="operate">收起<i class="iconfont iconarrowup"></i></span> -->
      </div>
      <el-form label-width="80px">
        <el-row :gutter="10">
          <el-col :sm="12" :lg="5">
            <el-form-item label="项目类型">
              <el-input placeholder="请输入项目名称" size="medium"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="5">
            <el-form-item label="项目类型">
              <el-select placeholder="选择项目类型" size="medium">
                <el-option label="区域一" value=""></el-option>
                <el-option label="区域二" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="5">
            <el-form-item label="项目类型">
              <el-select placeholder="选择项目类型" size="medium">
                <el-option label="区域一" value=""></el-option>
                <el-option label="区域二" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="5">
            <el-form-item label="项目类型">
              <el-select placeholder="选择项目类型" size="medium">
                <el-option label="区域一" value=""></el-option>
                <el-option label="区域二" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="4" class="right">
            <el-form-item label-width="0">
              <el-button type="primary" size="medium">查询</el-button>
              <el-button plain size="medium">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <!--展开内容-->
        <el-row :gutter="10">
          <el-col :sm="12" :lg="5">
            <el-form-item label="项目类型">
              <el-select placeholder="选择项目类型" size="medium">
                <el-option label="区域一" value=""></el-option>
                <el-option label="区域二" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="5">
            <el-form-item label="项目类型">
              <el-select placeholder="选择项目类型" size="medium">
                <el-option label="区域一" value=""></el-option>
                <el-option label="区域二" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="5">
            <el-form-item label="项目类型">
              <el-select placeholder="选择项目类型" size="medium">
                <el-option label="区域一" value=""></el-option>
                <el-option label="区域二" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="5">
            <el-form-item label="项目类型">
              <el-select placeholder="选择项目类型" size="medium">
                <el-option label="区域一" value=""></el-option>
                <el-option label="区域二" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="5">
            <el-form-item label="项目类型2">
              <el-select placeholder="选择项目类型" size="medium">
                <el-option label="区域一" value=""></el-option>
                <el-option label="区域二" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="5">
            <el-form-item label="项目类型">
              <el-select placeholder="选择项目类型" size="medium">
                <el-option label="区域一" value=""></el-option>
                <el-option label="区域二" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="5">
            <el-form-item label="项目类型">
              <el-select placeholder="选择项目类型" size="medium">
                <el-option label="区域一" value=""></el-option>
                <el-option label="区域二" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :lg="5">
            <el-form-item label="项目类型">
              <el-select placeholder="选择项目类型" size="medium">
                <el-option label="区域一" value=""></el-option>
                <el-option label="区域二" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!--表格-->
    <el-card shadow="never" class="mt10">
      <el-row>
        <el-button type="primary" size="medium">新增项目</el-button>
        <el-button size="medium">导出报表</el-button>
      </el-row>
      <el-row class="mt20">
        <div class="table-list">
          <el-table :data="tableData" border>
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </div>
      </el-row>
      <el-row class="mt20 cent">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
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
  mounted() {
    let url = "/public/yysc/app/getNewApp";
    let data = {
      appLimit: 5
    };
    url.get({ data }).then(res => {
      console.log(res);
      debugger;
    });
  }
};
</script>
