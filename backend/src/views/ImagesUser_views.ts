import ImageUser from "../models/ImageUser"

export default {
    render(image: ImageUser) {
        return {
            id: image.id, 
            url: `http://192.168.100.15:3333/uploads/${image.path}`          
        }
    },

    renderMany(images: ImageUser[]) {
        return images.map(image => this.render(image))

    }
}