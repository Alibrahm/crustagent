import React, { useRef, useState, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { CircleArrowUp, Loader2, TextSearch,Linkedin,Webhook,SearchCheck } from "lucide-react";
import { Badge } from "./ui/badge";
import Messages from "./messages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Markdown from "./markdown";

type Props = {
  reportData?: string;
  setreportData: React.Dispatch<React.SetStateAction<string>>;
};

const ChatComponent = ({ reportData, setreportData }: Props) => {
  const handleButtonClick = (value: string) => {
    // Update reportData and input simultaneously
    setreportData(value);
    handleInputChange({
      target: { value },
    } as React.ChangeEvent<HTMLInputElement>);

    // Submit the form with the updated input and reportData
    handleSubmit(new Event("submit"), {
      data: {
        reportData: value, // Pass the dynamic value to reportData
      },
    });
  };
  useEffect(() => {
    if (reportData) {
      // Submit the form with the updated reportData
      handleSubmit(new Event("submit"), {
        data: {
          reportData, // Use the current value of reportData
        },
      });
    }
  }, [reportData]); // Trigger when reportData changes

  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      api: "api/askcrust",
    });
  return (
    <div className="h-full  dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')] relative flex flex-col min-h-[50vh] rounded-xl p-4 gap-4">
      {/* <Badge variant={'outline'}
        className={`absolute right-3 top-1.5 ${reportData && "bg-[#00B612]"}`}
      >
        {reportData ? "✓ Report Added" : "No Report Added"}

      </Badge> */}

      {data?.length == undefined && (
        <div className="flex flex-col mb-4">
          <div className="w-full flex justify-center">
            <div className="flex flex-col items-center bg-gradient-to-r  from-blue-600 via-[#001769] text-bold to-red-500  text-transparent bg-clip-text gap-4 text-4xl p-4 justify-center">
              <span>Hi there, Welcome to CrustData</span>
              <span className="justify-center text-3xl">
                What can I help with?
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-3 mx-auto p-3 w-3/5">
              <button
                type="button"
                value="What is the CrustData API"
                onClick={() => handleButtonClick("What is the CrustData API")}
                className="inline-flex items-center p-2 justify-center my-auto text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                <Webhook className="mr-1" />
                <h5 className=" text-xs font-normal my-auto tracking-tight">
                  Crustdata API Uses
                </h5>
              </button>

              <button
                type="button"
                value="How to search People on LinkedIn realtime api"
                onClick={() =>
                  handleButtonClick(
                    "How to search People on LinkedIn realtime api"
                  )
                }
                className="inline-flex items-center p-2 justify-center my-auto text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                <Linkedin className="mr-1" />
                <h5 className=" text-xs font-normal my-auto tracking-tight ">
                  Linkedin Search API
                </h5>
              </button>

              <button
                type="button"
                value="LinkedIn Posts Keyword Search"
                onClick={() =>
                  handleButtonClick("LinkedIn Posts Keyword Search")
                }
                className="inline-flex items-center p-2 justify-center my-auto text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                <SearchCheck className="mr-1" />
                <h5 className="text-xs font-normal my-auto tracking-tight ">
                  LinkedIn Keyword Search
                </h5>
              </button>
            </div>
            <div className="text-center text-sm">
              <a href="https://linkedin.com/in/ali-ibrahim-7138328b">
                alibra71@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1" />
      <Messages messages={messages} isLoading={isLoading} />
      {data?.length !== undefined && data.length > 0 && (
        <Accordion type="single" className="text-sm" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger dir="">
              <span className="flex flex-row items-center gap-2">
                <TextSearch />{" "}
                <span className="text-[#001769]">Relevant Info</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="whitespace-pre-wrap">
              <Markdown
                text={(data[data.length - 1] as any).retrievals as string}
                role=""
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      <form
        className="relative overflow-hidden rounded-lg border bg-background"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              reportData: reportData as string,
            },
          });
        }}
      >
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="How can CrustAgent help you today?"
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Button
            disabled={isLoading}
            type="submit"
            size="sm"
            className="ml-auto"
          >
            {isLoading ? "Analysing query" : "Ask"}
            {isLoading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <CircleArrowUp className="size-5 ml-2" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
