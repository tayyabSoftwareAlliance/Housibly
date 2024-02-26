const linking = {
    prefixes: ['housibly://'],
    config: {
        screens: {
            PersonChat: 'PersonChat/:recipient_id/:avatar/:full_name/:from/:conversation_id?',
            PropertyDetail: 'PropertyDetail/:id/:from',
            SupportChat:'SupportChat/:conversation_id'
        }
    }
}

export default linking