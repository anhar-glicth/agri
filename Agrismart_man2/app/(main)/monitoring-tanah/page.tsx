import { SectionCards } from "@/components/section-cards";
import { StatusTanah } from "@/components/status-tanah";
import { ChartAreaInteractive } from "./charts";


export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="flex gap-6 items-start px-4 lg:px-6">
            <div className="w-150">
              <ChartAreaInteractive />
            </div>
            <div className="w-100 shrink-0">
              <StatusTanah />
            </div>
          </div>
          {/* <DataTable data={data} /> */}
          {/* <DataSensor /> */}
        </div>
      </div>
    </div>
  )
}