import { industryType } from "@/api/project/project";
import { listDept } from "@/api/system/dept";
export default {
  data() {
    return {
      //审核状态
      auditStatus: [
        {
          code: 0,
          name: "待初审"
        },
        {
          code: 1,
          name: "待复审"
        },
        {
          code: 2,
          name: "初审未通过"
        },
        {
          code: 3,
          name: "复审通过"
        },
        {
          code: 4,
          name: "复审未通过"
        }
      ],
      projectStatus: [
        {
          code: 0,
          name: "已签约"
        },
        {
          code: 1,
          name: "已落地"
        },
        {
          code: 2,
          name: "已投产"
        },
        {
          code: 3,
          name: "已流失"
        }
      ],
      industryTypeList: [], //产业类型
      deptList: [], //引入单位
      investmentMethod: [], //投资方式
      deptTypeList: [] //部门类型
    };
  },
  mounted() {
    industryType().then(res => {
      if (res.code === 200) {
        this.industryTypeList = res.data;
      }
    });
    listDept().then(res => {
      this.deptList = res.data;
    });
    this.getDicts("investment_method").then(response => {
      this.investmentMethod = response.data;
    });
    this.getDicts("dept_type").then(response => {
      this.deptTypeList = response.data;
    });
  },
  computed: {
    auditStatusName() {
      return function(params) {
        let ss = this.auditStatus.find(item => item.code === params);
        return ss && ss.name;
      };
    },
    projectStatusName() {
      return function(params) {
        let ss = this.projectStatus.find(item => item.code === params);
        return ss && ss.name;
      };
    }
  }
};
