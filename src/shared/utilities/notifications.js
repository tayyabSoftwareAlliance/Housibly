import { Linking } from "react-native"

export const notificationFormater = (notification) => {
    // console.log('notiiii',notification)
    const sender = (notification?.data?.type == 'message' && notification.data.sender) ? JSON.parse(notification.data.sender) : null
    return {
        id: notification?.data?.id,
        title: notification?.notification?.title,
        body: notification?.notification?.body,
        type: notification?.data?.type,
        // receiver: notification?.data?.receiver,
        seen: false,
        time: new Date(notification.sentTime),
        data: notification?.data?.type == 'message' ?
            {
                conversation_id: notification?.data?.conversation_id,
                sender_id: sender?.id,
                sender_name: sender?.full_name,
                sender_avatar: sender?.avatar,
            } :
            notification?.data?.type == 'buy_property' ?
                {
                    property_id:notification?.data?.property_id,
                    property_image:notification?.data?.property_image,
                } :
                {
                    property_id:notification?.data?.property_id,
                    property_owner_image:notification?.data?.property_owner_image,
                }
    }
}
export const navigateFromNotifi = (notification) => {
    // console.log('notification in utitility', JSON.stringify(notification, null, 2));
    if (notification?.type == 'message') {
        Linking.openURL(`housibly://PersonChat/${notification?.data?.conversation_id}/${notification?.data?.sender_id}/${notification.data.sender_avatar ? encodeURIComponent(notification?.data?.sender_avatar) : 'avatar'}/${notification?.data?.sender_name}`)
    }
}