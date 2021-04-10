<template>
  <vx-card class="p-2 text-center">
    <vs-avatar class="mx-auto mb-8 block" size="135px" :src="member.image" />
    <div class="text-center mb-6">
      <h4 class="font-bold text-xl mb-3">{{ member.name }}</h4>
      <p class="text-sm">{{ member.role }}</p>
    </div>
    <div
      class="flex justify-between flex-wrap w-3/5 lg:w-1/2 mx-auto items-center"
    >
      <a :href="member.social.linkedin" target="_blank"
        ><vs-icon
          icon-pack="feather"
          icon="icon-linkedin"
          rounded="true"
          color="rgb(187,194,204,1)"
          size="16px"
        ></vs-icon
      ></a>
      <a :href="member.social.resume" target="_blank"
        ><!--vs-icon
          v-if="!member.social.resume"
          icon-pack="feather"
          icon="icon-facebook"
          rounded="true"
          color="rgb(187,194,204,1)"
          size="16px"
        ></vs-icon-->
        <img src="../../assets/images/pages/team/getBoarded.svg" />
      </a>
      <vs-icon
        icon-pack="feather"
        icon="icon-instagram"
        color="rgb(187,194,204,1)"
        rounded="true"
        size="16px"
      ></vs-icon>
      <vs-icon
        icon-pack="feather"
        icon="icon-twitter"
        color="rgb(187,194,204,1)"
        rounded="true"
        size="16px"
      ></vs-icon>
    </div>
  </vx-card>
</template>
<script>
export default {
  name: 'MemberCard',
  props: ['member']
};
</script>
