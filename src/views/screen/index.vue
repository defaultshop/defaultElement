<template>
  <div class="screen-wrap">
    <div class="logo-bar">
      <img src="@/assets/img/data/logo.png" alt="" />
    </div>

    <div class="content-box">
      <div class="left-side">
        <!--引进项目数量-->
        <div class="column-box">
          <div class="type-title">• 引进项目数量</div>
          <div class="chart">
            <div
              id="projectNumberChart"
              style="width: 100%; height: 100%"
            ></div>
          </div>
        </div>

        <!--合同金额-->
        <div class="column-box mt">
          <div class="type-title">• 合同金额</div>
          <div class="chart">
            <div
              id="contractAmountChart"
              style="width: 100%; height: 100%"
            ></div>
          </div>
        </div>

        <!--项目到资-->
        <div class="column-box mt">
          <div class="type-title">• 项目到资</div>
          <div class="chart">
            <div
              id="projectCapitalChart"
              style="width: 100%; height: 100%"
            ></div>
          </div>
        </div>
      </div>

      <div class="middle-side">
        <!--2个饼图-->
        <div class="column-box no-border">
          <div class="type-title">• 年度招商引资数据总览</div>
          <div class="data-list">
            <div class="item">
              <p>引进项目指标</p>
              <p><count-to :start-val="0" :end-val="400" :duration="3000" /></p>
            </div>
            <div class="item">
              <p>已签约</p>
              <p><count-to :start-val="0" :end-val="356" :duration="3000" /></p>
            </div>
            <div class="item">
              <p>已落地</p>
              <p><count-to :start-val="0" :end-val="201" :duration="3000" /></p>
            </div>
            <div class="item">
              <p>已投产</p>
              <p><count-to :start-val="0" :end-val="125" :duration="3000" /></p>
            </div>
            <div class="item">
              <p>合同总金额(万元)</p>
              <p>
                <count-to :start-val="0" :end-val="2.5657" :duration="3000" />
              </p>
            </div>
            <div class="item">
              <p>已到资金额(万元)</p>
              <p>
                <count-to :start-val="0" :end-val="1.5657" :duration="3000" />
              </p>
            </div>
            <div class="item">
              <p>到资比例</p>
              <p><count-to :start-val="0" :end-val="60" :duration="3000" />%</p>
            </div>
          </div>
          <!-- <div class="pie-chart">
            <div class="item">
              <div id="signUpChart" style="width: 100%; height: 100%"></div>
              <div class="count-number">
                <p class="text">已签约</p>
                <p class="num">90.09%</p>
              </div>
            </div>
            <div class="item">
              <div id="capitalChart" style="width: 100%; height: 100%"></div>
              <div class="count-number">
                <p class="text">已到资金额</p>
                <p class="num">80%</p>
              </div>
            </div>
          </div> -->
        </div>

        <!--每月数据统计-->
        <div class="column-box max mt">
          <div class="type-title">• 每月数据统计</div>
          <div class="chart">
            <div
              id="monthStatisticsChart"
              style="width: 100%; height: 100%"
            ></div>
          </div>
        </div>
      </div>

      <div class="right-side">
        <!--项目落地-->
        <div class="column-box">
          <div class="type-title">• 项目落地</div>
          <div class="chart">
            <div id="projectLandChart" style="width: 100%; height: 100%"></div>
          </div>
        </div>

        <!--项目投产-->
        <div class="column-box mt">
          <div class="type-title">• 项目投产</div>
          <div class="chart">
            <div
              id="projectLaunchChart"
              style="width: 100%; height: 100%"
            ></div>
          </div>
        </div>

        <!--行业数据分析-->
        <div class="column-box mt">
          <div class="type-title">• 行业数据分析</div>
          <div class="chart">
            <div id="dataAnalysisChart" style="width: 100%; height: 100%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/assets/css/screen.less" lang="less">
</style>

