import { useState } from "react"
import { Calendar, ChevronDown, Filter, Star } from "lucide-react"
import {
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for the charts
const monthlyIncomeData = [
  { name: "Jan", income: 12000 },
  { name: "Feb", income: 15000 },
  { name: "Mar", income: 18000 },
  { name: "Apr", income: 14000 },
  { name: "May", income: 21000 },
  { name: "Jun", income: 19000 },
  { name: "Jul", income: 22000 },
  { name: "Aug", income: 25000 },
  { name: "Sep", income: 23000 },
  { name: "Oct", income: 26000 },
  { name: "Nov", income: 24000 },
  { name: "Dec", income: 28000 },
]

const caseStatusData = [
  { name: "Pending", value: 35 },
  { name: "In Progress", value: 45 },
  { name: "Completed", value: 80 },
]

const casesByMonthData = [
  { name: "Jan", pending: 10, inProgress: 15, completed: 5 },
  { name: "Feb", pending: 12, inProgress: 18, completed: 8 },
  { name: "Mar", pending: 15, inProgress: 20, completed: 12 },
  { name: "Apr", pending: 8, inProgress: 17, completed: 15 },
  { name: "May", pending: 10, inProgress: 15, completed: 20 },
  { name: "Jun", pending: 12, inProgress: 12, completed: 25 },
]

const ratingData = [
  { name: "5 Stars", value: 65 },
  { name: "4 Stars", value: 25 },
  { name: "3 Stars", value: 7 },
  { name: "2 Stars", value: 2 },
  { name: "1 Star", value: 1 },
]

export default function LawyerDashboard() {
  const [period, setPeriod] = useState("monthly")

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-white px-4 md:px-6">
        <h1 className="text-lg font-semibold md:text-2xl">Analytics Dashboard</h1>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                <span>Filter by Date</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Period</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setPeriod("weekly")}>This Week</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod("monthly")}>This Month</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod("quarterly")}>This Quarter</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod("yearly")}>This Year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-3 md:gap-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Total Pending Cases</CardTitle>
              <CardDescription>Current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35</div>
              <p className="text-xs text-gray-500">+2.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">In Progress Cases</CardTitle>
              <CardDescription>Current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-gray-500">+5.0% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Completed Cases</CardTitle>
              <CardDescription>Current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">80</div>
              <p className="text-xs text-gray-500">+12.3% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="income" className="mt-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="cases">Cases</TabsTrigger>
              <TabsTrigger value="ratings">Ratings</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
          <TabsContent value="income" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Income</CardTitle>
                <CardDescription>Income analysis for the past 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyIncomeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                      <XAxis dataKey="name" stroke="#333" />
                      <YAxis stroke="#333" />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length && payload[0] && payload[0].payload) {
                            return (
                              <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Month</span>
                                    <span className="font-medium">{payload[0].payload.name}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Income</span>
                                    <span className="font-medium">₹{payload[0].value.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="income" fill="#333" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="cases" className="mt-4 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Case Status Overview</CardTitle>
                <CardDescription>Current distribution of cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={caseStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {caseStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? "#333" : index === 1 ? "#666" : "#999"} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length && payload[0]) {
                            return (
                              <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Status</span>
                                    <span className="font-medium">{payload[0].name}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Count</span>
                                    <span className="font-medium">{payload[0].value}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cases by Month</CardTitle>
                <CardDescription>Case status trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={casesByMonthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                      <XAxis dataKey="name" stroke="#333" />
                      <YAxis stroke="#333" />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length && payload[0] && payload[0].payload) {
                            return (
                              <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
                                <div className="grid gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">Month</span>
                                    <span className="font-medium">{payload[0].payload.name}</span>
                                  </div>
                                  {payload.map(
                                    (p) =>
                                      p && (
                                        <div key={p.name} className="flex flex-col">
                                          <span className="text-sm font-medium text-gray-500">
                                            {p.name && p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                                          </span>
                                          <span className="font-medium">{p.value}</span>
                                        </div>
                                      ),
                                  )}
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Legend />
                      <Bar dataKey="pending" fill="#333" stackId="a" />
                      <Bar dataKey="inProgress" fill="#666" stackId="a" />
                      <Bar dataKey="completed" fill="#999" stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ratings" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Client Ratings</CardTitle>
                  <CardDescription>Overall client satisfaction</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Star className="h-5 w-5 fill-current text-black" />
                  <span className="text-xl font-bold">4.5</span>
                  <span className="text-sm text-gray-500">(120 reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {ratingData.map((rating, index) => (
                    <div key={rating.name} className="flex items-center gap-2">
                      <div className="w-24 text-sm">{rating.name}</div>
                      <div className="h-2 flex-1 rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-black"
                          style={{ width: `${(rating.value / 100) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-10 text-right text-sm">{rating.value}%</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <h4 className="mb-4 font-medium">Recent Reviews</h4>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                          <span className="font-medium">John Doe</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 5 ? "fill-current text-black" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Excellent service. The lawyer was very professional and helped me win my case.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                          <span className="font-medium">Jane Smith</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? "fill-current text-black" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Very knowledgeable and responsive. Would recommend to anyone needing legal assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

