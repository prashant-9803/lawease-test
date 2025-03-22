import React from "react";
import {
  BarChart3,
  BookOpen,
  Calendar,
  FileText,
  FileDigit,
  Home,
  MessageSquare,
  PieChart,
  Settings,
  Users,
  Inbox,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SidebarCol = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { firstName, lastName, accountType } = user;
  const isProvider = accountType === "Provider";

  return (
    <div>
      <SidebarProvider>
        <Sidebar className="mt-14">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem className="ml-6 mt-3">
                <SidebarMenuButton size="lg" asChild>
                  <a href="#" className="flex items-center gap-2">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <BookOpen className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">
                        {firstName} {lastName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {accountType}
                      </span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent className="ml-6">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to={`/dashboard/${isProvider ? "analytics": "your-case"}`} className="flex items-center gap-2">
                    <Home className="mr-2 size-4" />
                    {isProvider ? "Analytics" : "Your Case"}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Only show Your Case as separate menu for Providers */}
              {isProvider && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/dashboard/your-case"
                      className="flex items-center gap-2"
                    >
                      <FileText className="mr-2 size-4" />
                      Your Case
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {/* Only show Pending Cases menu item for Provider accounts */}
              {isProvider && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/dashboard/pending-cases"
                      className="flex items-center gap-2"
                    >
                      <Users className="mr-2 size-4" />
                      Pending Cases
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/dashboard/chat"
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="mr-2 size-4" /> Chat
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/dashboard/pdf-summary"
                    className="flex items-center gap-2"
                  >
                    <FileDigit className="mr-2 size-4" /> PDF Summary
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/dashboard/payment-history"
                    className="flex items-center gap-2"
                  >
                    {" "}
                    <BarChart3 className="mr-2 size-4" />
                    Payment History
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/dashboard/payments"
                    className="flex items-center gap-2"
                  >
                    <PieChart className="mr-2 size-4" />
                    Payments
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/dashboard/settings"
                    className="flex items-center gap-2"
                  >
                    <Settings className="mr-2 size-4" />
                    Settings
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center justify-center p-4">
              <span className="text-xs text-muted-foreground">
                © 2024 LegalEase
              </span>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
      </SidebarProvider>
    </div>
  );
};

export default SidebarCol;
