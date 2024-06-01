<template>
  <div class="app-container">
    <YeniuCard
      v-for="item in tableData"
      :key="item.contentId"
      :user-info="userInfo"
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
import { getSpecialList } from "@/api/yeniu";
import { useRoute } from "vue-router";

defineOptions({
  name: "Role",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);

const loading = ref(false);
const total = ref(0);

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
});

const tableData = ref([]);
const totalList = ref([]);
const userInfo = ref({});
const $route = useRoute();

console.log();

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
  getSpecialList($route.query.id?.toString() || "0069")
    .then(({ data }) => {
      userInfo.value = data.dakaUserInfo;
      data.items.forEach((i: any) => {
        i.simpleContent = JSON.parse(i.simpleContent);
        i.simpleContent.images.forEach((j: any) => {
          j.preSrc = imgRplPre(j.src);
        });
      });
      totalList.value = data.items;
      tableData.value = (totalList.value || []).slice(
        (queryParams.pageNum - 1) * queryParams.pageSize,
        queryParams.pageSize
      );

      for (const item of tableData.value || []) {
      }
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

function pageChange() {
  tableData.value = (totalList.value || []).slice(
    (queryParams.pageNum - 1) * queryParams.pageSize,
    queryParams.pageNum * queryParams.pageSize
  );
}

onMounted(() => {
  handleQuery();
});
</script>
