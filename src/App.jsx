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
    <div className="w-full max-w-3xl px-4 mx-auto min-h-screen flex flex-col">
      <header className="p-4 flex flex-row justify-between items-center">
        <h1 className="text-white text-xl font-bold">
          LanGPT AI-Powered Text Processing
        </h1>
        <Select value={currentPage} onValueChange={setCurrentPage}>
          <SelectTrigger className="w-[180px]">
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
