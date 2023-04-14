import {defineStore} from 'pinia'
import {adminLogin, getInfo, logout} from '~/api/admin'
import {setToken, removeToken} from '~/composables/token'

export const useAdminStore = defineStore('admin', {
    state: () => ({
        token: '',
        adminInfo: {
            id: 0,
            role: '',
            nickname: '',
            avatar: ''
        },
        sideWith: '220px'

    }),
    actions: {

        adminLogin(ussername, password) {

            return new Promise((resolve, reject) => {
                //这个是admin.js方法
                adminLogin(ussername, password).then((res) => {
                    setToken(res.data.token);
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            })
        },
        async getInfo() {
            const res = await getInfo();
            console.log(res)
            this.adminInfo = res.data
        },

        async adminLogout() {
            //调用登出接口
            logout();
            //移除cookie里的token
            removeToken()
            //清空状态
            this.adminInfo = {}
        },

        setStoreToken(token) {
            this.token = token
        },
        changeAvatar(avatar) {
            this.admin.avatar = avatar
        },
        //伸缩
        handleSideWith() {
            console.log(this.sideWith)
            this.sideWith = this.sideWith === '220px' ? "120px" : "220px"
        }
    }
})
