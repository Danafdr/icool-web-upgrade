import ContactController from './ContactController'
import AdminDashboardController from './AdminDashboardController'
import ScheduleController from './ScheduleController'
import AnalyticsController from './AnalyticsController'
import TechnicianController from './TechnicianController'
import Teams from './Teams'
import Settings from './Settings'
const Controllers = {
    ContactController: Object.assign(ContactController, ContactController),
AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
ScheduleController: Object.assign(ScheduleController, ScheduleController),
AnalyticsController: Object.assign(AnalyticsController, AnalyticsController),
TechnicianController: Object.assign(TechnicianController, TechnicianController),
Teams: Object.assign(Teams, Teams),
Settings: Object.assign(Settings, Settings),
}

export default Controllers