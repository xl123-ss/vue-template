import {useRouter} from "vue-router";
import {useAdminStore} from "../store/index.js";
import {showModel, toast} from "./util.js";
import {reactive, ref} from "vue";
import {updatepassword} from "../api/admin.js";
import router from "../router/index.js";
export function uselogin() {

}

export function useRepassword() {

    //总router
    // const router = useRouter();
    const store = useAdminStore()
    const {adminLogout} = store
    const formDrawerRef = ref(null)
    const openRePassword = () => formDrawerRef.value.open()
    const form = reactive({
        "oldpassword": "admin",
        "password": "123456",
        "repassword": "123456",
    })

    const rePassRule = (rule, value, callback) => {
        if (value === '') {
            callback(new Error("确认密码不能为空!"))
        } else if (value != form.password) {
            callback(new Error("确认密码必须和新密码一致!"))
        } else {
            callback()
        }
    }
// 绑定表单规则
    const rules = {
        oldpassword: [
            {required: true, message: '旧密码不能为空', trigger: 'blur'}
        ],
        password: [
            {required: true, message: '新密码不能为空', trigger: 'blur'}
        ],
        repassword: [
            {validator: rePassRule, trigger: 'blur'}
        ]

    }

// 定义表单元素dom
// const formRef = ref(null)
// 旋转加载
// const loading = ref(false)

    const formRef = ref(null)
    const loading = ref(false)
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()
            setTimeout(() => {
                updatepassword(form)
                    .then((res) => {
                        console.log(res)
                        if (res.code == 1) {
                            toast("修改密码成功,请重新登录")
                            adminLogout().then(() => {
                                router.push("/login")
                            })
                        } else {
                            toast("修改密码失败", 'error')
                        }
                        loading.value = false
                    }).finally(() => {
                        formDrawerRef.value.closeLoading()
                })
            }, 1000)
        })
    }

    return {formDrawerRef,form,rules,formRef,openRePassword, onSubmit,rePassRule}
}

export function uselogout() {
    //总router
    const router = useRouter();

    const store = useAdminStore()
    const {adminLogout} = store
    const handleLogout = () => {
        showModel("是否退出登录?").then(() => {
            adminLogout()
            toast("退出登录成功")
            router.push("/login")
        })
    }

    return {
        handleLogout
    }
}

