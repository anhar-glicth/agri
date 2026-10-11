"use client"

import HeaderLahan from "./header"
import { CardLahan } from "./body"

export default function Page() {

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="py-4 md:py-6">
          <div>
            <HeaderLahan />
            <CardLahan />
          </div>
          {/* <div>
            <Kanan />
          </div> */}
        </div>
      </div>
    </div>
  )
}
