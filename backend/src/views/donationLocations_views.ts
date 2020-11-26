import DonationLocation from "../models/DonationLocation"
import imagesView from './images_view'

export default {
    render(donationLocation: DonationLocation) {
        return {
            id: donationLocation.id,
            name: donationLocation.name,
            latitude: donationLocation.latitude,
            longitude: donationLocation.longitude,
            about: donationLocation.about,
            objects: donationLocation.objects,
            available_hours: donationLocation.available_hours,
            available_to_attend: donationLocation.available_to_attend,
            city: donationLocation.city,
            uf: donationLocation.uf,
            whatsapp: donationLocation.whatsapp,
            price: donationLocation.price,
            images: imagesView.renderMany(donationLocation.images)
            
        }
    },

    renderMany(donationLocations: DonationLocation[]) {
        return donationLocations.map(donationLocation => this.render(donationLocation))

    }
}