<template>
  <el-row :gutter="20">
    <el-col
      :xs="24"
      :sm="{ span: 18, offset: 3 }"
      :md="{ span: 18, offset: 3 }"
      :lg="{ span: 14, offset: 5 }"
      :xl="{ span: 14, offset: 5 }"
    >
      <el-card shadow="never" class="yeniu-card">
        <template #header>
          <div class="header">
            <div class="userInfo">
              <el-avatar shape="square" :src="userInfo.avatar" />
              <div class="nickName">
                <div>{{ userInfo.nickName }}</div>
                <div>{{ cardInfo.createdTime }}</div>
              </div>
            </div>
            <div v-if="cardInfo.evaluateStatus" class="evaluateStatus">
              已点评
            </div>
          </div>
        </template>
        <div class="container">
          <div>{{ simpleContent.text }}</div>
          <div v-if="simpleContent.hasMore" class="hasMore">
            <el-button type="primary" link @click="viewMore"
              >更多<el-icon><DArrowRight /></el-icon
            ></el-button>
          </div>
          <van-grid class="image-group" :column-num="3" :gutter="10" square>
            <van-grid-item
              v-for="image in simpleContent.images"
              :key="image.idx"
            >
              <van-image
                v-if="_isMobile()"
                :src="image.preSrc"
                @click="handlePreview(image.idx)"
              />
              <el-image
                v-else
                :src="image.preSrc"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="simpleContent.images.map((i: any) => i.src)"
                :initial-index="image.idx"
                fit="cover"
              />
            </van-grid-item>
          </van-grid>
        </div>
        <template #footer>
          <div class="footer">
            <div class="footer-item" @click="$emit('showMsg')">
              <van-icon name="chat-o" />
              <span>{{ cardInfo.replyCount }}</span>
            </div>
            <div class="footer-item" @click="$emit('showMsg')">
              <van-icon name="good-job-o" />
              <span>{{ cardInfo.likeCount }}</span>
            </div>
          </div>
        </template>
      </el-card>
    </el-col>
  </el-row>

  <van-image-preview
    v-model:show="show"
    :images="images"
    :startPosition="startPosition"
  />
</template>

<script setup lang="ts">
import { _isMobile } from "@/utils";

const { userInfo, cardInfo, simpleContent } = defineProps({
  userInfo: {
    type: [Object],
    default: () => ({}),
  },
  cardInfo: {
    type: [Object],
    default: () => ({}),
  },
  simpleContent: {
    type: [Object],
    default: () => ({}),
  },
});

function viewMore() {
  console.log(simpleContent);
  console.log(simpleContent.value);
}

const show = ref<boolean>(false);
const images = ref<string[]>([]);
const startPosition = ref<number>(0);
function handlePreview(idx: number) {
  show.value = true;
  images.value = simpleContent.images.map((i: any) => i.src);
  startPosition.value = idx;
}
</script>

<style scoped lang="scss">
.yeniu-card {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .userInfo {
      display: flex;
      align-items: center;
      font-size: 14px;

      .nickName {
        margin-left: 10px;
      }
    }

    .evaluateStatus {
      color: #ff4500;
    }
  }

  .container {
    .hasMore {
      text-align: right;
    }

    .image-group {
      margin-top: 10px;

      ::v-deep(.van-grid-item__content) {
        padding: 0;
      }
    }

    @media (width >= 440px) {
      .image-group {
        width: 320px;
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .footer-item {
      display: flex;
      align-items: center;
      margin: 0 5px;

      span {
        margin: 0 5px;
      }
    }
  }
}

.el-row {
  margin-bottom: 10px;
}

.el-row:last-of-type {
  margin-bottom: unset;
}
</style>
