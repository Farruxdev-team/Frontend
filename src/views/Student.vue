<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
import Kirish from '../components/Kirish.vue'
import Back from "../components/Back.vue"
const { id } = useRoute().params
import { useStudents } from '../service/students';
import { studentStore } from '../stores/students/studentStore';

const store = studentStore()

const listUpdate = () => {
  useStudents.get_one(id).then((res) => {
    console.log(res.data);
    store.SET_ONE(res?.data);
  });
  console.log(store.ELEMENT);
};

onMounted(() => {
  listUpdate()
})

</script>

<template>


  <div
    class="w-full flex justify justify-between items-center bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-xl"
  >
    <Back />
    <div class="flex justify-between gap-[100px] dark:text-white items-center">
      <div><b style="font-size: 130%;">To'liq ism: </b>{{ store.ELEMENT.full_name }}</div>
      <div class="grid grid-cols-1">
        <h1><b style="font-size: 130%;">Telefon raqami: </b>{{ store.ELEMENT.phone }}</h1>
        <h1><b style="font-size: 130%;">Guruhi: </b>{{ store.ELEMENT.group_id.name }}</h1>
        <h1 class="flex items-center gap-4"><b style="font-size: 130%;">Holati: </b><i class='bx bxs-circle text-2xl' :class="store.ELEMENT.is_active ? 'text-green-700' : 'text-red-700'"></i></h1>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <i  data-modal-target="popup-modal" data-modal-toggle="popup-modal"  class="bx bx-trash text-xl bg-red-500 px-2 p-1 rounded-lg text-white cursor-pointer"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ag-format-container {
  width: 1142px;
  margin: 0 auto;
}


body {
  background-color: #000;
}
.ag-courses_box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;

  padding: 50px 0;
}
.ag-courses_item {
  -ms-flex-preferred-size: calc(33.33333% - 30px);
  flex-basis: calc(33.33333% - 30px);

  margin: 0 15px 30px;

  overflow: hidden;

  border-radius: 28px;
}
.ag-courses-item_link {
  display: block;
  padding: 30px 20px;
  background-color: #121212;

  overflow: hidden;

  position: relative;
}
.ag-courses-item_link:hover,
.ag-courses-item_link:hover .ag-courses-item_date {
  text-decoration: none;
  color: #FFF;
}
.ag-courses-item_link:hover .ag-courses-item_bg {
  -webkit-transform: scale(10);
  -ms-transform: scale(10);
  transform: scale(10);
}
.ag-courses-item_title {
  min-height: 87px;
  margin: 0 0 25px;

  overflow: hidden;

  font-weight: bold;
  font-size: 30px;
  color: #FFF;

  z-index: 2;
  position: relative;
}
.ag-courses-item_date-box {
  font-size: 18px;
  color: #FFF;

  z-index: 2;
  position: relative;
}
.ag-courses-item_date {
  font-weight: bold;
  color: #f9b234;

  -webkit-transition: color .5s ease;
  -o-transition: color .5s ease;
  transition: color .5s ease
}
.ag-courses-item_bg {
  height: 128px;
  width: 128px;
  background-color: #f9b234;

  z-index: 1;
  position: absolute;
  top: -75px;
  right: -75px;

  border-radius: 50%;

  -webkit-transition: all .5s ease;
  -o-transition: all .5s ease;
  transition: all .5s ease;
}
.ag-courses_item:nth-child(2n) .ag-courses-item_bg {
  background-color: #3ecd5e;
}
.ag-courses_item:nth-child(3n) .ag-courses-item_bg {
  background-color: #e44002;
}
.ag-courses_item:nth-child(4n) .ag-courses-item_bg {
  background-color: #952aff;
}
.ag-courses_item:nth-child(5n) .ag-courses-item_bg {
  background-color: #cd3e94;
}
.ag-courses_item:nth-child(6n) .ag-courses-item_bg {
  background-color: #4c49ea;
}



@media only screen and (max-width: 979px) {
  .ag-courses_item {
    -ms-flex-preferred-size: calc(50% - 30px);
    flex-basis: calc(50% - 30px);
  }
  .ag-courses-item_title {
    font-size: 24px;
  }
}

@media only screen and (max-width: 767px) {
  .ag-format-container {
    width: 96%;
  }

}
@media only screen and (max-width: 639px) {
  .ag-courses_item {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
  }
  .ag-courses-item_title {
    min-height: 72px;
    line-height: 1;

    font-size: 24px;
  }
  .ag-courses-item_link {
    padding: 22px 40px;
  }
  .ag-courses-item_date-box {
    font-size: 16px;
  }
}
</style>
