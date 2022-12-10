const UserRepository = require('../../../Infrastructure/Persistence/Repository/User');

module.exports = async ({ username, password }) => {
    const result = await UserRepository.findOneByPassword(username, password);
    if (!result) {
        throw new Error('messages.error.bad_credential');
    }

    return result;
};
