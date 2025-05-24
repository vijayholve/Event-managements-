import React from "react";
import Header from "../../components/dashboard/Header";
import DashBox from "../../components/dashboard/DashBox";
import EventList from "../../components/list/EventList";
const DashBoard = () => {
  return (
    <>
      <Header title={"DashBoard"} link={"/event/create"} />
      <div className="flex justify-content-between">
        <DashBox className="col-md-6" title={"Total User"} total_number="1" />
        <DashBox className="col-md-6" title={"ACtive user "} total_number="1" />
        <DashBox className="col-md-6" title={"No of Kyc"} total_number="1" />
        <DashBox className="col-md-6" title={"Pending kyc "} total_number="1" />
      </div>
      <div className="flex justify-content-between">
        <DashBox
          className="col-md-6"
          title={"aproved User "}
          total_number="1"
        />
        <DashBox
          className="col-md-6"
          title={"Rejected User "}
          total_number="1"
        />
        <DashBox
          className="col-md-6"
          title={"aproved User "}
          total_number="1"
        />
        <DashBox
          className="col-md-6"
          title={"Rejected User "}
          total_number="1"
        />
      </div>
      <div>
        <EventList />
      </div>
    </>
  );
};

export default DashBoard;
