<template>
  <div class="add-project" v-if="currentStatus">
    <div class="manage-wrap">
      <el-card shadow="never">
        <div class="edit-head">
          <div class="title" v-if="details.id">
            {{ details.projectName
            }}<span class="state green">{{
              projectStatusName(details.projectState)
            }}</span>
          </div>
          <div class="title" v-else>新增项目</div>
          <div class="right-side">
            <el-button size="medium" @click="currentStatus = false"
              >返回</el-button
            >
            <el-button type="primary" size="medium" @click="hanleSubmit"
              >提交</el-button
            >
          </div>
        </div>
      </el-card>
      <el-card shadow="never" class="edit-form mt10">
        <el-form
          label-position="top"
          :model="handleForm"
          :rules="rules"
          ref="handleForm"
        >
          <el-tabs v-model="activeName" @tab-click="switchCurrentTab">
            <el-tab-pane label="基础信息" name="basicInfo">
              <div class="type-title">基础信息</div>
              <el-row :gutter="30">
                <el-col :sm="12" :lg="5">
                  <el-form-item label="项目名称" prop="projectName">
                    <el-input
                      placeholder="请输入"
                      size="medium"
                      :maxlength="20"
                      v-model="handleForm.projectName"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="投资单位" prop="investmentCompany">
                    <el-input
                      placeholder="请输入"
                      size="medium"
                      :maxlength="20"
                      v-model="handleForm.investmentCompany"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="企业联系人" prop="companyLinkUser">
                    <el-input
                      placeholder="请输入"
                      size="medium"
                      :maxlength="10"
                      v-model="handleForm.companyLinkUser"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item
                    label="企业联系人电话"
                    prop="companyLinkUserPhone"
                  >
                    <el-input
                      placeholder="请输入"
                      size="medium"
                      :maxlength="20"
                      v-model="handleForm.companyLinkUserPhone"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="产业类型" prop="industryTypeId">
                    <el-select
                      placeholder="请选择"
                      size="medium"
                      v-model="handleForm.industryTypeId"
                    >
                      <el-option
                        :label="item.industryName"
                        :value="item.id"
                        v-for="item in industryTypeList"
                        :key="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="招商区块" prop="province">
                    <el-row :gutter="0">
                      <el-col :span="11">
                        <el-select
                          placeholder="请选择省"
                          size="medium"
                          v-model="handleForm.province"
                          @change="selectFristAreaChange"
                        >
                          <el-option
                            :label="item.label"
                            :value="item.id"
                            v-for="item in provinceList"
                            :key="item.id"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-select
                          placeholder="请选择市"
                          size="medium"
                          v-model="handleForm.city"
                          :disabled="secondAreaDisabled"
                        >
                          <el-option
                            :label="item.label"
                            :value="item.id"
                            v-for="item in cityList"
                            :key="item.id"
                          ></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="引入单位" prop="importCompany">
                    <el-select
                      placeholder="请选择"
                      size="medium"
                      v-model="handleForm.importCompany"
                    >
                      <el-option
                        :label="item.deptName"
                        :value="item.deptId"
                        v-for="item in deptList"
                        :key="item.deptId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="引进单位联系人" prop="importCompanyUser">
                    <el-input
                      placeholder="请输入"
                      size="medium"
                      :maxlength="10"
                      v-model="handleForm.importCompanyUser"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item
                    label="引进单位联系人电话"
                    prop="importCompanyUserPhone"
                  >
                    <el-input
                      placeholder="请输入"
                      size="medium"
                      :maxlength="15"
                      v-model="handleForm.importCompanyUserPhone"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="是否大项目" prop="isBigProject">
                    <el-select
                      placeholder="请选择"
                      size="medium"
                      v-model="handleForm.isBigProject"
                    >
                      <el-option label="是" :value="0"></el-option>
                      <el-option label="否" :value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <div class="type-title">意向信息</div>
              <el-row :gutter="30">
                <el-col :sm="12" :lg="5">
                  <el-form-item label="达成意向" prop="reachDate">
                    <el-date-picker
                      v-model="handleForm.reachDate"
                      type="date"
                      placeholder="请选择"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="提交建议书" prop="referSuggestDate">
                    <el-date-picker
                      v-model="handleForm.referSuggestDate"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="论证意见文号" prop="optionNumber">
                    <el-input
                      placeholder="请输入"
                      size="medium"
                      :maxlength="20"
                      v-model="handleForm.optionNumber"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="意向供地区块" prop="optionArea">
                    <el-input
                      placeholder="请输入"
                      size="medium"
                      :maxlength="20"
                      v-model="handleForm.optionArea"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="首次考察" prop="firstInvestigateDate">
                    <el-date-picker
                      v-model="handleForm.firstInvestigateDate"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="提交论证" prop="submitArgumentDate">
                    <el-date-picker
                      v-model="handleForm.submitArgumentDate"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="意向投资金额" prop="suggestMoney">
                    <el-row :gutter="0">
                      <el-col :span="20">
                        <el-input-number
                          v-model="handleForm.suggestMoney"
                          :precision="2"
                          placeholder="请输入"
                          :controls="false"
                          :min="0"
                          :max="6"
                        ></el-input-number>
                      </el-col>
                      <el-col :span="4">
                        <span class="ml10">万元</span>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="意向用地" prop="suggestArea">
                    <el-row :gutter="0">
                      <el-col :span="20">
                        <el-input-number
                          v-model="handleForm.suggestArea"
                          :precision="2"
                          placeholder="请输入"
                          :controls="false"
                          :min="0"
                          :max="6"
                        ></el-input-number>
                      </el-col>
                      <el-col :span="4">
                        <span class="ml10">亩</span>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="type-title">签约信息</div>
              <el-row :gutter="30">
                <el-col :sm="12" :lg="5">
                  <el-form-item label="合同编号" prop="contractNumber">
                    <el-input
                      placeholder="请输入"
                      size="medium"
                      :maxlength="30"
                      v-model="handleForm.contractNumber"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="投资方式" prop="investmentTypeId">
                    <el-select
                      placeholder="请选择"
                      size="medium"
                      v-model="handleForm.investmentTypeId"
                    >
                      <el-option
                        v-for="dict in investmentMethod"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="外资股份占比" prop="foreignShares">
                    <el-row :gutter="0">
                      <el-col :span="20">
                        <el-input
                          placeholder="请输入"
                          size="medium"
                          :maxlength="20"
                          v-model="handleForm.foreignShares"
                        ></el-input>
                      </el-col>
                      <el-col :span="4">
                        <span class="ml10">%</span>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="合同投资金额" prop="contractMoney">
                    <el-row :gutter="0">
                      <el-col :span="20">
                        <el-input-number
                          v-model="handleForm.contractMoney"
                          :precision="2"
                          placeholder="请输入"
                          :controls="false"
                          :min="0"
                          :max="6"
                        ></el-input-number>
                      </el-col>
                      <el-col :span="4">
                        <span class="ml10">万元</span>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="注册金额" prop="enrollMoney">
                    <el-row :gutter="0">
                      <el-col :span="20">
                        <el-input-number
                          v-model="handleForm.enrollMoney"
                          :precision="2"
                          placeholder="请输入"
                          :controls="false"
                          :min="0"
                          :max="6"
                        ></el-input-number>
                      </el-col>
                      <el-col :span="4">
                        <span class="ml10">万元</span>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="在龙注册企业" prop="enrollCompany">
                    <el-input
                      placeholder="请输入"
                      size="medium"
                      :maxlength="50"
                      v-model="handleForm.enrollCompany"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="法人代表" prop="legalRepresentative">
                    <el-input
                      placeholder="请输入"
                      size="medium"
                      :maxlength="50"
                      v-model="handleForm.legalRepresentative"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item
                    label="法人代表电话"
                    prop="legalRepresentativePhone"
                  >
                    <el-input
                      placeholder="请输入"
                      size="medium"
                      :maxlength="20"
                      v-model="handleForm.legalRepresentativePhone"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="落地区块" prop="fallArea">
                    <el-input
                      placeholder="请输入"
                      size="medium"
                      :maxlength="20"
                      v-model="handleForm.fallArea"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="签约时间" prop="signDate">
                    <el-date-picker
                      v-model="handleForm.signDate"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="约定开工时间" prop="agreedStartDate">
                    <el-date-picker
                      v-model="handleForm.agreedStartDate"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item
                    label="约定投产时间"
                    prop="agreedProductionDate"
                  >
                    <el-date-picker
                      v-model="handleForm.agreedProductionDate"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="工业用地" prop="industrialLand">
                    <el-row :gutter="0">
                      <el-col :span="20">
                        <el-input-number
                          v-model="handleForm.industrialLand"
                          :precision="2"
                          placeholder="请输入"
                          :controls="false"
                          :min="0"
                          :max="6"
                        ></el-input-number>
                      </el-col>
                      <el-col :span="4">
                        <span class="ml10">亩</span>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="商业用地" prop="commercialLand">
                    <el-row :gutter="0">
                      <el-col :span="20">
                        <el-input-number
                          v-model="handleForm.commercialLand"
                          :precision="2"
                          placeholder="请输入"
                          :controls="false"
                          :min="0"
                          :max="6"
                        ></el-input-number>
                      </el-col>
                      <el-col :span="4">
                        <span class="ml10">亩</span>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="其他用地" prop="otherLand">
                    <el-row :gutter="0">
                      <el-col :span="20">
                        <el-input-number
                          v-model="handleForm.otherLand"
                          :precision="2"
                          placeholder="请输入"
                          :controls="false"
                          :min="0"
                          :max="6"
                        ></el-input-number>
                      </el-col>
                      <el-col :span="4">
                        <span class="ml10">亩</span>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="用地说明类型" prop="landType">
                    <el-select
                      placeholder="请选择"
                      size="medium"
                      v-model="handleForm.landType"
                    >
                      <el-option
                        v-for="dict in landType"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="10">
                  <el-form-item label="用地说明">
                    <el-input
                      class="resizeNone"
                      type="textarea"
                      placeholder="请输入"
                      :autosize="{ minRows: 5, maxRows: 8 }"
                      v-model="handleForm.landDescription"
                      :maxlength="200"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="type-title">其他信息</div>
              <el-row>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="是否流失">
                    <el-radio-group
                      v-model="handleForm.isRunAway"
                      @change="runAwayChange"
                    >
                      <el-radio :label="-1">是</el-radio>
                      <el-radio :label="1">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30">
                <el-col :sm="12" :lg="10" v-show="handleForm.isRunAway === -1">
                  <el-form-item label="流失原因">
                    <el-input
                      class="resizeNone"
                      type="textarea"
                      placeholder="请输入"
                      :autosize="{ minRows: 5, maxRows: 8 }"
                      v-model="handleForm.runAwayRemark"
                      :maxlength="100"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="10" v-show="handleForm.isRunAway === -1">
                  <el-form-item label="备注">
                    <el-input
                      class="resizeNone"
                      type="textarea"
                      placeholder="请输入"
                      :autosize="{ minRows: 5, maxRows: 8 }"
                      v-model="handleForm.remark"
                      :maxlength="100"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="20">
                  <div class="table-list">
                    <div class="table-label">合同额分配情况（单位：万元）</div>
                    <el-table
                      :data="handleForm.industryContractDistributionsList"
                      border
                    >
                      <el-table-column prop="company" label="单位名称">
                        <template slot-scope="scope">
                          <el-input
                            placeholder="请输入"
                            size="medium"
                            :maxlength="20"
                            v-model="
                              handleForm.industryContractDistributionsList[
                                scope.$index
                              ][scope.column.property]
                            "
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="money" label="分配额">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="
                              handleForm.industryContractDistributionsList[
                                scope.$index
                              ][scope.column.property]
                            "
                            :precision="2"
                            placeholder="请输入"
                            :controls="false"
                            :min="0"
                            :max="6"
                          ></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" align="center" width="140">
                        <template slot-scope="scope">
                          <el-link
                            type="primary"
                            v-if="scope.$index === 0"
                            @click="addAssignModel(scope)"
                            >添加</el-link
                          >
                          <el-link
                            type="danger"
                            v-else
                            @click="delAssignModel(scope)"
                            >删除</el-link
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-col>
              </el-row>
              <div class="type-title">实施情况</div>
              <el-row :gutter="30">
                <el-col :sm="12" :lg="5">
                  <el-form-item label="开工时间">
                    <el-date-picker
                      v-model="handleForm.startDate"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :sm="12" :lg="5">
                  <el-form-item label="投产时间">
                    <el-date-picker
                      v-model="handleForm.productionDate"
                      type="date"
                      placeholder="请选择"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-col :sm="12" :lg="20">
                <div class="table-list">
                  <div class="table-label">项目到资（单位：万元）</div>
                  <el-table :data="handleForm.industryPeojectArriveList" border>
                    <el-table-column prop="status" label="审核状态">
                      <template slot-scope="scope">
                        <el-select
                          placeholder="请选择"
                          size="medium"
                          v-model="
                            handleForm.industryPeojectArriveList[scope.$index][
                              scope.column.property
                            ]
                          "
                        >
                          <el-option
                            v-for="dict in industryPeojectArriveAuditStatus"
                            :key="dict.dictValue"
                            :label="dict.dictLabel"
                            :value="dict.dictValue"
                          ></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column prop="year" label="年份">
                      <template slot-scope="scope">
                        <el-input
                          placeholder="请输入"
                          size="medium"
                          :maxlength="10"
                          v-model="
                            handleForm.industryPeojectArriveList[scope.$index][
                              scope.column.property
                            ]
                          "
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="month" label="月">
                      <template slot-scope="scope">
                        <el-input
                          placeholder="请输入"
                          size="medium"
                          :maxlength="10"
                          v-model="
                            handleForm.industryPeojectArriveList[scope.$index][
                              scope.column.property
                            ]
                          "
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="company" label="单位名称">
                      <template slot-scope="scope">
                        <el-input
                          placeholder="请输入"
                          size="medium"
                          :maxlength="30"
                          v-model="
                            handleForm.industryPeojectArriveList[scope.$index][
                              scope.column.property
                            ]
                          "
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="arriveMoney" label="到资金额">
                      <template slot-scope="scope">
                        <el-input-number
                          v-model="
                            handleForm.industryPeojectArriveList[scope.$index][
                              scope.column.property
                            ]
                          "
                          :precision="2"
                          placeholder="请输入"
                          :controls="false"
                          :min="0"
                          :max="6"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column prop="schedule" label="建设进度/到资说明">
                      <template slot-scope="scope">
                        <el-input
                          placeholder="请输入"
                          :maxlength="100"
                          size="medium"
                          v-model="
                            handleForm.industryPeojectArriveList[scope.$index][
                              scope.column.property
                            ]
                          "
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="140">
                      <template slot-scope="scope">
                        <el-link
                          type="primary"
                          v-if="scope.$index === 0"
                          @click="addAccountedModel(scope)"
                          >添加</el-link
                        >
                        <el-link
                          type="danger"
                          v-else
                          @click="delAccountedModel(scope)"
                          >删除</el-link
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="附件" name="fileTab">
              <div class="type-title">企业注册资料</div>
              <Uploads
                @uploadSuccess="uploadSuccess($event, 1)"
                @removeSuccess="removeSuccess($event, 1)"
                :resourceType="1"
              ></Uploads>
              <div class="type-title">项目落地开工资料</div>
              <Uploads
                @uploadSuccess="uploadSuccess($event, 2)"
                @removeSuccess="removeSuccess($event, 2)"
                :resourceType="2"
              ></Uploads>
              <div class="type-title">政策相关材料</div>
              <Uploads
                @uploadSuccess="uploadSuccess($event, 3)"
                @removeSuccess="removeSuccess($event, 3)"
                :resourceType="3"
              ></Uploads>
            </el-tab-pane>
            <el-tab-pane label="审核记录" name="auditedRecord">
              <el-row class="mt20">
                <div class="table-list">
                  <el-table :data="auditedRecordData" border>
                    <el-table-column label="操作时间" align="center">
                    </el-table-column>
                    <el-table-column
                      prop="industryTypeName"
                      label="项目状态"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="industryName"
                      label="操作"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="industryName"
                      label="操作人"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="industryName"
                      label="备注"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="industryType"
                      label="操作结果"
                      width="200"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span class="t-success">提交成功</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script src="./handle-project.js"></script>
