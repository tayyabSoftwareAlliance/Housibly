const linking = {
    prefixes: ['housibly://'],
    config: {
        screens: {
            PersonChat: 'PersonChat/:recipient_id/:avatar/:full_name/:from/:conversation_id?',
            PropertyDetail: 'PropertyDetail/:id/:from',
        }
    }
}

export default linking