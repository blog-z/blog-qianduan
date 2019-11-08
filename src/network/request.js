import axios from 'axios'
import qs from 'qs';
//封请求的组件
export function ajax(config){
    // axios.defaults.method = 'post';
    const registInstance = axios.create({
        baseURL:'http://localhost:8080',
        timeout:3000,
        // method:'post',
        headers:{'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'X-Requested-With,Content-Type',
        }
    })
    //做一个请求拦截器解决跨域问题
    axios.interceptors.request.use(req => {
        // 对 post 请求数据进行处理
        if (req.method === 'post') {
            Object.keys(req.data).forEach(item => {
                !isPrimeval(req.data[item]) && (req.data[item] = JSON.stringify(req.data[item]))
                console.log("进入了请求拦截的代码")
            })
            req.data = qs.stringify(req.data)
        }
        return req
    }, error => {
        // 请求出错时处理
        return Promise.reject(error)
    })
    //网上抄的代码
    //做一个响应拦截
    registInstance.interceptors.response.use(res => {
        console.log("res的数据类型"+typeof res);
        console.log("res的值为"+res)

        return res.data
    } ,err =>{console.log("响应拦截出现了问题")})
    return registInstance(config)
}
