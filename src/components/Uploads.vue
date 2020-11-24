<template>
  <div>
    <el-upload
      :action="uploadUrl"
      :on-success="handleSuccess"
      name="file"
      :accept="accept"
      ref="uploads"
      :headers="headers"
      :show-file-list="false"
    >
      <div class="upload-btn">
        <i slot="default" class="el-icon-plus"></i>
      </div>
    </el-upload>
    <ul class="preview-container" v-if="successList.length > 0">
      <li
        v-for="(item, index) in successList"
        :key="item.src"
        class="preview-item"
      >
        <div v-if="item.fileType === 0" class="mask-box">
          <img class="upload-img" :src="item.url" alt="" />
          <div class="mask">
            <i
              class="iconfont iconchakan"
              @click="handlePictureCardPreview(item.url)"
            ></i>
            <i
              class="iconfont iconshanchu"
              @click="handleRemove(index, item)"
            ></i>
          </div>
        </div>
        <div v-else class="mask-box">
          <i class="iconfont icondakaixiangmu"></i>
          <span>{{ item.remark }}</span>
          <div class="mask">
            <i
              class="iconfont iconshanchu"
              @click="handleRemove(index, item)"
            ></i>
          </div>
        </div>
      </li>
    </ul>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
  props: {
    resourceType: {
      default: 0
    }
  },
  data() {
    return {
      uploadUrl: `${process.env.VUE_APP_BASE_API}/system/oss/upload`,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      successList: []
    };
  },
  methods: {
    handleSuccess(response, file, fileList) {
      console.log("response", response);
      console.log("file", file);
      console.log("fileList", fileList);

      if (response.code === 200) {
        let type = ["image/png", "image/jpeg", "image/jpg"];
        if (type.indexOf(file.raw.type) != -1) {
          this.successList = [
            ...this.successList,
            {
              url: response.data.src,
              fileType: 0,
              resourceType: this.resourceType
            }
          ];
        } else {
          this.successList = [
            ...this.successList,
            {
              url: response.data.src,
              fileType: 1,
              remark: file.raw.name,
              resourceType: this.resourceType
            }
          ];
        }
        this.$emit("uploadSuccess", this.successList);
      }
    },
    handleRemove(index, item) {
      this.successList.splice(index, 1);
      this.$emit("removeSuccess", this.successList);
    },
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    }
  },
  computed: {
    accept() {
      return "image/png,image/jpeg,image/jpg,text/plain,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    },
    headers() {
      return {
        Authorization: "Bearer " + getToken()
      };
    }
  }
};
</script>
<style lang="less" scoped>
.upload-btn {
  width: 240px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border: 1px dashed #e5e5e5;
  float: left;
}
.preview-container {
  height: 120px;
  .preview-item {
    width: 240px;
    height: 120px;
    float: left;
    position: relative;
    margin-left: 20px;
    &:first-child {
      margin-left: 0;
    }
    border: 1px solid #e5e5e5;
    .upload-img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .mask-box {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 120px;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: #1890ff;
      display: none;
      text-align: center;
      line-height: 120px;
      i {
        cursor: pointer;
        user-select: none;
        color: #fff;
      }
      .iconchakan {
        margin-right: 30px;
      }
    }
  }
  .preview-item:hover {
    .mask {
      display: block;
    }
  }
}
</style>
