"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Bot,
  CircleAlert,
  CircleAlertIcon,
  DoorClosedIcon,
  FileCheck2,
  LucideCircleAlert,
  OctagonAlert,
  Plus,
  Settings,
  TriangleAlert,
} from "lucide-react";
import { ModeToggle } from "@/components/modetoggle";
import { useState } from "react";
import { useChat } from "ai/react";
import ReportComponent from "@/components/ReportComponent";
// import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast"
import ChatComponent from "@/components/chatcomponent";

const Home = () => {
  const { toast } = useToast()

  const [reportData, setreportData] = useState("");
  const onReportConfirmation = (data: string) => {
    setreportData(data);
    toast({
      description: "Updated!"
    });
  }

  return (
    <div className="grid h-screen bg-[#5f606205] w-full">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px]  items-center gap-1  px-4">
          <h1 className="text-xl font-semibold justify-center bg-gradient-to-r  from-blue-600 via-[#001769] text-bold to-red-500  text-transparent bg-clip-text">
            <span className="flex flex-row justify-center">CrustAgent</span>
          </h1>
          <div className="w-full flex flex-row justify-end gap-2">
            <ModeToggle />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Settings />
                  <span className="sr-only">Settings</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh]">
                <ReportComponent onReportConfirmation={onReportConfirmation} />
              </DrawerContent>
            </Drawer>
          </div>
        </header>
        <main
          className="grid flex-1 gap-4 overflow-auto md:px-56
        md:grid-cols-2
        lg:grid-cols-3"
        >
          {/* <div className="hidden md:flex flex-col"> */}
          {/* <ReportComponent onReportConfirmation={onReportConfirmation} /> */}
          {/* <SideComponent onReportConfirmation={onReportConfirmation} /> */}
          {/* </div> */}
          <div className="lg:col-span-3 md:p-1 border border-gray-300 rounded-xl">
            <ChatComponent
              reportData={reportData}
              setreportData={setreportData}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
