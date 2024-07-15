import { Pages } from "../../../types/api/routes"

const singlePagesRoutes: Pages.SinglePagesRouteUrls = {
  index: `${Pages.RootRoute.singlePages}` as Pages.SinglePagesRouteUrls["index"],
};

const authRoutes: Pages.AuthRouteUrls = {
  signup: `${Pages.RootRoute.auth}/signup` as Pages.AuthRouteUrls["signup"],
  signin: `${Pages.RootRoute.auth}/signin` as Pages.AuthRouteUrls["signin"],
  forgotPassword: `${Pages.RootRoute.auth}/forgot-password` as Pages.AuthRouteUrls["forgotPassword"],
  resetPassword: `${Pages.RootRoute.auth}/reset-password` as Pages.AuthRouteUrls["resetPassword"],
};

const parcelsRoutes: Pages.ParcelsRouteUrls = {
  list: `${Pages.RootRoute.parcels}/` as Pages.ParcelsRouteUrls["list"],
  show: `${Pages.RootRoute.parcels}/:id` as Pages.ParcelsRouteUrls["show"],
  create: `${Pages.RootRoute.parcels}/create` as Pages.ParcelsRouteUrls["create"],
  update: `${Pages.RootRoute.parcels}/update/:id` as Pages.ParcelsRouteUrls["update"],
};

const shipmentsRoutes: Pages.ShipmentsRouteUrls = {
  list: `${Pages.RootRoute.shipments}/` as Pages.ShipmentsRouteUrls["list"],
  show: `${Pages.RootRoute.shipments}/:id` as Pages.ShipmentsRouteUrls["show"],
  create: `${Pages.RootRoute.shipments}/create` as Pages.ShipmentsRouteUrls["create"],
  update: `${Pages.RootRoute.shipments}/update/:id` as Pages.ShipmentsRouteUrls["update"],
};

const customersRoutes: Pages.CustomersRouteUrls = {
  list: `${Pages.RootRoute.customers}/` as Pages.CustomersRouteUrls["list"],
  show: `${Pages.RootRoute.customers}/:id` as Pages.CustomersRouteUrls["show"],
  create: `${Pages.RootRoute.customers}/create` as Pages.CustomersRouteUrls["create"],
  update: `${Pages.RootRoute.customers}/update/:id` as Pages.CustomersRouteUrls["update"],
};

const usersRoutes: Pages.UsersRouteUrls = {
  list: `${Pages.RootRoute.users}/` as Pages.UsersRouteUrls["list"],
  show: `${Pages.RootRoute.users}/:id` as Pages.UsersRouteUrls["show"],
  create: `${Pages.RootRoute.users}/create` as Pages.UsersRouteUrls["create"],
  update: `${Pages.RootRoute.users}/update/:id` as Pages.UsersRouteUrls["update"],
};

const busesRoutes: Pages.BusesRouteUrls = {
  list: `${Pages.RootRoute.buses}/` as Pages.BusesRouteUrls["list"],
  show: `${Pages.RootRoute.buses}/:id` as Pages.BusesRouteUrls["show"],
  create: `${Pages.RootRoute.buses}/create` as Pages.BusesRouteUrls["create"],
  update: `${Pages.RootRoute.buses}/update/:id` as Pages.BusesRouteUrls["update"],
};

const settingsRoutes: Pages.SettingsRouteUrls = {
  profile: `${Pages.RootRoute.buses}/profile` as Pages.SettingsRouteUrls["profile"],
  billing: `${Pages.RootRoute.buses}/billing` as Pages.SettingsRouteUrls["billing"],
  sms: `${Pages.RootRoute.buses}/sms` as Pages.SettingsRouteUrls["sms"],
};

export { singlePagesRoutes, authRoutes, parcelsRoutes, shipmentsRoutes, customersRoutes, usersRoutes, busesRoutes, settingsRoutes }
