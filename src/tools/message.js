import {Message} from 'element-ui'
const message = (message, type='warning', center=null) => {
    Message({
        message: message,
        type: type,
        center: center
    })
}
export default message;