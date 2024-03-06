import { useSelector } from 'react-redux';
import {
    ActionCable,
    Cable,
} from '@kesha-antonov/react-native-action-cable';

let actionCable, cable;

const useChannel = () => {

    const userData = useSelector(state => state?.auth)

    const createChannel = (callbacks = {}) => {
        actionCable = ActionCable.createConsumer(`ws://16.171.63.250:3000/cable/api/v1/messages?HTTP_AUTH_TOKEN=${userData?.userInfo?.user?.auth_token}`)
        cable = new Cable({})
        const channel = cable.setChannel(
            `ConversationChannel`, // channel name to which we will pass data from Rails app with `stream_from`
            actionCable.subscriptions.create({
                channel: 'ConversationChannel', // from Rails app app/channels/chat_channel.rb
            })
        )
        channel
            .on('received', (e) => callbacks.received?.(e))
            .on('connected', (e) => callbacks.connected?.(e))
            .on('rejected', (e) => callbacks.rejected?.(e))
            .on('disconnected', (e) => callbacks.disconnected?.(e))
    }

    const removeChannel = () => {
        actionCable.disconnect()
    }

    return { createChannel, removeChannel }
}

export default useChannel