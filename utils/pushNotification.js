export const sendPushNotification = (token, userName) => {
  let response = fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: `${token}`,
      sound: "default",
      title: `Dear ${userName.split(" ")[0]}`,
      body: `You have reservation for tomorrow.`,
    }),
  }).catch((error) => console.log(error));
};
