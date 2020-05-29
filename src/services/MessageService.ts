// import User from '../models/User';
// import Chat from '../models/Chat';
import Message from '../models/Message';

export default class MessageService {
    sendMessage = (messageData) =>
        new Promise((resolve, reject) =>
            Message.create(messageData)
                .then((response) => resolve(response))
                .catch((error) => reject(error)),
        );
}
