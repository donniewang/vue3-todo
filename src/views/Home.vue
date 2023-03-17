<template>
  <van-col>
    <van-row justify="center"><h1>To Do</h1></van-row>
    <van-row justify="end" align="center">
      <van-col span="4" align="start" justify="center">completed : {{ completedCount }}</van-col>
      <van-col span="2" align="start" justify="center"></van-col>
      <van-col span="6" align="start" justify="center">not complete : {{ notCompleteCount }}</van-col>
      <van-col span="8" align="center" justify="center">
      
      </van-col>
      <van-col span="2">
        <van-button
          @click="showAddDialog"
          icon="plus"
          type="primary"
        ></van-button>
      </van-col>
      <van-col span="1"></van-col>
    </van-row>
    <van-row v-for="item in todos.values" style="padding:0 10px;height:30px;line-height:30px;">
      <van-col span="4" align="start">
        {{ item.title }}
      </van-col>
      <van-col span="6" align="start">
        {{ item.content }}
      </van-col>
      <van-col span="4" align="start">
        {{ item.finishTime }}
      </van-col>
      <van-col span="4" align="start">
        {{ item.status==1?"not complete":"completed" }}
      </van-col>
      <van-col span="6" align="end" justify="center">
        <van-button
          @click="showDeleteDialog(item)"
          type="primary"
          size="mini"
          plain
        >delete</van-button>
        <van-button
          @click="showModifyDialog(item)"
          type="primary"
          size="mini"
          plain
        >modify</van-button>
        <van-button
          @click="doComplete(item)"
          type="primary"
          size="mini"
          plain
        >complete</van-button>
      </van-col>
    </van-row>
  </van-col>
  
  <van-popup v-model:show="isAddDialogShow" class="popup">
    <div style="padding: 15px; display: flex; justify-content: start">
      <span style="font-weight: bold">new to-do item</span>
    </div>
    <div style="height: 1px; background-color: #aaa"></div>
    <div>
      <van-col>
        <van-row>
          <van-field v-model="inputTitle" label="title" placeholder="title"/>
        <van-row>
        <van-row>
          <van-field v-model="inputContent" label="content" placeholder="content"/>
        <van-row>
        <van-row>
          <van-field v-model="inputFinishTime" label="finish time" placeholder="finish time"/>
        <van-row>
      </van-col>
    </div>
    <div style="height: 1px; background-color: #aaa"></div>
    <van-row justify="end" style="padding: 10px">
      <van-space>
        <van-button @click="closeAddDialog" type="default" size="small"
          >Cancel</van-button
        >
        <van-button @click="doAdd" type="primary" size="small">Ok</van-button>
      </van-space>
    </van-row>
  </van-popup>

  <van-popup v-model:show="isModifyDialogShow" class="popup">
    <div style="padding: 15px; display: flex; justify-content: start">
      <span style="font-weight: bold">modify to-do item</span>
    </div>
    <div style="height: 1px; background-color: #aaa"></div>
    <div>
      <van-col>
        <van-row>
          <van-field v-model="inputTitle" label="title" placeholder="title"/>
        <van-row>
        <van-row>
          <van-field v-model="inputContent" label="content" placeholder="content"/>
        <van-row>
        <van-row>
          <van-field v-model="inputFinishTime" label="finish time" placeholder="finish time"/>
        <van-row>
      </van-col>
    </div>
    <div style="height: 1px; background-color: #aaa"></div>
    <van-row justify="end" style="padding: 10px">
      <van-space>
        <van-button @click="closeModifyDialog" type="default" size="small"
          >Cancel</van-button
        >
        <van-button @click="doModify" type="primary" size="small">Ok</van-button>
      </van-space>
    </van-row>
  </van-popup>

  <van-popup v-model:show="isDeleteDialogShow" class="popup">
    <div style="padding: 15px; display: flex; justify-content: start">
      <span style="font-weight: bold">remove to-do item</span>
    </div>
    <div style="height: 1px; background-color: #aaa"></div>
    <div style="height: 200px;padding:15px;">
      <van-col>
        <van-row>
          Are you sure to remove to-do item ?
        <van-row>
      </van-col>
    </div>
    <div style="height: 1px; background-color: #aaa"></div>
    <van-row justify="end" style="padding: 10px">
      <van-space>
        <van-button @click="closeDeleteDialog" type="default" size="small"
          >Cancel</van-button
        >
        <van-button @click="doDelete" type="primary" size="small">Ok</van-button>
      </van-space>
    </van-row>
  </van-popup>
</template>

<style scope>
.popup {
  border: sold 1px #ddd;
  background-color: #fff;
  border-radius: 8px;
  min-width: 300px;
  min-height: 200px;
}
</style>

<script>
import { ref,computed,reactive } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useToDoStore } from '../stores/todo';

export default {
  mounted() {
    console.log('mounted');
    this.loadToDo();
  },
  setup() {
    console.log('setup');

    const completedCount = computed(() => todos.values?.filter((item) => item['status']==2).length);

    const notCompleteCount = computed(() => todos.values?.filter((item) => item['status']!=2).length);

    const current = reactive({});

    const isAddDialogShow = ref(false);
    const isModifyDialogShow = ref(false);
    const isDeleteDialogShow = ref(false);

    const inputTitle = ref('');
    const inputContent = ref('');
    const inputFinishTime = ref('');

    const todoStore = useToDoStore();
    const {
      todos,
      loadToDo,
      addToDo,
      modifyToDo,
      removeToDo,
      completeToDo
    } = todoStore;

    
    function showAddDialog() {
      current.value = null;
      inputTitle.value = "";
      inputContent.value = "";
      inputFinishTime.value = "";
      isAddDialogShow.value = true;
    }

    function doAdd() {
      addToDo({
        id: uuidv4(),
        title:inputTitle.value,
        content:inputContent.value,
        finishTime:inputFinishTime.value,
        status:1
      });
      isAddDialogShow.value = false;
    }

    function closeAddDialog() {
      isAddDialogShow.value = false;
    }


    function showModifyDialog(item) {
      current.value = item;
      inputTitle.value = item["title"];
      inputContent.value = item["content"];
      inputFinishTime.value = item["finishTime"];
      isModifyDialogShow.value = true;
    }

    function doModify() {
      modifyToDo({
        id: current.value["id"],
        title:inputTitle.value,
        content:inputContent.value,
        finishTime:inputFinishTime.value,
        status:current.value["status"]
      });
      isModifyDialogShow.value = false;
    }

    function closeModifyDialog() {
      isModifyDialogShow.value = false;
    }


    function showDeleteDialog(item) {
      current.value = item;
      isDeleteDialogShow.value = true;
    }

    function doDelete() {
      removeToDo(current.value);
      isDeleteDialogShow.value = false;
    }

    function closeDeleteDialog() {
      isDeleteDialogShow.value = false;
    }

    function doComplete(item) {
      completeToDo(item);
    }

    return {
      todos,
      loadToDo,
      completedCount,
      notCompleteCount,
      isAddDialogShow,
      isModifyDialogShow,
      isDeleteDialogShow,
      inputTitle,
      inputContent,
      inputFinishTime,
      showAddDialog,
      showModifyDialog,
      showDeleteDialog,
      closeAddDialog,
      closeModifyDialog,
      closeDeleteDialog,
      doComplete,
      doAdd,
      doModify,
      doDelete,
    };
  },
};
</script>
