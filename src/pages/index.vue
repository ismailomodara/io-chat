<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance } from 'element-plus'

import { create, login } from "@/firebase/auth";
import { type UserAuth} from "@/types";

const formRef = ref<FormInstance>()
const form = ref<UserAuth>({
  username: "",
  password: ""
})
const formRules = {
  username: [
    {
      required: true,
      message: 'Please input username',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur',
    },
  ]
}

const router = useRouter();
const action = ref('create');

const submitting = ref(false);
const submit = () => {
  const formEl: FormInstance | undefined = formRef.value
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) {
      console.log("Error in form")
      alert("Error in form")
      return;
    }

    submitting.value = true;
    try {
      const response = action.value === 'login' ? await login(form.value) : await create(form.value);
      console.log(response)
      router.push({ name: "chats" })
    } catch (e) {
      console.log(e)
    } finally {
      submitting.value = false;
    }
  })
}

const reset = () => {
  const formEl: FormInstance | undefined = formRef.value
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <ElContainer>
    <ElRow>
      <ElCol :span="24">
        <h1>Welcome to IO Chat!</h1>
        <p>Please provide a username and password to {{ action === 'create' ? 'create an account' : 'login into account'}}</p>
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="24">

        <el-radio-group v-model="action">
          <el-radio value="login" size="large">Login</el-radio>
          <el-radio value="create" size="large">Create</el-radio>
        </el-radio-group>

        <ElForm ref="formRef" :model="form" :rules="formRules">
          <ElFormItem label="Username" prop="username">
            <ElInput v-model="form.username" />
          </ElFormItem>
          <ElFormItem label="Password" prop="password">
            <ElInput v-model="form.password" type="password" autocomplete="off" />
          </ElFormItem>
          <ElFormItem>
            <el-button type="primary" :loading="submitting" @click="submit">
              Submit
            </el-button>
            <el-button @click="reset">Reset</el-button>
          </ElFormItem>
        </ElForm>
      </ElCol>
    </ElRow>
  </ElContainer>
</template>
