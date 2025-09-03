import { ResponsiveBar } from "@nivo/bar"

export default function BarChart(props) {
    return (
      <div {...props}>
        <ResponsiveBar
          data={[
            { name: "Jan", count: 111 },
            { name: "Feb", count: 157 },
            { name: "Mar", count: 129 },
            { name: "Apr", count: 150 },
            { name: "May", count: 119 },
            { name: "Jun", count: 72 },
            { name: "July", count: 72 },
            { name: "Aug", count: 111 },
            { name: "Sep", count: 157 },
            { name: "Oct", count: 129 },
            { name: "Nov", count: 150 },
            { name: "Dec", count: 157 },

          ]}
          keys={["count"]}
          indexBy="name"
          margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
          padding={0.3}
          colors={["#9faedb"]}
          borderRadius={6}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 4,
            tickPadding: 16,
          }}
          gridYValues={4}
          theme={{
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
            grid: {
              line: {
                stroke: "#f3f4f6",
              },
            },
          }}
          tooltipLabel={({ id }) => `${id}`}
          enableLabel={false}
          role="application"
          ariaLabel="A bar chart showing data"
        />
      </div>
    )
  }