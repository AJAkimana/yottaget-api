import Nexmo from 'nexmo';

const nexmo = new Nexmo({
  apiKey: process.env.SMS_API_KEY,
  apiSecret: process.env.SMS_SECRET_KEY
});

export const sendSms = (info, sendCallBack) => {
  const { sender, receiver, message } = info;
  nexmo.message.sendSms(sender, receiver, message, (error, response) => {
    if (error) return sendCallBack(error);
    if (response.messages[0]['status'] !== '0') {
      return sendCallBack(
        `Message failed with error: ${response.messages[0]['error-text']}`
      );
    }
    return sendCallBack(null, 'Message sent successfully');
  });
};
