<template>
  <div class="app-container">
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
import { getCommentList } from "@/api/yeniu";
import { useRoute } from "vue-router";

defineOptions({
  name: "All",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);

const loading = ref(false);
const total = ref(0);

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
});

const roleList = ref([]);
const totalList = ref([]);
const $route = useRoute();

/** 查询 */
function handleQuery() {
  loading.value = true;
  getCommentList($route.query.id?.toString() || "2023-12-31")
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
