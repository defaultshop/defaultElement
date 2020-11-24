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
      ]
    };
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
