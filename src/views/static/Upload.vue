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
          <div class="type-title">企业注册资料</div>
          <el-row :gutter="30">
            <el-col span="24">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
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
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //上传
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
  },
};
</script>
