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
          </div>
        </el-col>
      </el-row>
    </el-card>
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
