import nodemailer from 'nodemailer'
export const sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
          service:process.env.SMTP_SERVICE,
          auth:{
            user:SMTP_MAIL,
            pass:process.env.SMPT_PASSWORD//from gmail at 6:14
          } 
    })

    const mailOptions = {
        from:"mcvincemuthoni@gmail.com",
        to:options.email,
        text:options.subject,
        text:options.message
    } 
    
    await transporter.sendMail(mailOptions);
}