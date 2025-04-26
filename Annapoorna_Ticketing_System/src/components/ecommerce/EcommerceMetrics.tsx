import Chart from "react-apexcharts";

export default function EcommerceMetrics() {
  const metrics = [
    { label: "New Tickets", value: 20, percentage: 100 },
    { label: "Open Tickets", value: 13, percentage: 65 },
    { label: "Closed Tickets", value: 3, percentage: 15 },
    { label: "Unassigned Tickets", value: 0, percentage: 0 },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase text-gray-500">
              {metric.label}
            </span>
            <span className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
              {metric.value}
            </span>
          </div>
          <div className="w-[60px] h-[60px]">
          <Chart
  options={{
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
      background: "transparent",
    },
    theme: {
      mode: "dark",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "40%", // Thicker circle
        },
        track: {
          background: "#eeeeee", // Light grey background for remaining %
          strokeWidth: "100%",
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "14px",
            color: "#ffffff",
            show: true,
            offsetY: 5,
            fontWeight: 600,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    colors: ["#9b008e"], // Violet main progress color
    labels: [`${metric.percentage}%`],
  }}
  series={[metric.percentage]} // Example: 60
  type="radialBar"
  height={80}
  width={80}
/>


          </div>
        </div>
      ))}
    </div>
  );
}
