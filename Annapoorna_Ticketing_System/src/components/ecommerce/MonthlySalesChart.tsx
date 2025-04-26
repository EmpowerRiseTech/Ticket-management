import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const donutOptions = (labels: string[], colors: string[]): ApexOptions => ({
  chart: {
    type: "donut",
    fontFamily: "Outfit, sans-serif",
  },
  labels,
  legend: {
    position: "right",
    fontSize: "14px",
    markers: {
      fillColors: colors,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors,
  stroke: {
    width: 0,
  },
  plotOptions: {
    pie: {
      donut: {
        size: "70%",
      },
    },
  },
});



export default function TicketInsights() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Ticket by department */}
      <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-white/[0.03]">
        <h4 className="mb-4 font-semibold text-gray-800 dark:text-white/90">
          Ticket by department
        </h4>
        <Chart
          options={donutOptions(["Hardware", "Billing", "Sales"], ["#f4a261", "#e9c46a", "#465fff"])}
          series={[40, 30, 30]}
          type="donut"
          height={200}
        />
      </div>

      {/* Ticket by type */}
      <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-white/[0.03]">
        <h4 className="mb-4 font-semibold text-gray-800 dark:text-white/90">
          Ticket by type
        </h4>
        <Chart
          options={donutOptions(["Tickets"], ["#465fff"])}
          series={[100]}
          type="donut"
          height={200}
        />
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          100% (20)
        </div>
      </div>

      {/* Top ticket creator */}
      <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-white/[0.03]">
        <h4 className="mb-4 font-semibold text-gray-800 dark:text-white/90">
          Top ticket creator
        </h4>
        <Chart
          options={donutOptions(["Arun", "Vinu", "Ishu"], ["#f4a261", "#e9c46a", "#465fff"])}
          series={[40, 30, 30]}
          type="donut"
          height={200}
        />
      </div>
    </div>
  );
}
