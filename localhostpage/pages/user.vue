<template>
    <div>
        <message/>
        <list/>
    </div>
</template>

<script>
import message from '@/components/user/message.vue'
import list from '@/components/user/list.vue'

export default {
    layout: 'blank',
    components:{
        message,
        list
    }
}
</script>

<style scoped>

</style>