export const sendPushNotification = (token, hotelInfo) => {
  let response = fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: `${token}`,
      sound: "default",
      title: "Dear User",
      body: `You have reservation for ${hotelInfo} hotel tomorrow.`,
    }),
  }).catch((error) => console.log(error));
};
