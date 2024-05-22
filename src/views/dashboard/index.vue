<template>
  <div class="dashboard-container">
    <el-card shadow="never">
      <el-row justify="space-between">
        <el-col :span="18" :xs="24">
          <div class="flex h-full items-center">
            <img class="w-20 h-20 mr-5 rounded-full" :src="avatar" />
            <div>
              <p>{{ greetings }}</p>
              <p class="text-sm text-gray">
                {{ shici }}
              </p>
            </div>
          </div>
        </el-col>

        <el-col :span="6" :xs="24">
          <div class="flex h-full items-center justify-around">
            <div>
              {{ weather.city.Province }} -
              {{ weather.city.City || weather.city.Province }}
            </div>
            <div>
              {{ weather.condition.day_weather }} -
              {{ weather.city.night_weather }}
            </div>
            <div>
              {{ weather.condition.day_weather_short }} -
              {{ weather.city.night_weather_short }}
            </div>
            <div>
              {{ weather.condition.day_wind_direction }} -
              {{ weather.city.day_wind_power }}
            </div>
            <div>
              {{ weather.condition.night_wind_direction }} -
              {{ weather.city.night_wind_power }}
            </div>
            <div>
              {{ weather.condition.min_degree }} - {{ weather.city.max_degree }}
            </div>
            <div>{{ weather.condition.aqi.aqi }}</div>
            <div>{{ weather.condition.aqi.aqi_level }}</div>
            <div>{{ weather.condition.aqi.aqi_name }}</div>
            <div>{{ weather.condition.aqi.co }}</div>
            <div>{{ weather.condition.aqi.no2 }}</div>
            <div>{{ weather.condition.aqi.o3 }}</div>
            <div>{{ weather.condition.aqi.pm10 }}</div>
            <div>{{ weather.condition.aqi["pm2.5"] }}</div>
            <div>{{ weather.condition.aqi.so2 }}</div>
            <div>{{ weather.condition.aqi.update_time }}</div>

            <el-statistic
              v-for="item in statisticData"
              :key="item.key"
              :value="item.value"
            >
              <template #title>
                <div class="flex items-center">
                  <svg-icon :icon-class="item.iconClass" size="20px" />
                  <span class="text-[16px] ml-1">{{ item.title }}</span>
                </div>
              </template>
              <template v-if="item.suffix" #suffix>/100</template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 数据卡片 -->
    <el-row v-if="false" :gutter="10" class="mt-3">
      <el-col
        :xs="24"
        :sm="12"
        :lg="6"
        v-for="(item, index) in cardData"
        :key="index"
      >
        <el-card shadow="never">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-[var(--el-text-color-secondary)]">{{
                item.title
              }}</span>
              <el-tag :type="item.tagType">
                {{ item.tagText }}
              </el-tag>
            </div>
          </template>

          <div class="flex items-center justify-between mt-5">
            <div class="text-lg text-right">
              {{ Math.round(item.count) }}
            </div>
            <svg-icon :icon-class="item.iconClass" size="2em" />
          </div>

          <div
            class="flex items-center justify-between mt-5 text-sm text-[var(--el-text-color-secondary)]"
          >
            <span> {{ item.dataDesc }} </span>
            <span> {{ Math.round(item.count * 15) }} </span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Echarts 图表 -->
    <el-row v-if="false" :gutter="10" class="mt-3">
      <el-col
        :xs="24"
        :sm="12"
        :lg="8"
        class="mb-2"
        v-for="item in chartData"
        :key="item"
      >
        <component
          :is="chartComponent(item)"
          :id="item"
          height="400px"
          width="100%"
          class="bg-[var(--el-bg-color-overlay)]"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ShiCiData, WeatherData } from "@/api/dashboard/types";

defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});

import { useUserStore } from "@/store/modules/user";
import { useTransition, TransitionPresets } from "@vueuse/core";
import { getShiCi, GetWeather } from "@/api/dashboard";

onMounted(() => {
  handleQuery();
});

const shici = ref("");
const weather = ref({ city: {}, condition: { day: {}, aqi: {} } });
function handleQuery() {
  getShiCi().then((data: ShiCiData | any) => {
    console.log("getShiCi", data);
    shici.value = `${data.content} -- ${data.author}`;
  });
  GetWeather().then((data) => {
    console.log("GetWeather", data);
    weather.value = data.result;
  });
}

const avatar = ref(new URL(`../../assets/avatar.jpg`, import.meta.url).href);

const userStore = useUserStore();
const date: Date = new Date();

const greetings = computed(() => {
  const hours = date.getHours();
  if (hours >= 6 && hours < 8) {
    return "晨起披衣出草堂，轩窗已自喜微凉🌅！";
  } else if (hours >= 8 && hours < 12) {
    return "上午好，Qing淺！";
  } else if (hours >= 12 && hours < 18) {
    return "下午好，Qing淺！";
  } else if (hours >= 18 && hours < 24) {
    return "晚上好，Qing淺！";
  } else {
    return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！";
  }
});

const duration = 5000;

// 销售额
const amount = ref(0);
const amountOutput = useTransition(amount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
amount.value = 2000;

// 访客数
const visitCount = ref(0);
const visitCountOutput = useTransition(visitCount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
visitCount.value = 2000;

// IP数
const dauCount = ref(0);
const dauCountOutput = useTransition(dauCount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
dauCount.value = 2000;

// 订单量
const orderCount = ref(0);
const orderCountOutput = useTransition(orderCount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
orderCount.value = 2000;

interface CardProp {
  title: string;
  tagType: EpPropMergeType<
    StringConstructor,
    "primary" | "success" | "info" | "warning" | "danger",
    unknown
  >;
  tagText: string;
  count: any;
  dataDesc: string;
  iconClass: string;
}
// 卡片数量
const cardData = ref<CardProp[]>([
  {
    title: "访客数",
    tagType: "success",
    tagText: "日",
    count: visitCountOutput,
    dataDesc: "总访客数",
    iconClass: "visit",
  },
  {
    title: "IP数",
    tagType: "success",
    tagText: "日",
    count: dauCountOutput,
    dataDesc: "总IP数",
    iconClass: "ip",
  },
  {
    title: "销售额",
    tagType: "primary",
    tagText: "月",
    count: amountOutput,
    dataDesc: "总IP数",
    iconClass: "money",
  },
  {
    title: "订单量",
    tagType: "danger",
    tagText: "季",
    count: orderCountOutput,
    dataDesc: "总订单量",
    iconClass: "order",
  },
]);
// 图表数据
const chartData = ref(["BarChart", "PieChart", "RadarChart"]);
const chartComponent = (item: string) => {
  return defineAsyncComponent(() => import(`./components/${item}.vue`));
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 12px;

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .data-box {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-weight: bold;
    color: var(--el-text-color-regular);
    background: var(--el-bg-color-overlay);
    border-color: var(--el-border-color);
    box-shadow: var(--el-box-shadow-dark);
  }

  .svg-icon {
    fill: currentcolor !important;
  }
}
</style>
