<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor v-if="!modoEdicao"
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

     <q-editor v-else
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Atualizar nota',
          icon: 'save',
          label: 'Atualizar',
          handler: updateWork
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
      <!-- <q-btn flat color="blue" @click="item.estado = !item.estado">Ação</q-btn> -->
      <q-btn flat color="primary" @click="editar(index, item.id)">Editar</q-btn>
      <q-btn flat color="red" @click="eliminar(index, item.id)">Eliminar</q-btn>
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
      tasks: [],
      index: null,
      modoEdicao: false,
      id: null
    }
  },
  created() {
    this.listarTarefas();
  },
  methods: {
    async updateWork(){
      
      try {
        
        const resDB = await db.collection('tarefas').doc(this.id).update({
          texto: this.editor
        })

        this.tasks[this.index].texto = this.editor

        this.$q.notify({
          message: 'Sua tarefa foi atualizada',
          color: 'positive',
          textColor: 'white',
          icon: 'cloud_done'
        })    

      } catch (error) {
        console.log(error);
      } finally {
        this.modoEdicao = false;
        this.index = null;
        this.id = null;
        this.editor = ''
      }

    },
    editar(index, id){
      this.modoEdicao = true;
      this.index = index;
      this.id = id;
      this.editor = this.tasks[index].texto
    },
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
    async saveWork () {

      try {

        const resDB = await db.collection('tarefas').add({
          texto: this.editor,
          estado: false
        })
        this.tasks.push({
          texto: this.editor,
          estado: false,
          id: resDB.id
        })
        this.editor = ''
        this.$q.notify({
          message: 'Sua tarefa está salva',
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done'
        })        
      } catch (error) {
        console.log(error);
      }

    },
    async eliminar(index, id) {
      
      this.$q.dialog({
        title: 'Ação Perigosa',
        message: 'Realmente quer eliminar a tarefa?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        // console.log('>>> OK')

      try {

        await db.collection('tarefas').doc(id).delete()
        this.tasks.splice(index, 1);
        
      } catch (error) {
        console.log(error);
      }

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
