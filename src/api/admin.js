import axios from '~/axios'

// 管理员登录
export function adminLogin(username, password) {
    return axios.post(
        '/admin/login',
        {
            username,
            password
        }
    )
}
// 获得信息接口
export function getInfo() {
    return axios.post(
        '/admin/getInfo'
    )
}

// 退出接口
export function logout() {
    return axios.post(
        '/admin/logout'
    )
}

// 修改密码
export function updatepassword(data){
    console.log(data)
    return axios.post(
        '/admin/updatepassword',
        data,

    )
}
