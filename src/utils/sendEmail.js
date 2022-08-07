
const nodemailer = require("nodemailer");


let sendSimpleEmail = async (ObjectData) => {

let result = ''
let subjectEmail = ''

if(ObjectData.valueLanguage === 'en'){
    result = `<p>Hello ${ObjectData.fullName} Have a nice day ❤️❤️❤️</p> 
    <br/> <p>Below is your verification code, please don't tell anyone.</p> <br/> <h2>${ObjectData.token}</h2>`

    subjectEmail = `Forgot password? Please enter new code here to update again!!!`
}

if(ObjectData.valueLanguage === 'vi'){
    result = `<p>Xin Chào ${ObjectData.fullName}  Chúc bạn 1 một ngày vui vẻ ❤️❤️❤️</p> <br/> 
    <p>Dưới đây là mã xác minh của bạn để lấy lại mật khẩu của bạn, vui lòng không cho ai biết</p> <br/> 
    <h2>${ObjectData.token}</h2>`

    subjectEmail = `Bạn quên mật khẩu ? Hãy nhập mã ở đưới đây để cập nhật lại nhé !!! `
}

     let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    
     
     
    let info = await transporter.sendMail({
        from: '"Lê Thế Nguyện"webk12hht@gmail.com',     // Tên Người Gửi
        to: ObjectData.valueAccount,                    // Gửi đến ai ?
        subject: subjectEmail,                          // Tiêu đề email
        text: "",                                       // plain text body
        html: `${result}`,                              // html body
    });
}




export default {
  sendSimpleEmail
}