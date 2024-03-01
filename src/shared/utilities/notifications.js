import { Linking } from "react-native"

export const notificationFormater = (notification) => {
    // console.log('notiiii',notification)
    const sender = (notification?.data?.type == 'message' && notification.data.sender) ? JSON.parse(notification.data.sender) : null
    return {
        id: notification?.data?.id,
        title: notification?.notification?.title,
        body: notification?.notification?.body,
        image: notification?.data?.type == 'message' ? notification?.data?.avatar : notification?.data?.type == 'buy_property' ? notification?.data?.property_image : notification?.data?.type == 'sell_property' ? notification?.data?.sender_avatar : '',
        type: notification?.data?.type,
        seen: false,
        time: notification.sentTime ? new Date(notification.sentTime) : new Date(),
        data: notification?.data?.type == 'message' ?
            {
                conversation_id: notification?.data?.conversation_id,
                sender_id: sender?.id,
                sender_name: sender?.full_name,
            } :
            notification?.data?.type == 'buy_property' ?
                {
                    property_id: notification?.data?.property_id,
                } :
                notification?.data?.type == 'sell_property' ?
                    {
                        property_id: notification?.data?.property_id,
                        property_owner_id: notification?.data?.sender_id,
                        property_owner_name: notification?.notification?.title,
                    } :
                    notification?.data?.type == 'support_message' ?
                        {
                            conversation_id: notification?.data?.conversation_id
                        } :
                        {}
    }
}
export const navigateFromNotifi = (notification) => {
    console.log('notification in utitility', JSON.stringify(notification, null, 2));
    if (notification?.type == 'message') {
        Linking.openURL(`housibly://PersonChat/${notification?.data?.sender_id}/${notification.image ? encodeURIComponent(notification?.image) : 'avatar'}/${notification?.data?.sender_name}/message_notification/${notification?.data?.conversation_id}`)
    } else if (notification?.type == 'buy_property') {
        Linking.openURL(`housibly://PropertyDetail/${notification?.data?.property_id}/property_detail`)
    } else if (notification?.type == 'sell_property') {
        Linking.openURL(`housibly://PersonChat/${notification?.data?.property_owner_id}/${notification.image ? encodeURIComponent(notification?.image) : 'avatar'}/${notification?.data?.property_owner_name}/not_chats`)
    } else if (notification?.type == 'support_message') {
        Linking.openURL(`housibly://SupportChat/${notification?.data?.conversation_id}`)
    }
}