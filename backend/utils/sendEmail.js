import nodemailer from 'nodemailer'
export const sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
          service:process.env.SMTP_SERVICE,
          auth:{
            user:process.env.SMTP_EMAIL,
            pass:process.env.SMPT_PASSWORD
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