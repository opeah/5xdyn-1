import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';

const configure = () => {

    PushNotification.configure({

    onNotification: function(notification) {
     // required on iOS only
        notification.finish(PushNotificationIOS.FetchResult.NoData);
   },

   permissions: {
     alert: true,
     badge: true,
     sound: true
   },

   popInitialNotification: true,
   requestPermissions: true,

 });
};

const localNotification = () => {
    PushNotification.localNotification({
      autoCancel: true,
      largeIcon: "ic_launcher",
      smallIcon: "ic_notification",
      bigText: "",
      subText: "BES Web Developer",
      color: "green",
      vibrate: true,
      vibration: 300,
      title: "IFOSUP",
      message: "Votre cours commence bientôt",
      playSound: false,
      soundName: 'default',
      actions: '["Accept", "Reject"]',
    });
   };


export { configure, localNotification };