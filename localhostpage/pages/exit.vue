<template>
    <div></div>
</template>

<script>
export default {
    layout: 'blank',
    middleware: async (ctx) => {
        let {status, data} = await ctx.$axios.get('/user/exit')
        if(status===200 && data && data.code===0){
            window.location.href='/'
        }
    }
}
</script>

<style scoped>

</style>