import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';
import NotFound from './pages/OtherPage/NotFound';
import UserProfiles from './pages/UserProfiles';
import Videos from './pages/UiElements/Videos';
import Images from './pages/UiElements/Images';
import Alerts from './pages/UiElements/Alerts';
import Badges from './pages/UiElements/Badges';
import Avatars from './pages/UiElements/Avatars';
import Buttons from './pages/UiElements/Buttons';
import LineChart from './pages/Charts/LineChart';
import BarChart from './pages/Charts/BarChart';
import Calendar from './pages/Calendar';
import BasicTables from './pages/Tables/BasicTables';
import FormElements from './pages/Forms/FormElements';
import Blank from './pages/Blank';
import AppLayout from './layout/AppLayout';
import Location from './components/masters/Location/Location';
import Department from './components/masters/Department/Department';
import { ScrollToTop } from './components/common/ScrollToTop';
import Home from './pages/Dashboard/Home';
import Designation from './components/masters/Designation/Designation';
import CreateDesignation from './components/masters/Designation/CreateDesignation';
import Branch from './components/masters/Branch/Branch';
import Employee from './components/masters/Employee/Employee';
import TicketPage from './components/tickets/Ticket';
import CreateTicket from './components/tickets/CreateTicket';
import AssetManagement from './components/masters/AssetsManagement/AssetsManagement';
import VendorManagement from './components/vendors/vendor';
import CreateVendor from './components/vendors/CreateVendor';
import CreateBranch from './components/masters/Branch/CreateBranch';
import CreateEmployee from './components/masters/Employee/CreateEmployee';
import CreateAsset from './components/masters/AssetsManagement/CreateAsset';
import CreateDepartment from './components/masters/Department/CreateDepartment';
import PrivateRoute from './utils/PrivateRouter';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/designation" element={<PrivateRoute element={<Designation />} />} />
          <Route path="/create-designation" element={<PrivateRoute element={<CreateDesignation />} />} />
          <Route path="/location" element={<PrivateRoute element={<Location />} />} />
          <Route path="/create-branch" element={<PrivateRoute element={<CreateBranch />} />} />
          <Route path="/branch" element={<PrivateRoute element={<Branch />} />} />
          <Route path="/department" element={<PrivateRoute element={<Department />} />} />
          <Route path="/create-department" element={<PrivateRoute element={<CreateDepartment />} />} />
          <Route path="/employee" element={<PrivateRoute element={<Employee />} />} />
          <Route path="/create-employee" element={<PrivateRoute element={<CreateEmployee />} />} />
          <Route path="/asset-management" element={<PrivateRoute element={<AssetManagement />} />} />
          <Route path="/create-asset" element={<PrivateRoute element={<CreateAsset />} />} />
          <Route path="/vendor" element={<PrivateRoute element={<VendorManagement />} />} />
          <Route path="/create-vendor" element={<PrivateRoute element={<CreateVendor />} />} />
          <Route path="/ticket" element={<PrivateRoute element={<TicketPage />} />} />
          <Route path="/create-ticket" element={<PrivateRoute element={<CreateTicket />} />} />

          {/* Other Pages */}
          <Route path="/profile" element={<PrivateRoute element={<UserProfiles />} />} />
          <Route path="/calendar" element={<PrivateRoute element={<Calendar />} />} />
          <Route path="/blank" element={<PrivateRoute element={<Blank />} />} />

          {/* Forms */}
          <Route path="/form-elements" element={<PrivateRoute element={<FormElements />} />} />
          
          {/* Tables */}
          <Route path="/basic-tables" element={<PrivateRoute element={<BasicTables />} />} />

          {/* UI Elements */}
          <Route path="/alerts" element={<PrivateRoute element={<Alerts />} />} />
          <Route path="/avatars" element={<PrivateRoute element={<Avatars />} />} />
          <Route path="/badge" element={<PrivateRoute element={<Badges />} />} />
          <Route path="/buttons" element={<PrivateRoute element={<Buttons />} />} />
          <Route path="/images" element={<PrivateRoute element={<Images />} />} />
          <Route path="/videos" element={<PrivateRoute element={<Videos />} />} />

          {/* Charts */}
          <Route path="/line-chart" element={<PrivateRoute element={<LineChart />} />} />
          <Route path="/bar-chart" element={<PrivateRoute element={<BarChart />} />} />
        </Route>

        {/* Auth Layout */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
