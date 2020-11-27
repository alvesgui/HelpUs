import User from "../models/User"
import ImagesUserView from './ImagesUser_views'

export default {
    render(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            images: ImagesUserView.renderMany(user.images)
            
        }
    },

    renderMany(users: User[]) {
        return users.map(user => this.render(user))

    }
}
