export default {
  data() {
    return {
      moreSearchOptios: false, //筛选条件展开收起
      showHandleComponent: false,
      tableLoading: true,
      handleNeedDetails: {},
      searchForm: {}, //查询条件
      tableData: [], //表格数据
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    resetQuery() {
      this.searchForm = {};
      this.search();
    },
    search() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    handleQuery() {}
  },
  watch: {
    showHandleComponent(val) {
      if (!val) {
        this.search();
      }
    }
  }
};
