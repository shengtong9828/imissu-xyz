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

          <van-button>123</van-button>
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

    <el-backtop :bottom="100" />
  </div>
</template>

<script setup lang="ts">
import { getExhibitionList } from "@/api/yeniu";

defineOptions({
  name: "Exhibition",
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
  getExhibitionList()
    .then(({ data }) => {
      console.log("getExhibitionList", data);
      data.items.forEach((i: any) => {
        i.simpleContent = JSON.parse(i.simpleContent);
        i.simpleContent.images.forEach((j) => {
          j.preSrc = imgRplPre(j.src);
        });
        i.cardInfo = {
          createdTime: i.createdTime.replace("T", " ").replace("+0800", ""),
          evaluateStatus: i.evaluateStatus,
          likeCount: i.likeCount,
          replyCount: i.replyCount,
        };
      });
      totalList.value = data.items;
      roleList.value = totalList.value;
      total.value = data.total;
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
