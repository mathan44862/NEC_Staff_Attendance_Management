const nodemailer = require('nodemailer');

const mailer = (reciever,body) =>{
    console.log(reciever);
    const emailConfig = {
        user: 'nec.staff.attendance@gmail.com', 
        pass: 'mljpnfbsfiwfnsad', 
    };
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailConfig.user,
            pass: emailConfig.pass,
        },
    });  
    const mailOptions = {
        from: emailConfig.user,
        to: reciever,
        subject: 'Leave Requested',
        text: body,
    };    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error.message);
        } else {
            console.log('Email sent successfully:', info.response);
        }
        transporter.close();
    });    
}

module.exports = mailer;