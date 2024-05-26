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
            <div>{{ weather.Province }} - {{ weather.City }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getShiCi, GetWeather } from "@/api/dashboard";
defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});

onMounted(() => {
  handleQuery();
});

const shici = ref("");
const weather = ref({
  Province: "",
  City: "",
  weather: "",
  wind: "",
  max_degree: "",
  min_degree: "",
});
function handleQuery() {
  getShiCi().then(({ data }) => {
    shici.value = `${data.content} -- ${data.author}`;
  });
  GetWeather().then(({ data }) => {
    weather.value = {
      Province: data.result.city.Province,
      City: data.result.city.City || data.result.city.Province,
      weather:
        hours < 18
          ? data.result.condition.day_weather
          : data.result.condition.night_weather,
      wind:
        hours < 18
          ? `${data.result.condition.day_wind_direction}${data.result.condition.day_wind_power}级`
          : `${data.result.condition.night_wind_direction}${data.result.condition.night_wind_power}级`,
      max_degree: data.result.condition.max_degree,
      min_degree: data.result.condition.min_degree,
    };
  });
}

const avatar = ref(new URL(`../../assets/avatar.jpg`, import.meta.url).href);

const date: Date = new Date();
const hours = date.getHours();

const greetings = computed(() => {
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
