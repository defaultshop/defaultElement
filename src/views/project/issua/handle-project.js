import Uploads from "@/components/Uploads";
import {
  industryType,
  treeselect,
  addProject,
  editProject
} from "@/api/project/project";
import { listDept } from "@/api/system/dept";
import dictName from "@/mixins/dictName";
export default {
  mixins: [dictName],
  components: {
    Uploads
  },
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    details: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      currentStatus: false,
      currentTitle: "",
      activeName: "basicInfo",
      handleForm: {
        isBigProject: 0,
        // isRunAway: 1,
        industryContractDistributionsList: [{}],
        industryPeojectArriveList: [{}]
      },
      rules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        investmentCompany: [
          { required: true, message: "请输入投资单位", trigger: "blur" }
        ],
        companyLinkUser: [
          { required: true, message: "请输入企业联系人", trigger: "blur" }
        ],
        companyLinkUserPhone: [
          {
            required: true,
            message: "请输入企业联系人电话",
            trigger: "blur"
          }
        ],
        industryTypeId: [
          {
            required: true,
            message: "请选择产业类型",
            trigger: "change"
          }
        ],
        province: [
          {
            required: true,
            message: "请选择招商区块",
            trigger: "change"
          }
        ],
        importCompany: [
          {
            required: true,
            message: "请选择引入单位",
            trigger: "change"
          }
        ],
        importCompanyUser: [
          {
            required: true,
            message: "请输入引入单位联系人",
            trigger: "blur"
          }
        ],
        importCompanyUserPhone: [
          {
            required: true,
            message: "请输入引进单位联系人电话",
            trigger: "blur"
          }
        ],
        isBigProject: [
          {
            required: true,
            message: "请选择是否大项目",
            trigger: "blur"
          }
        ]
      },
      industryTypeList: [], //产业类型
      provinceList: [], //招商区块省
      cityList: [], //招商区块市
      investmentMethod: [], //投资方式
      deptList: [], //部门
      landType: [], //用地类型,
      industryPeojectArriveAuditStatus: [],
      secondAreaDisabled: true,
      contractAssignMoneyData: [
        {},
        {
          unitName: "农业局",
          money: "1000"
        }
      ],
      contractMoneyAccountedData: [{}, {}],
      auditedRecordData: [{}],
      industryFileList1: [],
      industryFileList2: [],
      industryFileList3: []
    };
  },

  computed: {
    detailComputed() {
      return this.details;
    }
  },
  methods: {
    switchCurrentTab() {},

    //选中省
    selectFristAreaChange(val) {
      let ss = this.provinceList.find(item => item.id === val);
      if (ss.children && ss.children.length > 0) {
        this.handleForm.city = ss.children[0].id;
        this.cityList = ss.children;
        this.secondAreaDisabled = false;
      }
    },
    /** 查询部门列表 */
    getDeptList() {
      listDept().then(res => {
        this.deptList = res.data;
      });
    },
    // 合同额分配添加一行
    addAssignModel() {
      this.handleForm.industryContractDistributionsList.push({});
    },
    // 合同额分配删除一行
    delAssignModel(scope) {
      this.handleForm.industryContractDistributionsList.splice(scope.$index, 1);
    },
    //项目到资添加一行
    addAccountedModel() {
      this.handleForm.industryPeojectArriveList.push({});
    },
    //项目到资删除一行
    delAccountedModel(scope) {
      this.handleForm.industryPeojectArriveList.splice(scope.$index, 1);
    },
    //获取该页所需的基础数据
    getBaseData() {
      industryType().then(res => {
        if (res.code === 200) {
          this.industryTypeList = res.data;
        }
      });
      this.getDicts("investment_method").then(response => {
        this.investmentMethod = response.data;
      });
      this.getDeptList();
      this.getDicts("land_type").then(response => {
        this.landType = response.data;
      });
      this.getDicts("industryPeojectArrive_auditStatus").then(response => {
        this.industryPeojectArriveAuditStatus = response.data;
      });
    },
    runAwayChange(val) {
      if (val === "1") {
        this.handleForm.runAwayRemark = "";
        this.handleForm.remark = "";
      }
    },
    hanleSubmit() {
      this.$refs.handleForm.validate(valid => {
        if (!valid) return;
        console.log("提交的数据", this.handleForm);
        this.handleForm.industryFileList = [
          ...this.industryFileList1,
          ...this.industryFileList2,
          ...this.industryFileList3
        ];
        if (!this.details.id) {
          addProject(this.handleForm).then(res => {
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.currentStatus = false;
            }
          });
          return;
        }
        editProject(this.handleForm).then(res => {
          if (res.code === 200) {
            this.$message.success("编辑成功");
            this.currentStatus = false;
          }
        });
      });
    },
    uploadSuccess(fileList, i) {
      if (i === 1) {
        this.industryFileList1 = fileList;
      }
      if (i === 2) {
        this.industryFileList2 = fileList;
      }
      if (i === 3) {
        this.industryFileList3 = fileList;
      }
    },
    removeSuccess(fileList, i) {
      if (i === 1) {
        this.industryFileList1 = fileList;
      }
      if (i === 2) {
        this.industryFileList2 = fileList;
      }
      if (i === 3) {
        this.industryFileList3 = fileList;
      }
    }
  },
  watch: {
    value(val) {
      this.currentStatus = val;
    },

    currentStatus(val) {
      this.$emit("input", val);
      this.activeName = "basicInfo";
      if (val && !this.details.id) {
        this.handleForm = {
          isBigProject: "0",
          isRunAway: "1",
          industryContractDistributionsList: [{}],
          industryPeojectArriveList: [{}]
        };
        //获取招商区块
        treeselect().then(res => {
          if (res.code === 200) {
            this.provinceList = res.data;
          }
        });
        this.getBaseData();
      }
    },
    detailComputed(val) {
      if (val.id) {
        console.log("编辑的数据", val);
        this.handleForm = val;
        if (val.city) {
          //获取招商区块
          treeselect().then(res => {
            if (res.code === 200) {
              this.provinceList = res.data;
              let ss = this.provinceList.find(item => item.id === val.province);
              if (ss.children && ss.children.length > 0) {
                this.cityList = ss.children;
                this.secondAreaDisabled = false;
              }
            }
          });
          this.getBaseData();
        }
      }
    }
  }
};
