import React from "react";
import { Button } from "react-native";
import * as MailComposer from "expo-mail-composer";

const EmailButton = ({ recipient, subject, message }) => {
  const handlePress = () => {
    MailComposer.composeAsync({
      recipients: [recipient],
      subject: subject,
      body: message,
    })
      .then((result) => {
        if (result.status === "sent") {
          console.log(`Email sent to ${recipient}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return <Button title="Send Email" onPress={handlePress} />;
};

export default EmailButton;