<template>
  <div class="app-container">
    <YeniuCard
      v-for="item in roleList"
      :key="item.contentId"
      :user-info="item.userInfo"
      :card-info="item.cardInfo"
      :simple-content="item.simpleContent"
    />

    <el-backtop :bottom="100" />
  </div>
</template>

<script setup lang="ts">
import { getStudyList } from "@/api/yeniu";

defineOptions({
  name: "Study",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);

const loading = ref(false);
const total = ref(0);

const queryParams = reactive<any>({
  pageNum: 1,
  pageSize: 10,
});

const roleList = ref<any[]>();
const totalList = ref<any[]>();
function imgRpl(src: string) {
  return false
    ? `${src.replace("https://cc.hjfile.cn/cc", "").replace("https://i2n.hjfile.cn", "").replace("https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132", "/u/132.jpg")}`
    : src;
}

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
  getStudyList()
    .then(({ data }) => {
      console.log("getStudyList", data);
    })
    .finally(() => {
      loading.value = false;
    });
}

onMounted(() => {
  handleQuery();
});
</script>
