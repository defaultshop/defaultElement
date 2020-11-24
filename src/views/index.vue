<template>
  <div class="home-wrap">
    <el-card shadow="never">
      <div class="head-bar">
        <div class="title">任务完成情况</div>
        <div class="operate">
          <el-select
            placeholder="全市"
            size="medium"
            v-model="form.select"
            style="width: 100px"
          >
            <el-option label="全市" value="全市"> </el-option>
            <el-option label="安仁镇" value="安仁镇"> </el-option>
          </el-select>
        </div>
      </div>

      <div class="situation-list clearfix mt20">
        <div class="item active">
          <div class="bg">
            <div class="line">
              <span class="type-name">引进项目</span>
              <span class="text align-right">单位：个</span>
            </div>
            <div class="number">
              <count-to :start-val="0" :end-val="21" :duration="3000" />
            </div>
            <div class="line">
              <span class="text">本年度指标：2</span>
              <span class="text align-right">81%</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="bg">
            <div class="line">
              <span class="type-name">合同金额</span>
              <span class="text align-right">单位：万元</span>
            </div>
            <div class="number">
              <count-to :start-val="0" :end-val="8710" :duration="3000" />
            </div>
            <div class="line">
              <span class="text">本年度指标：12000</span>
              <span class="text align-right">68%</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="bg">
            <div class="line">
              <span class="type-name">项目到资</span>
              <span class="text align-right">单位：万元</span>
            </div>
            <div class="number">
              <count-to :start-val="0" :end-val="3000" :duration="3000" />
            </div>
            <div class="line">
              <span class="text">本年度指标：5000</span>
              <span class="text align-right">60%</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="bg">
            <div class="line">
              <span class="type-name">项目落地</span>
              <span class="text align-right">单位：个</span>
            </div>
            <div class="number">
              <count-to :start-val="0" :end-val="18" :duration="3000" />
            </div>
            <div class="line">
              <span class="text">本年度指标：15</span>
              <span class="text align-right">125%</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="bg">
            <div class="line">
              <span class="type-name">项目投产</span>
              <span class="text align-right">单位：个</span>
            </div>
            <div class="number">
              <count-to :start-val="0" :end-val="12" :duration="3000" />
            </div>
            <div class="line">
              <span class="text">本年度指标：10</span>
              <span class="text align-right">125%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="echart-box">
        <div class="title">引进项目</div>
        <div class="chart">
          <div id="lineChart" style="width: 100%; height: 100%"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import resize from "./dashboard/mixins/resize";
import CountTo from "vue-count-to";

export default {
  components: {
    CountTo
  },
  mixins: [resize],
  data() {
    return {
      form: {
        select: ""
      }
    };
  },
  methods: {
    lineChartBox() {
      let myChart = echarts.init(document.getElementById("lineChart"));
      this.chart = myChart;
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#97a5b9"
            }
          }
        },

        grid: {
          top: "30",
          left: "50",
          right: "100",
          bottom: "10",
          containLabel: true
        },
        xAxis: {
          name: "月份",
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ],
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#C9C9C9",
              width: "1"
            }
          },
          axisTick: {
            //刻度线
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999",
              fontSize: 14
            }
          }
        },

        yAxis: {
          name: "个",
          min: 0, //y轴最小值
          max: 60,
          interval: 10,
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#C9C9C9",
              width: "1"
            }
          },

          splitLine: {
            lineStyle: {
              width: "1",
              color: "#E7E7E7"
            }
          },
          axisTick: {
            //刻度线
            show: false
          },
          axisLabel: {
            margin: 16,
            textStyle: {
              align: "right",
              baseline: "middle",
              color: "#999",
              fontSize: 14
            }
          }
        },
        series: [
          {
            name: "引进项目（个）",
            type: "line",
            symbol: "circle",
            symbolSize: 10,
            sampling: "average",
            itemStyle: {
              normal: {
                color: "#28BB6D",
                lineStyle: {
                  color: "#A0DFBE",
                  width: 4
                }
              }
            },
            data: [10, 10, 24, 18, 29, 40, 48, 36, 30, 10, 21, 14],

            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "white"
              }
            },
            areaStyle: {
              normal: {
                color: "rgba(40, 187, 109, .1)"
              }
            }
          }
        ]
      });
    }
  },
  mounted() {
    this.lineChartBox();
  }
};
</script>
