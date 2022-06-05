<template>
  <div class="orderdetail">
    <h6>取餐時間</h6>
    <!-- {{ pickupdatetime }} <br /> -->
    <el-select
      v-model="pickupdate"
      placeholder="Select"
    >
      <el-option
        v-for="item in dateoptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="pickuptime">
      <el-option
        v-for="item in timeoptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import moment from 'moment';
import 'moment/dist/locale/zh-tw';
import { mainStore } from '@/store/main.store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'Checkoutorderdetail',
  setup() {
    const mainstore = mainStore();
    const { order } = storeToRefs(mainstore);

    const bussinesshourStart = moment()
      .set('hour', 5)
      .set('minute', 0)
      .set('second', 0);
    const bussinesshourEnd = moment()
      .set('hour', 11)
      .set('minute', 0)
      .set('second', 0);
    const pickupdate = ref('');
    const pickuptime = ref('');
    const pickupdatetime = ref() as Ref<string>;
    const datetime = moment();

    // setInterval(() => {
    //   date2.value = moment().format("h m s");
    // }, 500);
    let dateoptions: Array<{ value: string; label: string }> = [
      {
        value: datetime.clone().format('MM-DD'),
        label: datetime.clone().format('MMM DD (ddd)')
      },
      {
        value: datetime.clone().add(1, 'd').format('MM-DD'),
        label: datetime.clone().add(1, 'd').format('MMM DD (ddd)')
      },
      {
        value: datetime.clone().add(2, 'd').format('MM-DD'),
        label: datetime.clone().add(2, 'd').format('MMM DD (ddd)')
      }
    ];

    let timeoptions: Array<{ value: string; label: string }>;

    watch(
      () => [pickupdate.value, pickuptime.value],
      ([pickupdate, pickuptime]) => {
        let selectmonth = Number(pickupdate.split('-')[0]) - 1;
        let selectday = Number(pickupdate.split('-')[1]);
        let selecthour = Number(pickuptime.split(':')[0]);
        let selectminute = Number(pickuptime.split(':')[1]);
        order.value.order_pickupdate = moment
          .utc(
            moment()
              .set('months', selectmonth)
              .set('dates', selectday)
              .set('hour', selecthour)
              .set('minute', selectminute)
              .set('second', 0)
          )
          .format('YYYY-MM-DD HH:mm:ss');
        pickupdatetime.value = moment
          .utc(
            moment()
              .utc()
              .set('months', selectmonth)
              .set('dates', selectday)
              .set('hour', selecthour)
              .set('minute', selectminute)
              .set('second', 0)
          )
          .format('MMM DD (ddd) A hh:mm');
      }
    );

    function setbusinessdaytimeoptions() {
      const neartime = moment().subtract(datetime.minutes() % 15, 'minutes');
      const timecount = Math.ceil(
        moment(bussinesshourEnd).diff(datetime, 'minutes') / 15
      );
      let timeblock = 0;
      timeoptions = [];
      if (datetime.minutes() % 15 !== 0) {
        timeoptions.push({
          value: datetime.clone().add(15, 'm').format('HH:mm'),
          label: datetime.clone().add(15, 'm').format('A hh:mm')
        });
        timeblock = 1;
      }
      while (timeblock < timecount) {
        timeoptions.push({
          value: neartime
            .clone()
            .add(15 * (timeblock + 1), 'm')
            .format('HH:mm'),
          label: neartime
            .clone()
            .add(15 * (timeblock + 1), 'm')
            .format('A hh:mm')
        });
        timeblock++;
      }
      return timeoptions;
    }

    function setnotbusinessdaytimeoptions() {
      const timecount = Math.ceil(
        moment(bussinesshourEnd).diff(bussinesshourStart, 'minutes') / 10
      );
      let timeblock = 0;
      timeoptions = [];
      while (timeblock <= timecount) {
        timeoptions.push({
          value: bussinesshourStart
            .clone()
            .add(10 * timeblock, 'm')
            .format('HH:mm'),
          label: bussinesshourStart
            .clone()
            .add(10 * timeblock, 'm')
            .format('A hh:mm')
        });
        timeblock++;
      }
      return timeoptions;
    }

    if (!moment().isBetween(bussinesshourStart, bussinesshourEnd)) {
      timeoptions = setnotbusinessdaytimeoptions();
      if (moment(datetime).isAfter(bussinesshourEnd)) {
        dateoptions.splice(0, 1);
        dateoptions.push({
          value: datetime.clone().add(3, 'd').format('MM-DD'),
          label: datetime.clone().add(3, 'd').format('MMM DD (ddd)')
        });
      }
    } else {
      timeoptions = setbusinessdaytimeoptions();
    }
    // set default Select Option for date and time
    pickupdate.value = dateoptions[0].value;
    pickuptime.value = timeoptions[0].value;
    return {
      pickupdate,
      pickuptime,
      pickupdatetime,
      dateoptions,
      timeoptions
    };
  }
});
</script>

<style scoped></style>
