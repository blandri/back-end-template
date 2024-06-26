import { User } from '../../database/models'
import { decodeToken } from '../helpers/user.helpers';

export default class UserServices {
    async getAllUsers() {
        let users;
        users = await User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email']
          });
    
        const use = users.map((user) => user.dataValues);
        return use;
      }
    
    async createUser(data) {
        const newUser = await User.create(data);
        return newUser;
      }
    
    async userLogin(data, res) {
        const userExist = await User.findOne({
          where: { email: data }
        });
    
        return userExist;
      }
    
    async userLogout(accessToken) {
        const token = await decodeToken(accessToken);
        const { email } = token;
        const user = await User.findOne({
          where: {
            email
          }
        });
    
        return user;
      }
    
    async findById(id) {
        return User.findOne({ where: { id }});
    }

    async getUser(email) {
        return User.findOne({ where: { email } });
    }
    
    static async update(data, condition) {
      return User.update(data, { where: { ...condition } });
    }
    
    async userExist(email) {
      const user = await User.findOne({ where: { email } });
      if (user) {
        return user;
      }
      return false;
    }
}