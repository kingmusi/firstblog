<template>
    <div>
        <message/>
        <list/>
    </div>
</template>

<script>
import message from '@/components/otheruser/message.vue'
import list from '@/components/otheruser/list.vue'

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