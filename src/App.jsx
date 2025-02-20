import * as React from "react";
import { TranslatorPage } from "./pages/TranslatorPage";
import { SummarizerPage } from "./pages/SummarizerPage";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState("translator");

  return (
    <div className="w-full max-w-3xl px-3 lg:px-0 mx-auto min-h-screen flex flex-col">
      <header className="py-4 flex flex-row justify-between items-center">
        <h1 className="text-white text-lg md:text-2xl font-bold">
          LanGPT{" "}
          <span className="text-xs md:text-base font-medium">
            AI-Powered Text Processing
          </span>
        </h1>
        <Select value={currentPage} onValueChange={setCurrentPage}>
          <SelectTrigger className="w-[100px] md:w-[150px]">
            <SelectValue placeholder="Select page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="translator">Translator</SelectItem>
              <SelectItem value="summarizer">Summarizer</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </header>

      <main className="flex-1 flex flex-col">
        {currentPage === "translator" ? <TranslatorPage /> : <SummarizerPage />}
      </main>
    </div>
  );
}