<script>
import echarts from "echarts";
import CountTo from "vue-count-to";
export default {
  components: {
    CountTo,
  },
  data() {
    return {};
  },
  methods: {
    //引进项目数量
    projectNumberBox() {
      let myChart = echarts.init(document.getElementById("projectNumberChart"));
      myChart.setOption({
        legend: {
          x: "right",
          y: "top",
          itemWidth: 18,
          itemHeight: 6,
          itemGap: 20, //间距
          textStyle: {
            //图例文字的样式
            color: "#BBE6FF",
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "40",
          left: "30",
          right: "20",
          bottom: "50",
        },
        dataset: {
          source: [
            [
              "",
              "安仁镇",
              "查田镇",
              "八都镇",
              "龙源街道",
              "上垟街道",
              "经贸局",
              "建设局",
              "旅游局",
              "农业局",
              "招商办",
            ],
            ["计划", 14, 16, 18, 20, 30, 20, 16, 18, 20, 15],
            ["实际", 20, 16, 18, 20, 15, 8, 6, 22, 10, 12],
          ],
        },
        xAxis: {
          name: "",
          type: "category",
          gridIndex: 0,
          axisLine: {
            lineStyle: {
              color: "#2E6C94",
              width: "1",
            },
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: "1",
              color: "rgba(106, 137, 215, 0.1)",
            },
          },
          axisTick: {
            //刻度线
            show: false,
          },

          axisLabel: {
            interval: 0,
            rotate: -50,
            textStyle: {
              color: "#BBE6FF",
              fontSize: 12,
            },
          },
        },
        yAxis: {
          name: "个",
          gridIndex: 0,
          min: 0, //y轴最小值
          max: 40, //y轴最大值
          interval: 10,
          axisLine: {
            lineStyle: {
              color: "#2E6C94",
              width: "1",
            },
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: "1",
              color: "rgba(106, 137, 215, 0.1)",
            },
          },
          axisTick: {
            //刻度线
            show: false,
          },
          axisLabel: {
            textStyle: {
              align: "right",
              baseline: "middle",
              color: "#BBE6FF",
              fontSize: 12,
            },
          },
        },
        series: [
          { type: "bar", seriesLayoutBy: "row", barWidth: 6, color: "#E17950" }, //计划
          { type: "bar", seriesLayoutBy: "row", barWidth: 6, color: "#07A2FB" }, //实际
        ],
      });
    },

    //合同金额
    contractAmountBox() {
      let myChart = echarts.init(
        document.getElementById("contractAmountChart")
      );
      myChart.setOption({
        legend: {
          icon: "rect",
          x: "right",
          y: "top",
          itemWidth: 18,
          itemHeight: 6,
          itemGap: 20, //间距
          textStyle: {
            //图例文字的样式
            color: "#BBE6FF",
            fontSize: 12,
          },
          data: ["计划", "实际"],
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "40",
          left: "30",
          right: "20",
          bottom: "50",
        },
        xAxis: {
          name: "",
          type: "category",
          data: [
            "安仁镇",
            "查田镇",
            "八都镇",
            "龙源街道",
            "上垟街道",
            "经贸局",
            "建设局",
            "旅游局",
            "农业局",
            "招商办",
          ],
          axisLine: {
            lineStyle: {
              color: "#2E6C94",
              width: "1",
            },
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: "1",
              color: "rgba(106, 137, 215, 0.1)",
            },
          },
          axisTick: {
            //刻度线
            show: false,
          },
          axisLabel: {
            interval: 0,
            rotate: -50,
            textStyle: {
              color: "#BBE6FF",
              fontSize: 12,
            },
          },
        },

        yAxis: {
          name: "万元",
          min: 0, //y轴最小值
          max: 60,
          interval: 10,
          axisLine: {
            lineStyle: {
              color: "#2E6C94",
              width: "1",
            },
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: "1",
              color: "rgba(106, 137, 215, 0.1)",
            },
          },
          axisTick: {
            //刻度线
            show: false,
          },
          axisLabel: {
            textStyle: {
              align: "right",
              baseline: "middle",
              color: "#BBE6FF",
              fontSize: 12,
            },
          },
        },
        series: [
          {
            name: "计划",
            type: "line",
            symbol: "none", //这句就是去掉点的
            smooth: true, //曲线平滑
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: "#E17950",
                lineStyle: {
                  color: "#E17950",
                },
              },
            },
            data: [16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
          },
          {
            name: "实际",
            type: "line",
            smooth: true, //曲线平滑
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: "#07A2FB",
                lineStyle: {
                  color: "#07A2FB",
                },
              },
            },
            data: [10, 10, 24, 8, 29, 40, 48, 36, 30, 10],
          },
        ],
      });
    },

    //项目到资
    projectCapitalBox() {
      let myChart = echarts.init(
        document.getElementById("projectCapitalChart")
      );
      myChart.setOption({
        legend: {
          x: "right",
          y: "top",
          itemWidth: 18,
          itemHeight: 6,
          itemGap: 20, //间距
          textStyle: {
            //图例文字的样式
            color: "#BBE6FF",
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "40",
          left: "30",
          right: "20",
          bottom: "50",
        },
        dataset: {
          source: [
            [
              "",
              "安仁镇",
              "查田镇",
              "八都镇",
              "龙源街道",
              "上垟街道",
              "经贸局",
              "建设局",
              "旅游局",
              "农业局",
              "招商办",
            ],
            ["计划", 14, 16, 18, 20, 30, 20, 16, 18, 20, 15],
            ["实际", 20, 16, 18, 20, 15, 8, 6, 22, 10, 12],
          ],
        },
        xAxis: {
          name: "",
          type: "category",
          gridIndex: 0,
          axisLine: {
            lineStyle: {
              color: "#2E6C94",
              width: "1",
            },
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: "1",
              color: "rgba(106, 137, 215, 0.1)",
            },
          },
          axisTick: {
            //刻度线
            show: false,
          },

          axisLabel: {
            interval: 0,
            rotate: -50,
            textStyle: {
              color: "#BBE6FF",
              fontSize: 12,
            },
          },
        },
        yAxis: {
          name: "万元",
          gridIndex: 0,
          min: 0, //y轴最小值
          max: 40, //y轴最大值
          interval: 10,
          axisLine: {
            lineStyle: {
              color: "#2E6C94",
              width: "1",
            },
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: "1",
              color: "rgba(106, 137, 215, 0.1)",
            },
          },
          axisTick: {
            //刻度线
            show: false,
          },
          axisLabel: {
            textStyle: {
              align: "right",
              baseline: "middle",
              color: "#BBE6FF",
              fontSize: 12,
            },
          },
        },
        series: [
          { type: "bar", seriesLayoutBy: "row", barWidth: 6, color: "#E17950" }, //计划
          { type: "bar", seriesLayoutBy: "row", barWidth: 6, color: "#07A2FB" }, //实际
        ],
      });
    },

    //项目落地
    projectLandBox() {
      let myChart = echarts.init(document.getElementById("projectLandChart"));
      myChart.setOption({
        legend: {
          x: "right",
          y: "top",
          itemWidth: 18,
          itemHeight: 6,
          itemGap: 20, //间距
          textStyle: {
            //图例文字的样式
            color: "#BBE6FF",
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "40",
          left: "30",
          right: "20",
          bottom: "50",
        },
        dataset: {
          source: [
            [
              "",
              "安仁镇",
              "查田镇",
              "八都镇",
              "龙源街道",
              "上垟街道",
              "经贸局",
              "建设局",
              "旅游局",
              "农业局",
              "招商办",
            ],
            ["计划", 14, 16, 18, 20, 30, 20, 16, 18, 20, 15],
            ["实际", 20, 16, 18, 20, 15, 8, 6, 22, 10, 12],
          ],
        },
        xAxis: {
          name: "",
          type: "category",
          gridIndex: 0,
          axisLine: {
            lineStyle: {
              color: "#2E6C94",
              width: "1",
            },
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: "1",
              color: "rgba(106, 137, 215, 0.1)",
            },
          },
          axisTick: {
            //刻度线
            show: false,
          },

          axisLabel: {
            interval: 0,
            rotate: -50,
            textStyle: {
              color: "#BBE6FF",
              fontSize: 12,
            },
          },
        },
        yAxis: {
          name: "个",
          gridIndex: 0,
          min: 0, //y轴最小值
          max: 40, //y轴最大值
          interval: 10,
          axisLine: {
            lineStyle: {
              color: "#2E6C94",
              width: "1",
            },
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: "1",
              color: "rgba(106, 137, 215, 0.1)",
            },
          },
          axisTick: {
            //刻度线
            show: false,
          },
          axisLabel: {
            textStyle: {
              align: "right",
              baseline: "middle",
              color: "#BBE6FF",
              fontSize: 12,
            },
          },
        },
        series: [
          { type: "bar", seriesLayoutBy: "row", barWidth: 6, color: "#E17950" }, //计划
          { type: "bar", seriesLayoutBy: "row", barWidth: 6, color: "#07A2FB" }, //实际
        ],
      });
    },

    //项目投产
    projectLaunchBox() {
      let myChart = echarts.init(document.getElementById("projectLaunchChart"));
      myChart.setOption({
        legend: {
          icon: "rect",
          x: "right",
          y: "top",
          itemWidth: 18,
          itemHeight: 6,
          itemGap: 20, //间距
          textStyle: {
            //图例文字的样式
            color: "#BBE6FF",
            fontSize: 12,
          },
          data: ["计划", "实际"],
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "40",
          left: "30",
          right: "20",
          bottom: "50",
        },
        xAxis: {
          name: "",
          type: "category",
          data: [
            "安仁镇",
            "查田镇",
            "八都镇",
            "龙源街道",
            "上垟街道",
            "经贸局",
            "建设局",
            "旅游局",
            "农业局",
            "招商办",
          ],
          axisLine: {
            lineStyle: {
              color: "#2E6C94",
              width: "1",
            },
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: "1",
              color: "rgba(106, 137, 215, 0.1)",
            },
          },
          axisTick: {
            //刻度线
            show: false,
          },
          axisLabel: {
            interval: 0,
            rotate: -50,
            textStyle: {
              color: "#BBE6FF",
              fontSize: 12,
            },
          },
        },

        yAxis: {
          name: "万元",
          min: 0, //y轴最小值
          max: 60,
          interval: 10,
          axisLine: {
            lineStyle: {
              color: "#2E6C94",
              width: "1",
            },
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: "1",
              color: "rgba(106, 137, 215, 0.1)",
            },
          },
          axisTick: {
            //刻度线
            show: false,
          },
          axisLabel: {
            textStyle: {
              align: "right",
              baseline: "middle",
              color: "#BBE6FF",
              fontSize: 12,
            },
          },
        },
        series: [
          {
            name: "计划",
            type: "line",
            symbol: "none", //这句就是去掉点的
            smooth: true, //曲线平滑
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: "#E17950",
                lineStyle: {
                  color: "#E17950",
                },
              },
            },
            data: [16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
          },
          {
            name: "实际",
            type: "line",
            smooth: true, //曲线平滑
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: "#07A2FB",
                lineStyle: {
                  color: "#07A2FB",
                },
              },
            },
            data: [10, 10, 24, 8, 29, 40, 48, 36, 30, 10],
          },
        ],
      });
    },

    //行业数据分析
    dataAnalysisBox() {
      let myChart = echarts.init(document.getElementById("dataAnalysisChart"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          // formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          x: "right",
          y: "top",
          itemWidth: 18,
          itemHeight: 6,
          itemGap: 20, //间距
          textStyle: {
            //图例文字的样式
            color: "#BBE6FF",
            fontSize: 12,
          },
          data: ["高科技", "工业", "旅游业", "农业", "纺织业"],
        },
        //设置饼状图每个颜色块的颜色
        color: ["#07A2FB", "#1800FE", "#E1B050", "#CF714E", "#5A00FF"],
        series: [
          {
            name: "",
            type: "pie",
            radius: "58%",
            center: ["50%", "64%"],
            label: {
              normal: {
                //饼形图显示格式
                formatter: "{b|{b}}  {per|{d}%}  ",
                rich: {
                  b: {
                    color: "#7493E2",
                    fontSize: 12,
                    lineHeight: 33,
                  },
                  //设置百分比数字颜色
                  per: {
                    color: "#BBE6FF",
                    fontSize: 14,
                    padding: [2, 2],
                    borderRadius: 2,
                  },
                },
              },
            },
            data: [
              { value: 335, name: "高科技" },
              { value: 310, name: "工业" },
              { value: 234, name: "旅游业" },
              { value: 135, name: "农业" },
              { value: 1548, name: "纺织业" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },

    //已签约
    // signUpBox() {
    //   let myChart = echarts.init(document.getElementById("signUpChart"));
    //   myChart.setOption({
    //     tooltip: {
    //       trigger: "item",
    //       formatter: "{b}: {c} ({d}%)",
    //     },
    //     legend: {
    //       x: "center",
    //       y: "bottom",
    //       itemWidth: 18,
    //       itemHeight: 6,
    //       itemGap: 20, //间距
    //       textStyle: {
    //         //图例文字的样式
    //         color: "#BBE6FF",
    //         fontSize: 12,
    //       },
    //       data: ["已签约", "未完成"],
    //     },
    //     //设置饼状图每个颜色块的颜色
    //     color: ["#E17950", "#07A2FB"],
    //     series: [
    //       {
    //         name: "",
    //         type: "pie",
    //         radius: ["56%", "70%"],
    //         avoidLabelOverlap: false,
    //         label: {
    //           show: false,
    //           position: "center",
    //         },
    //         labelLine: {
    //           show: false,
    //         },
    //         data: [
    //           { value: 300, name: "已签约" },
    //           { value: 33, name: "未完成" },
    //         ],
    //       },
    //     ],
    //   });
    // },

    //已到资金额
    // capitalBox() {
    //   let myChart = echarts.init(document.getElementById("capitalChart"));
    //   myChart.setOption({
    //     tooltip: {
    //       trigger: "item",
    //       formatter: "{b}: {c} ({d}%)",
    //     },
    //     legend: {
    //       x: "center",
    //       y: "bottom",
    //       itemWidth: 18,
    //       itemHeight: 6,
    //       itemGap: 20, //间距
    //       textStyle: {
    //         //图例文字的样式
    //         color: "#BBE6FF",
    //         fontSize: 12,
    //       },
    //       data: ["已到资金额", "未到资金额"],
    //     },
    //     //设置饼状图每个颜色块的颜色
    //     color: ["#E17950", "#07A2FB"],
    //     series: [
    //       {
    //         name: "",
    //         type: "pie",
    //         radius: ["56%", "70%"],
    //         avoidLabelOverlap: false,
    //         label: {
    //           show: false,
    //           position: "center",
    //         },
    //         labelLine: {
    //           show: false,
    //         },
    //         data: [
    //           { value: 240, name: "已到资金额" },
    //           { value: 60, name: "未到资金额" },
    //         ],
    //       },
    //     ],
    //   });
    // },

    //每月数据统计
    monthStatisticsBox() {
      let myChart = echarts.init(
        document.getElementById("monthStatisticsChart")
      );
      myChart.setOption({
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "40",
          left: "30",
          right: "50",
          bottom: "30",
        },
        xAxis: {
          name: "月份",
          type: "category",
          data: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
          ],
          axisLine: {
            lineStyle: {
              color: "#2E6C94",
              width: "1",
            },
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: "1",
              color: "rgba(106, 137, 215, 0.1)",
            },
          },
          axisTick: {
            //刻度线
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#BBE6FF",
              fontSize: 12,
            },
          },
        },

        yAxis: {
          name: "",
          min: 0, //y轴最小值
          max: 60,
          interval: 10,
          axisLine: {
            lineStyle: {
              color: "#2E6C94",
              width: "1",
            },
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: "1",
              color: "rgba(106, 137, 215, 0.1)",
            },
          },
          axisTick: {
            //刻度线
            show: false,
          },
          axisLabel: {
            textStyle: {
              align: "right",
              baseline: "middle",
              color: "#BBE6FF",
              fontSize: 12,
            },
          },
        },
        series: [
          {
            name: "",
            type: "line",
            smooth: true, //曲线平滑
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: "#079DF4",
                lineStyle: {
                  color: "#079DF4",
                },
              },
            },
            data: [10, 10, 24, 8, 29, 40, 48, 36, 30, 10,12,20],
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "white",
              },
            },
            areaStyle: {
              normal: {
                color: "rgba(7, 162, 251, .5)",
              },
            },
          },
        ],
      });
    },
  },
  mounted() {
    this.projectNumberBox(); //引进项目数量
    this.contractAmountBox(); //合同金额
    this.projectCapitalBox(); //项目到资
    this.projectLandBox(); //项目落地
    this.projectLaunchBox(); //项目投产
    this.dataAnalysisBox(); //行业数据分析
    //this.signUpBox(); //已签约
    //this.capitalBox(); //已到资金额
    this.monthStatisticsBox();//每月数据统计
  },
};
</script>