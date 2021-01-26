<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Salve sua tarefa',
          icon: 'save',
          label: 'Salvar',
          handler: saveWork
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />    
    <q-card class="row"
      flat bordered v-for="(item, index) in tasks" :key="index">
      <q-card-section class="col" v-html="item.texto" :class="item.estado ? 'tachar' : ''" />
      <q-btn flat color="blue" @click="item.estado = !item.estado">Ação</q-btn>
      <q-btn flat color="red" @click="eliminar(index)">Eliminar</q-btn>
    </q-card>

    <div class="flex flex-center" v-if="tasks.length == 0">
      <h6>Sem Tarefas!</h6>
    </div>

  </div>
</template>

<script>
import { db} from "boot/firebase";
export default {
  // Default Page Index
  // name: 'PageIndex'  
  data() {
    return {
      editor: '',
      tasks: [
       // {
       //   id: 'QQabqaXfSLni3y6bMzuD', texto: 'ABC', estado: false
       // },
       // {
       //   id: 'def', texto: 'DEF', estado: true
       // }
      ]
    }
  },
  created() {
    this.listarTarefas();
  },
  methods: {
    async listarTarefas(){
      try {

        const resDB = await db.collection('tarefas').get()

        resDB.forEach(element => {
          console.log(element.id);
          const tarefa = {
            id: element.id,
            texto: element.data().texto,
            estado: element.data().estado
          }
          this.tasks.push(tarefa)
        });

      } catch (error) {
        console.log(error);
      }
    },
    saveWork () {
      this.tasks.push({
        texto: this.editor,
        estado: false
      })
      this.$q.notify({
        message: 'Sua tarefa está salva',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
      })
    },
    eliminar(index) {
      this.$q.dialog({
        title: 'Ação Perigosa',
        message: 'Realmente quer eliminar a tarefa?',
        cancel: true,
        persistent: true
      }).onOk(() => {
      this.tasks.splice(index, 1);
        // console.log('>>> OK')
      })     
    }
  }
}
</script>

<style>
  .tachar{
    text-decoration: line-through;
  }
</style>
