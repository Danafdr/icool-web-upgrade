import ContactController from './ContactController'
import AdminDashboardController from './AdminDashboardController'
import Teams from './Teams'
import Settings from './Settings'
const Controllers = {
    ContactController: Object.assign(ContactController, ContactController),
AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
Teams: Object.assign(Teams, Teams),
Settings: Object.assign(Settings, Settings),
}

export default Controllers