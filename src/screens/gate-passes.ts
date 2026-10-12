export type GatePassDirection = "incoming" | "outgoing"
export type GatePassStatus = "open" | "completed"

export type DirectionFilter = "all" | GatePassDirection
export type StatusFilter = "any" | GatePassStatus
export type SortKey = "time" | "party"

export type GatePassOwnership = "owned"

export type GatePass = {
  id: string
  number: string
  serial: number
  party: string
  account: string
  vehicle: string
  commodity: string
  variety: string
  bags: number
  lot: string
  ownership: GatePassOwnership
  manualCount?: number
  direction: GatePassDirection
  status: GatePassStatus
  time: string
}

export const gatePasses: GatePass[] = [
  {
    id: "gp-1042",
    number: "GP-1042",
    serial: 61,
    party: "Ram Singh",
    account: "5",
    vehicle: "HR-26-AB-4412",
    commodity: "Potato",
    variety: "K. Pukhraj",
    bags: 100,
    lot: "4/100",
    ownership: "owned",
    manualCount: 4,
    direction: "incoming",
    status: "open",
    time: "2026-10-12T09:40:00",
  },
  {
    id: "gp-1041",
    number: "GP-1041",
    serial: 42,
    party: "Kisan Mandi",
    account: "2",
    vehicle: "PB-10-CD-2201",
    commodity: "Apple",
    variety: "Royal Delicious",
    bags: 50,
    lot: "12/50",
    ownership: "owned",
    direction: "outgoing",
    status: "completed",
    time: "2026-10-12T09:10:00",
  },
  {
    id: "gp-1040",
    number: "GP-1040",
    serial: 58,
    party: "Green Valley Farms",
    account: "18",
    vehicle: "HR-55-EF-1188",
    commodity: "Carrot",
    variety: "Nantes",
    bags: 80,
    lot: "2/80",
    ownership: "owned",
    direction: "incoming",
    status: "open",
    time: "2026-10-12T08:55:00",
  },
  {
    id: "gp-1038",
    number: "GP-1038",
    serial: 39,
    party: "Cold Chain Logistics",
    account: "11",
    vehicle: "DL-01-GH-9033",
    commodity: "Onion",
    variety: "Nasik Red",
    bags: 120,
    lot: "7/120",
    ownership: "owned",
    direction: "outgoing",
    status: "open",
    time: "2026-10-12T08:20:00",
  },
  {
    id: "gp-1036",
    number: "GP-1036",
    serial: 55,
    party: "Meena Devi",
    account: "9",
    vehicle: "HR-12-IJ-7740",
    commodity: "Peas",
    variety: "Arkel",
    bags: 40,
    lot: "1/40",
    ownership: "owned",
    manualCount: 2,
    direction: "incoming",
    status: "completed",
    time: "2026-10-12T07:45:00",
  },
  {
    id: "gp-1034",
    number: "GP-1034",
    serial: 36,
    party: "Agro Partners",
    account: "14",
    vehicle: "UP-32-KL-5519",
    commodity: "Cauliflower",
    variety: "Snowball",
    bags: 60,
    lot: "3/60",
    ownership: "owned",
    direction: "outgoing",
    status: "completed",
    time: "2026-10-12T07:10:00",
  },
  {
    id: "gp-1031",
    number: "GP-1031",
    serial: 52,
    party: "Suresh Yadav",
    account: "7",
    vehicle: "HR-26-MN-3302",
    commodity: "Tomato",
    variety: "Himsona",
    bags: 90,
    lot: "6/90",
    ownership: "owned",
    direction: "incoming",
    status: "open",
    time: "2026-10-12T06:40:00",
  },
  {
    id: "gp-1028",
    number: "GP-1028",
    serial: 33,
    party: "Fresh Basket",
    account: "21",
    vehicle: "PB-65-OP-8821",
    commodity: "Grapes",
    variety: "Thompson",
    bags: 45,
    lot: "2/45",
    ownership: "owned",
    direction: "outgoing",
    status: "open",
    time: "2026-10-12T06:05:00",
  },
  {
    id: "gp-1024",
    number: "GP-1024",
    serial: 48,
    party: "Balaji Traders",
    account: "3",
    vehicle: "RJ-14-QR-2190",
    commodity: "Garlic",
    variety: "Yamuna Safed",
    bags: 70,
    lot: "5/70",
    ownership: "owned",
    manualCount: 1,
    direction: "incoming",
    status: "completed",
    time: "2026-10-11T18:30:00",
  },
  {
    id: "gp-1020",
    number: "GP-1020",
    serial: 29,
    party: "Hill Orchards",
    account: "16",
    vehicle: "HP-03-ST-6408",
    commodity: "Apple",
    variety: "K. Pukhraj",
    bags: 55,
    lot: "8/55",
    ownership: "owned",
    direction: "outgoing",
    status: "completed",
    time: "2026-10-11T16:15:00",
  },
]
