<template>
    <div class="rightrow-container">
        <el-row>
            <el-col :span="24"><clock class="list-container"/></el-col>    
        </el-row>  

        <el-row>
            <el-col :span="24">
                <myselect class="list-container"/>
            </el-col>    
        </el-row>  

        <el-row>
            <el-col :span="24">
                <el-calendar v-model="calendar" class="list-container"></el-calendar>    
            </el-col>    
        </el-row> 
    </div>    
</template>

<script>
import clock from './clock.vue'
import myselect from './myselect.vue'

export default {
    components:{
        clock,
        myselect
    },
    data(){
        return {
            calendar:new Date()
        }
    }
}
</script>

<style scoped>
.rightrow-container{
    margin-top:10px;
}

.list-container{
    margin-bottom:20px;
    background:#fff;
    border-radius: 10px;
}
</style>