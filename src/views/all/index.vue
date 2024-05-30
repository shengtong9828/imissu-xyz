<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="keywords" label="关键字">
          <el-input
            v-model="queryParams.keywords"
            placeholder="角色名称"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleQuery"
            ><i-ep-search />搜索</el-button
          >
          <el-button @click="resetQuery"><i-ep-refresh />重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <YeniuCard
      v-for="item in roleList"
      :key="item.contentId"
      :user-info="item.userInfo"
      :card-info="item.cardInfo"
      :simple-content="item.simpleContent"
    />

    <div class="pagination-container">
      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="pageChange"
      />
    </div>

    <el-backtop :bottom="100" />
  </div>
</template>

<script setup lang="ts">
import { RolePageVO, RoleQuery } from "@/api/role/types";
import { getCommentList } from "@/api/yeniu";

defineOptions({
  name: "All",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);

const loading = ref(false);
const total = ref(0);

const queryParams = reactive<RoleQuery>({
  pageNum: 1,
  pageSize: 10,
});

const roleList = ref<RolePageVO[]>();
const totalList = ref<RolePageVO[]>();

function imgRplPre(src: string) {
  return true
    ? `${
        src.includes("https://cc.hjfile.cn/cc/img")
          ? `${src.replace("https://cc.hjfile.cn/cc/img", "https://qingjing-01.oss-cn-beijing.aliyuncs.com/img_ys").substring(0, src.replace("https://cc.hjfile.cn/cc/img", "https://qingjing-01.oss-cn-beijing.aliyuncs.com/img_ys").lastIndexOf("."))}.jpg`
          : src
              .replace("https://i2n.hjfile.cn", "")
              .replace(
                "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
                "/u/132.jpg"
              )
      }`
    : src;
}

/** 查询 */
function handleQuery() {
  loading.value = true;
  getCommentList()
    .then(({ data }) => {
      console.log("getCommentList", data);
      data.items.forEach((i: any) => {
        i.simpleContent = JSON.parse(i.simpleContent);
        i.simpleContent.images.forEach((j) => {
          j.preSrc = j.src;
        });
        i.cardInfo = {
          createdTime: i.createdTime.replace("T", " ").replace("+0800", ""),
          evaluateStatus: i.evaluateStatus,
          likeCount: i.likeCount,
          replyCount: i.replyCount,
        };
      });
      totalList.value = data.items;
      roleList.value = totalList.value.slice(
        (queryParams.pageNum - 1) * queryParams.pageSize,
        queryParams.pageSize
      );
      total.value = totalList.value?.length;
    })
    .finally(() => {
      loading.value = false;
    });
}

function pageChange() {
  roleList.value = totalList.value.slice(
    (queryParams.pageNum - 1) * queryParams.pageSize,
    queryParams.pageNum * queryParams.pageSize
  );
}

/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

onMounted(() => {
  handleQuery();
});
</script>
