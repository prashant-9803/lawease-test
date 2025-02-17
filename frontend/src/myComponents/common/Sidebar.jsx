import React from 'react';
import { BarChart3, BookOpen, Calendar, FileText, Home, MessageSquare, PieChart, Settings, Users } from 'lucide-react';

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
} from '@/components/ui/sidebar';
import { useSelector } from 'react-redux';

const SidebarCol = () => {

  const {user} = useSelector((state) => state.profile);
  const {firstName, lastName, accountType} = user;

  return (
    <div>
      <SidebarProvider>
      <Sidebar className="mt-14">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className='ml-6 mt-3'>
              <SidebarMenuButton size="lg" asChild>
                <a href="#" className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <BookOpen className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">{firstName} {lastName}</span>
                    <span className="text-xs text-muted-foreground">{accountType}</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className='ml-6'>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Home className="mr-2 size-4" />
                  Dashboard
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <FileText className="mr-2 size-4" />
                  Your Case
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Users className="mr-2 size-4" />
                  Pending Cases
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <MessageSquare className="mr-2 size-4" />
                  Chat
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <BarChart3 className="mr-2 size-4" />
                  Payment History
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <PieChart className="mr-2 size-4" />
                  Payments
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Calendar className="mr-2 size-4" />
                  Appointments
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Settings className="mr-2 size-4" />
                  Settings
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-center p-4">
            <span className="text-xs text-muted-foreground">© 2024 LegalEase</span>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
    </div>
  );
};

export default SidebarCol;