"use client"
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ConfirmDialog from "@/components/ConfirmDialog";
import CountUp from "react-countup";
import { toast } from "sonner";

import Hero from "@/components/Hero";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Link from "next/link"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboardStats } from "@/services/dashboardService";
import {
  getComplaints,
  getRecentActivity,
} from "@/services/complaintService";
import ComplaintModal from "@/components/ComplaintModal";
import {
  analyzeComplaintsWithAI,
  AIAnalysisResponse,
} from "@/services/aiService";
import {
  sendChatMessage,
  ChatHistoryItem,
} from "@/services/chatService";
import { motion } from "framer-motion"
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  Brain,
  Clock3,
  ShieldCheck,
  LayoutDashboard,
  FileText,
  BarChart3,
  Sparkles,
  Settings
} from "lucide-react"
type CopilotMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
};
const COPILOT_WELCOME_MESSAGE: CopilotMessage = {
  id: "welcome-message",
  role: "assistant",
  content:
    "Hello! I am CivicAI Copilot. Ask me about complaints, priorities, risks, pending issues, or civic operations in any language.",
};

const COPILOT_STORAGE_KEY = "civicai-copilot-messages";
export default function Home() {
    const router = useRouter();
  const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  inProgress: 0,
  resolved: 0,
  critical: 0,
});
const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

const [activities, setActivities] = useState<any[]>([]);
const latestNotifications = activities.slice(0, 3);
const [weeklyGrowth, setWeeklyGrowth] = useState(0);
const [resolvedGrowth, setResolvedGrowth] = useState(0);
const [recommendation, setRecommendation] = useState({
  title: "System Monitoring Active",
  message: "No urgent recommendation available yet.",
  level: "Low",
});
const [weeklyData, setWeeklyData] = useState([
  { day: "Mon", count: 0 },
  { day: "Tue", count: 0 },
  { day: "Wed", count: 0 },
  { day: "Thu", count: 0 },
  { day: "Fri", count: 0 },
  { day: "Sat", count: 0 },
  { day: "Sun", count: 0 },
]);
const [aiAnalysis, setAiAnalysis] =
  useState<AIAnalysisResponse | null>(null);

const [isAnalyzing, setIsAnalyzing] =
  useState(false);

const [aiError, setAiError] =
  useState("");
  const [analysisGeneratedAt, setAnalysisGeneratedAt] =
  useState<Date | null>(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

const [copilotInput, setCopilotInput] = useState("");

const [isCopilotTyping, setIsCopilotTyping] =
  useState(false);

const [copilotError, setCopilotError] =
  useState("");

const [copilotMessages, setCopilotMessages] =
  useState<CopilotMessage[]>([
    COPILOT_WELCOME_MESSAGE,
  ]);

const [isCopilotHistoryLoaded, setIsCopilotHistoryLoaded] =
  useState(false);
  const [copiedMessageId, setCopiedMessageId] =
  useState<string | null>(null);
  const [isLiveMonitorOpen, setIsLiveMonitorOpen] =
  useState(false);

const [isLiveMonitoring, setIsLiveMonitoring] =
  useState(true);

const [liveActivities, setLiveActivities] =
  useState<any[]>([]);

const [isLiveMonitorLoading, setIsLiveMonitorLoading] =
  useState(false);

const [liveMonitorError, setLiveMonitorError] =
  useState("");

const [liveLastUpdated, setLiveLastUpdated] =
  useState<Date | null>(null);
  const [liveRefreshCountdown, setLiveRefreshCountdown] =
  useState(10);
  const copilotMessagesEndRef =
  useRef<HTMLDivElement | null>(null);
const activeComplaints = stats.pending + stats.inProgress;

const resolutionRate =
  stats.total > 0
    ? Math.round((stats.resolved / stats.total) * 100)
    : 0;

const criticalRate =
  stats.total > 0
    ? Math.round((stats.critical / stats.total) * 100)
    : 0;
    const projectedComplaints =
  stats.total > 0
    ? Math.ceil(stats.total * 1.08)
    : 0;
    const pendingRate =
  stats.total > 0
    ? Math.round((stats.pending / stats.total) * 100)
    : 0;

const systemHealth =
  stats.total > 0
    ? Math.max(0, 100 - pendingRate)
    : 100;
    const maxWeeklyCount = Math.max(
  ...weeklyData.map((item) => item.count),
  1
);
const exportCSV = async () => {
  try {
    const complaints = await getComplaints();

    const headers = [
      "Title",
      "Category",
      "Location",
      "Priority",
      "Status",
    ];

    const rows = complaints.map((complaint: any) => [
  `"${complaint.title}"`,
  `"${complaint.category}"`,
  `"${complaint.location}"`,
  `"${complaint.priority}"`,
  `"${complaint.status}"`,
]);
    const csvContent = [
      headers.join(","),
      ...rows.map((row: any) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "complaints.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  } catch (error) {
  console.error(error);

  toast.error("Unable to export CSV");
}
};
const exportPDF = async () => {
  try {
    const complaints = await getComplaints();

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("CivicAI Complaint Report", 14, 20);

    doc.setFontSize(11);
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      14,
      30
    );
doc.setFontSize(12);

doc.text(
  `Total Complaints : ${complaints.length}`,
  14,
  38
);

doc.text(
  `Generated By : CivicAI Dashboard`,
  120,
  38
);
const resolved = complaints.filter(
  (c: any) => c.status === "Resolved"
).length;

const pending = complaints.filter(
  (c: any) => c.status === "Pending"
).length;

const critical = complaints.filter(
  (c: any) => c.priority === "High"
).length;

doc.text(`Resolved : ${resolved}`, 14, 46);
doc.text(`Pending : ${pending}`, 70, 46);
doc.text(`Critical : ${critical}`, 120, 46);
    autoTable(doc, {
  startY: 56,

  head: [["Title", "Category", "Location", "Priority", "Status"]],

  body: complaints.map((complaint: any) => [
    complaint.title,
    complaint.category,
    complaint.location,
    complaint.priority,
    complaint.status,
  ]),

  theme: "striped",

  headStyles: {
    fillColor: [14, 165, 233], // Cyan
    textColor: 255,
    fontStyle: "bold",
    halign: "center",
  },

  bodyStyles: {
    halign: "center",
  },

  alternateRowStyles: {
    fillColor: [245, 245, 245],
  },

  styles: {
    fontSize: 10,
    cellPadding: 3,
  },
});
doc.setFontSize(10);

doc.text(
  "Generated by CivicAI Dashboard",
  14,
  doc.internal.pageSize.height - 10
);
    doc.save("complaints-report.pdf");
  } catch (error) {
    console.error(error);
  }
};
const [currentUser, setCurrentUser] = useState<any>(null);

const [loading, setLoading] = useState(true);
const greeting =
  new Date().getHours() < 12
    ? "Good Morning"
    : new Date().getHours() < 17
    ? "Good Afternoon"
    : "Good Evening";
const [showLogoutDialog, setShowLogoutDialog] = useState(false);


const confirmLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("civicai-copilot-messages");

  setShowLogoutDialog(false);

  router.replace("/login");
};
const handleAIAnalysis = async () => {
  try {
    setIsAnalyzing(true);
    setAiError("");

    const result = await analyzeComplaintsWithAI();

setAiAnalysis(result);
setAnalysisGeneratedAt(new Date());
setIsAnalysisOpen(true);
  } catch (error) {
    console.error("AI Analysis Error:", error);

    setAiError(
      "AI analysis could not be generated. Please try again."
    );
    toast.error("AI Analysis failed");
  } finally {
    setIsAnalyzing(false);
  }
};
const handleSendCopilotMessage = async (
  customMessage?: string
) => {
  const messageToSend = (
    customMessage ?? copilotInput
  ).trim();

  if (!messageToSend || isCopilotTyping) {
    return;
  }

  const userMessage: CopilotMessage = {
  id: `user-${Date.now()}`,
  role: "user",
  content: messageToSend,
  timestamp: new Date().toISOString(),
};

  const previousMessages = copilotMessages;

  setCopilotMessages((prev) => [
    ...prev,
    userMessage,
  ]);

  setCopilotInput("");
  setCopilotError("");
  setIsCopilotTyping(true);

  try {
    const history: ChatHistoryItem[] =
      previousMessages
        .filter(
          (message) =>
            message.id !== "welcome-message"
        )
        .map((message) => ({
          role: message.role,
          content: message.content,
        }));

    const result = await sendChatMessage(
      messageToSend,
      history
    );

    const assistantMessage: CopilotMessage = {
  id: `assistant-${Date.now()}`,
  role: "assistant",
  content: result.reply,
  timestamp: new Date().toISOString(),
};
    setCopilotMessages((prev) => [
      ...prev,
      assistantMessage,
    ]);
  } catch (error) {
    console.error(
      "CivicAI Copilot Error:",
      error
    );

    setCopilotError(
      "CivicAI Copilot could not respond. Please try again."
    );
    toast.error("Unable to contact AI Copilot");
  } finally {
    setIsCopilotTyping(false);
  }
};
const handleCopyCopilotMessage = async (
  messageId: string,
  content: string
) => {
  try {
    await navigator.clipboard.writeText(content);

    setCopiedMessageId(messageId);

    window.setTimeout(() => {
      setCopiedMessageId((currentId) =>
        currentId === messageId ? null : currentId
      );
    }, 1800);
  } catch (error) {
    console.error(
      "Failed to copy Copilot message:",
      error
    );

    setCopilotError(
      "Could not copy the response."
    );
  }
};
const fetchLiveMonitorData = async (
  showLoading = false
) => {
  try {
    if (showLoading) {
      setIsLiveMonitorLoading(true);
    }

    setLiveMonitorError("");

    const data = await getRecentActivity();

    const normalizedActivities = Array.isArray(data)
      ? data
      : Array.isArray(data?.activities)
      ? data.activities
      : [];

    setLiveActivities(normalizedActivities);
    setLiveLastUpdated(new Date());
  } catch (error) {
    console.error(
      "Live Monitor Error:",
      error
    );

    setLiveMonitorError(
      "Could not refresh live civic activity."
    );
  } finally {
    if (showLoading) {
      setIsLiveMonitorLoading(false);
    }
  }
};

useEffect(() => {
  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);

      setLoading(false);

      const complaints = await getComplaints();

setActivities(complaints.slice(0, 6));

const dayCounts = [
  { day: "Mon", count: 0 },
  { day: "Tue", count: 0 },
  { day: "Wed", count: 0 },
  { day: "Thu", count: 0 },
  { day: "Fri", count: 0 },
  { day: "Sat", count: 0 },
  { day: "Sun", count: 0 },
];

const now = new Date();

const currentDay = now.getDay();

const daysSinceMonday =
  currentDay === 0 ? 6 : currentDay - 1;

const startOfWeek = new Date(now);

startOfWeek.setDate(
  now.getDate() - daysSinceMonday
);

startOfWeek.setHours(0, 0, 0, 0);

const endOfWeek = new Date(startOfWeek);

endOfWeek.setDate(
  startOfWeek.getDate() + 7
);
const startOfPreviousWeek = new Date(startOfWeek);

startOfPreviousWeek.setDate(
  startOfWeek.getDate() - 7
);

const endOfPreviousWeek = new Date(startOfWeek);

const currentWeekComplaints = complaints.filter(
  (complaint: any) => {
    const date = new Date(complaint.createdAt);

    return (
      date >= startOfWeek &&
      date < endOfWeek
    );
  }
);

const previousWeekComplaints = complaints.filter(
  (complaint: any) => {
    const date = new Date(complaint.createdAt);

    return (
      date >= startOfPreviousWeek &&
      date < endOfPreviousWeek
    );
  }
);

const currentWeekResolved =
  currentWeekComplaints.filter(
    (complaint: any) =>
      complaint.status === "Resolved"
  ).length;

const previousWeekResolved =
  previousWeekComplaints.filter(
    (complaint: any) =>
      complaint.status === "Resolved"
  ).length;

const calculateGrowth = (
  current: number,
  previous: number
) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return Math.round(
    ((current - previous) / previous) * 100
  );
};

setWeeklyGrowth(
  calculateGrowth(
    currentWeekComplaints.length,
    previousWeekComplaints.length
  )
);

setResolvedGrowth(
  calculateGrowth(
    currentWeekResolved,
    previousWeekResolved
  )
);
complaints.forEach((complaint: any) => {
  const date = new Date(complaint.createdAt);

  if (
    date >= startOfWeek &&
    date < endOfWeek
  ) {
    const jsDay = date.getDay();

    const mondayIndex =
      jsDay === 0 ? 6 : jsDay - 1;

    dayCounts[mondayIndex].count += 1;
  }
});

setWeeklyData(dayCounts);
const activeItems = complaints.filter(
  (complaint: any) =>
    complaint.status !== "Resolved"
);

const highPriorityItems = activeItems.filter(
  (complaint: any) =>
    complaint.priority === "High"
);

const categoryCounts: Record<string, number> = {};

highPriorityItems.forEach((complaint: any) => {
  const category = complaint.category || "Other";

  categoryCounts[category] =
    (categoryCounts[category] || 0) + 1;
});

const topRiskCategory = Object.entries(categoryCounts)
  .sort((a, b) => b[1] - a[1])[0];

if (highPriorityItems.length >= 3 && topRiskCategory) {
  setRecommendation({
    title: "Immediate Priority Dispatch Suggested",
    message: `${topRiskCategory[0]} currently has ${topRiskCategory[1]} high-priority active complaint(s). Immediate field-team review is recommended.`,
    level: "High",
  });
} else if (activeItems.length >= 3) {
  setRecommendation({
    title: "Active Workload Requires Attention",
    message: `${activeItems.length} complaints are currently active. Review pending and in-progress cases to reduce operational backlog.`,
    level: "Medium",
  });
} else {
  setRecommendation({
    title: "Civic Operations Stable",
    message: `Current active workload is ${activeItems.length} complaint(s). No major escalation pattern is detected from the available complaint data.`,
    level: "Low",
  });
}
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
      toast.error("Failed to load dashboard");
      setLoading(false);
    }
  };

  fetchStats();
  const storedUser = localStorage.getItem("user");

if (storedUser) {
  setCurrentUser(JSON.parse(storedUser));
}
}, []);
useEffect(() => {
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
  setIsAnalysisOpen(false);
  setIsCopilotOpen(false);
  setIsLiveMonitorOpen(false);
}
  };

  window.addEventListener("keydown", handleEscapeKey);

  return () => {
    window.removeEventListener("keydown", handleEscapeKey);
  };
}, []);
useEffect(() => {
  if (!isCopilotOpen) return;

  copilotMessagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [
  copilotMessages,
  isCopilotTyping,
  isCopilotOpen,
]);
useEffect(() => {
  try {
    const savedMessages = localStorage.getItem(
      COPILOT_STORAGE_KEY
    );

    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);

      if (
        Array.isArray(parsedMessages) &&
        parsedMessages.length > 0
      ) {
        const validMessages = parsedMessages.filter(
          (message): message is CopilotMessage =>
            message &&
            typeof message.id === "string" &&
            (message.role === "user" ||
              message.role === "assistant") &&
            typeof message.content === "string"
        );

        if (validMessages.length > 0) {
          setCopilotMessages(validMessages);
        }
      }
    }
  } catch (error) {
    console.error(
      "Failed to load Copilot history:",
      error
    );

    localStorage.removeItem(
      COPILOT_STORAGE_KEY
    );
  } finally {
    setIsCopilotHistoryLoaded(true);
  }
}, []);

useEffect(() => {
  if (!isCopilotHistoryLoaded) return;

  try {
    localStorage.setItem(
      COPILOT_STORAGE_KEY,
      JSON.stringify(copilotMessages.slice(-30))
    );
  } catch (error) {
    console.error(
      "Failed to save Copilot history:",
      error
    );
  }
}, [
  copilotMessages,
  isCopilotHistoryLoaded,
]);
useEffect(() => {
  if (!isLiveMonitorOpen) return;

  fetchLiveMonitorData(true);
}, [isLiveMonitorOpen]);

useEffect(() => {
  if (
    !isLiveMonitorOpen ||
    !isLiveMonitoring
  ) {
    return;
  }

  setLiveRefreshCountdown(10);

  const countdownId = window.setInterval(() => {
    setLiveRefreshCountdown((current) => {
      if (current <= 1) {
        fetchLiveMonitorData(false);
        return 10;
      }

      return current - 1;
    });
  }, 1000);

  return () => {
    window.clearInterval(countdownId);
  };
}, [
  isLiveMonitorOpen,
  isLiveMonitoring,
]);
  return (
    <main className="min-h-screen bg-[#020617] relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-[1700px] gap-6 px-4 py-6 lg:px-8">
        <aside className="hidden xl:block w-72 shrink-0">
  <div className="sticky top-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">

    <h2 className="text-lg font-bold text-white">
      CivicAI
    </h2>

    <div className="mt-8 space-y-2">

      <div className="group flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-4 text-cyan-400 transition-all duration-300 hover:translate-x-1 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] shadow-[0_0_20px_rgba(6,182,212,0.15)]">
  <LayoutDashboard size={18} />
  <span>Dashboard</span>
</div>

      <Link
  href="/complaints"
  className="group flex items-center gap-3 rounded-2xl px-4 py-4 text-slate-400 transition-all duration-300 hover:translate-x-2 hover:bg-slate-800/60 hover:text-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]"
>
  <FileText
    size={18}
    className="transition-all duration-300 group-hover:text-cyan-400"
  />
  <span>Complaints</span>
</Link>

     <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition-all duration-300 hover:bg-slate-800/50 hover:text-white cursor-pointer">
  <Link
  href="/analytics"
  className="group flex items-center gap-3 rounded-2xl px-4 py-4 text-slate-400 transition-all duration-300 hover:translate-x-2 hover:bg-slate-800/60 hover:text-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]"
>
  <BarChart3
  size={18}
  className="transition-all duration-300 group-hover:text-cyan-400"
/>
  <span>Analytics</span>
</Link>
</div>

      <Link
  href="/ai-insights"
  className="group flex items-center gap-3 rounded-2xl px-4 py-4 text-slate-400 transition-all duration-300 hover:translate-x-1 hover:bg-slate-800/60 hover:text-white"
>
  <Sparkles size={18} />
  <span>AI Insights</span>
</Link>

      <Link
  href="/settings"
  className="group flex items-center gap-3 rounded-2xl px-4 py-4 text-slate-400 transition-all duration-300 hover:translate-x-1 hover:bg-slate-800/60 hover:text-white"
>
  <Settings size={18} />
  <span>Settings</span>
</Link>
<div className="mt-8 rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-4">

  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
    System Status
  </p>

  <div className="mt-4 flex items-center gap-2">
    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>

    <span className="text-sm text-white">
      Online
    </span>
  </div>

  <div className="mt-5">

    <div className="mb-2 flex justify-between text-xs text-slate-400">
      <span>Storage</span>
      <span>78%</span>
    </div>

    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
      <div className="h-full w-[78%] rounded-full bg-cyan-400"></div>
    </div>

  </div>

  <div className="mt-5">

    <div className="mb-2 flex justify-between text-xs text-slate-400">
      <span>AI Engine</span>
      <span>94%</span>
    </div>

    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
      <div className="h-full w-[94%] rounded-full bg-emerald-400"></div>
    </div>

  </div>

  <div className="mt-5 rounded-xl bg-slate-950/60 p-3">

    <p className="text-xs text-slate-500">
      Active Complaints
    </p>

    <h3 className="mt-2 text-2xl font-bold text-cyan-400">
  <CountUp end={activeComplaints} duration={2} separator="," />
</h3>

  </div>

</div>

    </div>
  </div>
</aside>
<div className="flex-1">
        <header className="sticky top-4 z-30 flex items-center justify-between rounded-3xl border border-slate-800/80 bg-slate-900/70 px-5 py-4 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <div>
            <h1 className="text-xl font-bold text-white">
  {greeting},{" "}
  {currentUser?.name?.split(" ")[0] || "Admin"} 👋
</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">

  <button
    className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/60 transition-all duration-300 hover:border-cyan-400 hover:bg-slate-800"
  >
    🔔

    <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
  </button>

  <div
    className="invisible absolute right-0 mt-3 w-80 rounded-2xl border border-slate-700 bg-slate-900 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100"
  >
    <div className="border-b border-slate-800 p-4">
      <h3 className="font-semibold text-white">
        Notifications
      </h3>

      <p className="text-xs text-slate-400">
        Latest complaint activity
      </p>
    </div>

    <div className="space-y-1 p-2">

  {latestNotifications.length === 0 ? (

    <div className="rounded-xl p-4 text-center text-slate-400">
      No recent notifications
    </div>

  ) : (

    latestNotifications.map((item) => (

      <div
        key={item._id}
        className="rounded-xl p-3 transition hover:bg-slate-800"
      >
        <p className="line-clamp-1 text-sm font-medium text-white">
          {item.title}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {item.status} • {item.priority || "Normal"} Priority
        </p>

        <span className="mt-1 block text-xs text-slate-500">
          {new Date(item.createdAt).toLocaleString()}
        </span>

      </div>

    ))

  )}

</div>
    <div className="border-t border-slate-800 p-3">
      <button
        className="w-full rounded-xl bg-cyan-500 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
      >
        View All
      </button>
    </div>

  </div>

</div>
            <div className="relative group">

  <button
    className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 px-3 py-2 transition hover:border-cyan-400 hover:bg-slate-800"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
     {currentUser?.name?.charAt(0).toUpperCase() || "G"}
    </div>

    <div className="text-left">
      <p className="text-sm font-semibold text-white">
        {currentUser?.name || "Guest"}
      </p>

      <p className="text-xs text-slate-400">
       {currentUser?.email || "Not Logged In"}
      </p>
    </div>

    <span className="text-slate-400">
      ▼
    </span>
  </button>

  <div
    className="invisible absolute right-0 mt-2 w-56 rounded-2xl border border-slate-700 bg-slate-900 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100"
  >
    <button
      className="block w-full px-5 py-3 text-left text-white hover:bg-slate-800"
    >
      👤 My Profile
    </button>

    <button
      className="block w-full px-5 py-3 text-left text-white hover:bg-slate-800"
    >
      ⚙ Settings
    </button>

    <hr className="border-slate-700" />

    <button
      onClick={() => setShowLogoutDialog(true)}
      className="block w-full px-5 py-3 text-left text-red-400 hover:bg-red-500/10"
    >
      Logout
    </button>
  </div>

</div>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 mb-10"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
  Real-Time AI Powered Civic Operations
</p>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl xl:text-7xl">
            Smart Civic Complaint Management
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
  AI-powered monitoring, intelligent prioritization and real-time resolution
  tracking for smarter city operations. Built to help administrators monitor,
  analyze and resolve civic complaints efficiently.
</p>
          <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">

  <Link
  href="/create-complaint"
  className="cursor-pointer rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition-all duration-200 hover:scale-105 hover:bg-cyan-400"
>
  + New Complaint
</Link>

<button
  onClick={exportCSV}
  className="cursor-pointer rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-500/15 hover:shadow-[0_10px_30px_rgba(34,211,238,0.12)]"
>
  📊 Export Report
</button>

<button
  onClick={exportPDF}
  className="cursor-pointer rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-500/15 hover:shadow-[0_10px_30px_rgba(167,139,250,0.12)]"
>
  📄 Export PDF
</button>

<button
  onClick={handleAIAnalysis}
  disabled={isAnalyzing}
  className="cursor-pointer rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-fuchsia-400 hover:bg-fuchsia-500/15 hover:shadow-[0_10px_30px_rgba(232,121,249,0.12)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
>
  {isAnalyzing
    ? "🧠 Analyzing Complaints..."
    : "🤖 AI Analysis"}
</button>

<button
  onClick={() => setIsLiveMonitorOpen(true)}
  className="cursor-pointer rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-500/15 hover:shadow-[0_10px_30px_rgba(52,211,153,0.12)]"
>
  ⚡ Live Monitor
</button>

</section>
{aiError && (
  <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="font-semibold text-red-400">
        AI Analysis Failed
      </p>

      <p className="mt-1 text-sm text-red-300/80">
        {aiError}
      </p>
    </div>

    <button
      onClick={handleAIAnalysis}
      disabled={isAnalyzing}
      className="cursor-pointer rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-500/15 hover:shadow-[0_10px_30px_rgba(52,211,153,0.12)]"
    >
      {isAnalyzing ? "Retrying..." : "Retry Analysis"}
    </button>
  </div>
)}
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.25)]"
  >
    <div className="flex items-center justify-between">
  <p className="text-sm text-slate-400">
    Total Complaints
  </p>

  <Activity size={20} className="text-cyan-400" />
</div>

    <h2 className="mt-3 text-5xl font-black tracking-tight text-white">
  <CountUp end={stats.total} duration={2} separator="," />
</h2>

    <p
  className={`mt-2 text-sm ${
    weeklyGrowth > 0
      ? "text-green-400"
      : weeklyGrowth < 0
      ? "text-red-400"
      : "text-slate-400"
  }`}
>
  {weeklyGrowth > 0 ? "+" : ""}
  {weeklyGrowth}% vs previous week
</p>
  </motion.div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-slate-700 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
    <div className="flex items-center justify-between">
  <p className="text-sm text-slate-400">
    Resolved Issues
  </p>

  <CheckCircle size={20} className="text-emerald-400" />
</div>

    <h2 className="mt-3 text-5xl font-black tracking-tight text-white">
  <CountUp end={stats.resolved} duration={2} />
</h2>

    <p
  className={`mt-2 text-sm ${
    resolvedGrowth > 0
      ? "text-emerald-400"
      : resolvedGrowth < 0
      ? "text-red-400"
      : "text-slate-400"
  }`}
>
  {resolvedGrowth > 0 ? "+" : ""}
  {resolvedGrowth}% vs previous week
</p>
  </div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-slate-700 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
    <div className="flex items-center justify-between">
  <p className="text-sm text-slate-400">
    Critical Alerts
  </p>

  <AlertTriangle size={20} className="text-orange-400" />
</div>

    <h2 className="mt-3 text-5xl font-black tracking-tight text-white">
  <CountUp end={stats.critical} duration={2} />
</h2>

    <p className="mt-2 text-sm text-orange-400">
      Needs attention
    </p>
  </div>

</div>

 <section className="mt-12">
  <div className="mb-6">
  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
    Live Monitoring
  </p>

  <h2 className="mt-2 text-3xl font-bold text-white">
    Recent Civic Complaints
  </h2>
</div>

  <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

    {activities.map((activity: any, index: number) => (
  <motion.div
    key={activity._id}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    onClick={() => setSelectedComplaint(activity)}
    className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]"
  >
    
    <div className="flex items-center justify-between">

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          activity.priority === "High"
            ? "bg-red-500/20 text-red-400"
            : activity.priority === "Medium"
            ? "bg-orange-500/20 text-orange-400"
            : "bg-emerald-500/20 text-emerald-400"
        }`}
      >
        {activity.priority || "Normal"}
      </span>

      <span className="text-xs text-slate-500">
        {new Date(activity.createdAt).toLocaleDateString()}
      </span>

    </div>

    <h3 className="mt-5 text-xl font-bold text-white">
      {activity.title}
    </h3>

    <div className="mt-4 flex items-center justify-between">

      <span
        className={`rounded-full px-3 py-1 text-xs ${
          activity.status === "Resolved"
            ? "bg-emerald-500/20 text-emerald-400"
            : activity.status === "Pending"
            ? "bg-yellow-500/20 text-yellow-400"
            : "bg-cyan-500/20 text-cyan-400"
        }`}
      >
        {activity.status}
      </span>

      <span className="text-sm text-slate-400">
        Civic Complaint
      </span>

    </div>
  </motion.div>
))}

  </div>
</section>



<section className="mt-12">
  <div className="flex items-center gap-3">
  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
    AI POWERED
  </span>

  <h2 className="text-3xl font-bold text-white">
    AI Insights Panel
  </h2>
</div>

    <div className="mt-6 grid gap-6 md:grid-cols-3">

    {/* System Health */}
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="group rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-6
                 transition-all duration-300
                 hover:border-cyan-400/70
                 hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]"
    >
      <div className="flex items-center gap-2 text-slate-400 group-hover:text-cyan-300">
        <Brain size={18} className="text-cyan-400" />
        <p>System Health</p>
      </div>

      <h3 className="mt-3 text-5xl font-black tracking-tight text-cyan-400">
        <CountUp end={systemHealth} duration={2} />%
      </h3>
    </motion.div>

    {/* Active Complaints */}
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="group rounded-3xl border border-emerald-500/20 bg-slate-900/60 p-6
                 transition-all duration-300
                 hover:border-emerald-400/70
                 hover:shadow-[0_0_35px_rgba(52,211,153,0.18)]"
    >
      <div className="flex items-center gap-2 text-slate-400 group-hover:text-emerald-300">
        <Clock3 size={18} className="text-emerald-400" />
        <p>Active Complaints</p>
      </div>

      <h3 className="mt-3 text-5xl font-black tracking-tight text-emerald-400">
        <CountUp end={activeComplaints} duration={2} />
      </h3>
    </motion.div>

    {/* Risk Level */}
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="group rounded-3xl border border-orange-500/20 bg-slate-900/60 p-6
                 transition-all duration-300
                 hover:border-orange-400/70
                 hover:shadow-[0_0_35px_rgba(251,146,60,0.18)]"
    >
      <div className="flex items-center gap-2 text-slate-400 group-hover:text-orange-300">
        <ShieldCheck size={18} className="text-orange-400" />
        <p>Risk Level</p>
      </div>

      <h3 className="mt-3 text-5xl font-black tracking-tight text-orange-400">
        {criticalRate >= 50
          ? "High"
          : criticalRate >= 20
          ? "Medium"
          : "Low"}
      </h3>
    </motion.div>

  </div>
</section>
<section className="mt-12">
  <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-6 backdrop-blur-xl">

    <div className="flex items-center gap-3">
      <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />

      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
  Smart Recommendation · {recommendation.level} Priority
</p>
    </div>

    <h3 className="mt-4 text-2xl font-bold text-white">
  {recommendation.title}
</h3>

<p className="mt-3 max-w-3xl text-slate-300">
  {recommendation.message}
</p>

  </div>
</section>
 <section className="mt-12">
  <div className="mb-6">
    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
      Analytics
    </p>

    <h2 className="mt-2 text-3xl font-bold text-white">
  Current Week Complaint Trend
</h2>
  </div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
  <div className="flex h-64 items-end justify-between gap-4">

    {weeklyData.map((item, index) => {
      const height =
        item.count === 0
          ? 8
          : Math.max(
              20,
              (item.count / maxWeeklyCount) * 220
            );

      return (
        <motion.div
          key={item.day}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.08,
          }}
          className="group flex flex-1 flex-col items-center gap-2"
        >
          <span className="text-sm font-semibold text-cyan-400">
            {item.count}
          </span>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height }}
            transition={{
              duration: 0.8,
              delay: index * 0.08,
            }}
            className="w-full max-w-12 rounded-t-xl bg-cyan-500
                       transition-all duration-300
                       group-hover:bg-cyan-400
                       group-hover:shadow-[0_0_25px_rgba(34,211,238,0.45)]"
          />

          <span className="text-xs text-slate-400">
            {item.day}
          </span>
        </motion.div>
      );
    })}

  </div>
</div>
</section>
<section className="mt-12 grid gap-6 md:grid-cols-3">

  <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-6 transition hover:scale-[1.02] hover:border-cyan-300 hover:shadow-[0_0_60px_rgba(6,182,212,0.35)]">

    <p className="text-sm text-slate-400">
      Tomorrow Prediction
    </p>

    <h2 className="mt-4 text-5xl font-bold text-cyan-400">
  <CountUp end={projectedComplaints} duration={2} />
</h2>

    <p className="mt-3 text-slate-400">
      Projected volume using current complaint trend
    </p>

  </div>

  <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/60 p-6 transition hover:scale-[1.02] hover:border-emerald-400">

    <p className="text-sm text-slate-400">
      Resolution Rate
    </p>

    <h2 className="mt-4 text-5xl font-bold text-emerald-400">
  <CountUp end={resolutionRate} duration={2} />%
</h2>

    <p className="mt-3 text-slate-400">
      Based on resolved complaints
    </p>

  </div>

  <div className="rounded-3xl border border-orange-500/20 bg-slate-900/60 p-6 transition hover:scale-[1.02] hover:border-orange-400">

    <p className="text-sm text-slate-400">
      High Risk Areas
    </p>

    <h2 className="mt-4 text-5xl font-bold text-orange-400">
  <CountUp end={stats.critical} duration={2} />
</h2>

    <p className="mt-3 text-slate-400">
      High-priority complaints requiring attention
    </p>

  </div>

</section>

      </div>
      </div>
      {isAnalyzing && (
  <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-slate-950 p-8 text-center shadow-[0_0_80px_rgba(34,211,238,0.18)]"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="mx-auto h-16 w-16 rounded-full border-4 border-slate-800 border-t-cyan-400"
      />

      <h3 className="mt-6 text-2xl font-bold text-white">
        Analyzing Civic Data
      </h3>

      <p className="mt-3 leading-7 text-slate-400">
        Gemini AI is reviewing complaint patterns,
        priorities and operational risks.
      </p>

      <div className="mt-6 flex items-center justify-center gap-2">
        {[0, 1, 2].map((item) => (
          <motion.span
            key={item}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: item * 0.2,
            }}
            className="h-2 w-2 rounded-full bg-cyan-400"
          />
        ))}
      </div>
    </motion.div>
  </div>
)}
      {isAnalysisOpen && aiAnalysis && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
    onClick={() => setIsAnalysisOpen(false)}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.stopPropagation()}
      className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-cyan-500/20 bg-slate-950 p-6 shadow-[0_0_60px_rgba(34,211,238,0.15)] md:p-8"
    >
      {/* Modal Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Smart Analysis
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Civic Intelligence Report
          </h2>

          <p className="mt-2 text-slate-400">
            Real-time analysis based on current complaint data.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <div className="flex items-center gap-2 text-sm text-slate-500">
    <Clock3 size={16} className="text-cyan-400" />

    <span>
      Generated:{" "}
      {analysisGeneratedAt
        ? analysisGeneratedAt.toLocaleString()
        : "Just now"}
    </span>
  </div>

  <button
    onClick={handleAIAnalysis}
    disabled={isAnalyzing}
    className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400 transition hover:border-cyan-400 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {isAnalyzing ? "Regenerating..." : "↻ Regenerate Analysis"}
  </button>
</div>
          <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
    Gemini AI Summary
  </p>

  <p className="mt-3 leading-7 text-slate-300">
    {aiAnalysis.summary}
  </p>
  <div className="mt-4 flex items-center gap-3">
  <span className="text-sm text-slate-400">
    AI Risk Level:
  </span>

  <span
    className={`rounded-full px-4 py-2 text-sm font-bold ${
      aiAnalysis.riskLevel === "High"
        ? "bg-red-500/15 text-red-400"
        : aiAnalysis.riskLevel === "Medium"
        ? "bg-orange-500/15 text-orange-400"
        : "bg-emerald-500/15 text-emerald-400"
    }`}
  >
    {aiAnalysis.riskLevel}
  </span>
</div>
</div>
        </div>

        <button
          onClick={() => setIsAnalysisOpen(false)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-400"
        >
          ✕
        </button>
      </div>
<div className="mt-8">
  <h3 className="text-xl font-bold text-white">
    Top Issues Identified
  </h3>

  <div className="mt-4 grid gap-3 sm:grid-cols-2">
    {aiAnalysis.topIssues.map((issue, index) => (
      <div
        key={`${issue}-${index}`}
        className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-sm font-bold text-orange-400">
            {index + 1}
          </span>

          <p className="leading-6 text-slate-300">
            {issue}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
<div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
  <h3 className="text-xl font-bold text-white">
    Key Findings
  </h3>

  <div className="mt-4 space-y-3">
    {aiAnalysis.keyFindings.map((finding, index) => (
      <div
        key={`${finding}-${index}`}
        className="flex items-start gap-3"
      >
        <span className="mt-1 text-violet-400">
          ✦
        </span>

        <p className="leading-7 text-slate-300">
          {finding}
        </p>
      </div>
    ))}
  </div>
</div>
      

      
<div className="mt-8">
  <div className="flex items-center gap-3">
    <span className="text-2xl">⚡</span>

    <h3 className="text-xl font-bold text-white">
      Recommended Actions
    </h3>
  </div>

  <div className="mt-4 space-y-3">
    {aiAnalysis.recommendedActions.map((action, index) => (
      <div
        key={`${action}-${index}`}
        className="group flex items-start gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 transition hover:border-emerald-400/50"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400">
          {index + 1}
        </span>

        <p className="leading-7 text-slate-300">
          {action}
        </p>
      </div>
    ))}
  </div>
</div>
      {/* Footer */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setIsAnalysisOpen(false)}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Close Analysis
        </button>
      </div>
    </motion.div>
  </div>
)}
     {selectedComplaint && (
  <ComplaintModal
    complaint={selectedComplaint}
    onClose={() => setSelectedComplaint(null)}

    onUpdated={(updatedComplaint) => {
      setActivities((prev) =>
        prev.map((activity) =>
          activity._id === updatedComplaint._id
            ? updatedComplaint
            : activity
        )
      );

      setSelectedComplaint(updatedComplaint);
    }}

    onDeleted={(deletedId) => {
      setActivities((prev) =>
        prev.filter(
          (activity) => activity._id !== deletedId
        )
      );

      setSelectedComplaint(null);

      setStats((prev) => ({
        ...prev,
        total: Math.max(0, prev.total - 1),
      }));
    }}
  />
)}
{isLiveMonitorOpen && (
  <div
    className="fixed inset-0 z-[130] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
    onClick={() => setIsLiveMonitorOpen(false)}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.stopPropagation()}
      className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-950 shadow-[0_0_90px_rgba(16,185,129,0.14)]"
    >
      {/* Header */}
      <div className="border-b border-slate-800 bg-gradient-to-r from-emerald-500/10 via-slate-950 to-cyan-500/10 p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-white">
                Live Operations Center
              </h2>

              <span
                className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                  isLiveMonitoring
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-yellow-500/15 text-yellow-400"
                }`}
              >
                <motion.span
                  animate={
                    isLiveMonitoring
                      ? { opacity: [0.35, 1, 0.35] }
                      : { opacity: 1 }
                  }
                  transition={{
                    duration: 1.2,
                    repeat: isLiveMonitoring
                      ? Infinity
                      : 0,
                  }}
                  className={`h-2 w-2 rounded-full ${
                    isLiveMonitoring
                      ? "bg-emerald-400"
                      : "bg-yellow-400"
                  }`}
                />

                {isLiveMonitoring ? "LIVE" : "PAUSED"}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Civic activity refreshes automatically every 10 seconds.
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Last updated:{" "}
              {liveLastUpdated
                ? liveLastUpdated.toLocaleTimeString()
                : "Waiting for first update..."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
  if (!isLiveMonitoring) {
    fetchLiveMonitorData(false);
  }

  setIsLiveMonitoring((prev) => !prev);
}}
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-yellow-400 hover:text-yellow-300"
            >
              {isLiveMonitoring
                ? "⏸ Pause"
                : "▶ Resume"}
            </button>

            <button
              onClick={() =>
                fetchLiveMonitorData(true)
              }
              disabled={isLiveMonitorLoading}
              className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400 transition hover:border-cyan-400 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLiveMonitorLoading
                ? "Refreshing..."
                : "↻ Refresh"}
            </button>

            <button
              onClick={() =>
                setIsLiveMonitorOpen(false)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-400"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
      Recent Activity
    </p>

    <p className="mt-2 text-3xl font-bold text-cyan-400">
      {liveActivities.length}
    </p>
  </div>

  <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
      High Priority
    </p>

    <p className="mt-2 text-3xl font-bold text-red-400">
      {
        liveActivities.filter(
          (activity: any) =>
            activity.priority === "High"
        ).length
      }
    </p>
  </div>

  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
      Next Refresh
    </p>

    <p className="mt-2 text-3xl font-bold text-emerald-400">
      {isLiveMonitoring
        ? `${liveRefreshCountdown}s`
        : "Paused"}
    </p>
  </div>
</div>
        {liveMonitorError && (
          <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-red-300">
              {liveMonitorError}
            </p>

            <button
              onClick={() =>
                fetchLiveMonitorData(true)
              }
              className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-400"
            >
              Retry
            </button>
          </div>
        )}

        {isLiveMonitorLoading &&
        liveActivities.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="h-14 w-14 rounded-full border-4 border-slate-800 border-t-emerald-400"
            />

            <p className="mt-5 text-slate-400">
              Loading live civic activity...
            </p>
          </div>
        ) : liveActivities.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-3xl">
              📡
            </div>

            <h3 className="mt-5 text-xl font-bold text-white">
              No Recent Activity
            </h3>

            <p className="mt-2 max-w-md text-slate-400">
              The monitor is connected, but no recent civic
              activity is available right now.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {liveActivities.map(
              (activity: any, index: number) => (
                <motion.div
                  key={
                    activity._id ??
                    `live-activity-${index}`
                  }
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-emerald-500/30"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                          {activity.category ??
                            "Civic Activity"}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            activity.status === "Resolved"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : activity.status ===
                                "In Progress"
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {activity.status ?? "Updated"}
                        </span>

                        {activity.priority && (
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              activity.priority === "High"
                                ? "bg-red-500/10 text-red-400"
                                : activity.priority ===
                                  "Medium"
                                ? "bg-orange-500/10 text-orange-400"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {activity.priority} Priority
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 text-lg font-bold text-white">
                        {activity.title ??
                          "Civic activity update"}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                        {activity.description ??
                          "Complaint activity was updated."}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                        {activity.location && (
                          <span>
                            📍 {activity.location}
                          </span>
                        )}

                        {activity.createdAt && (
                          <span>
                            🕒{" "}
                            {new Date(
                              activity.createdAt
                            ).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="shrink-0 text-xs font-semibold text-emerald-400">
                      #{index + 1}
                    </span>
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 bg-slate-950/90 px-6 py-4">
        <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {liveActivities.length} recent activities loaded
          </span>

          <span>
            {isLiveMonitoring
              ? "Automatic monitoring active"
              : "Automatic monitoring paused"}
          </span>
        </div>
      </div>
    </motion.div>
  </div>
)}
{/* CivicAI Copilot */}
<div className="fixed bottom-6 right-6 z-[120]">
  {!isCopilotOpen && (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => setIsCopilotOpen(true)}
      className="group flex items-center gap-3 rounded-2xl border border-cyan-400/30 bg-slate-950/95 px-5 py-4 text-white shadow-[0_0_45px_rgba(34,211,238,0.22)] backdrop-blur-xl transition hover:border-cyan-400/70"
    >
      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl shadow-[0_0_25px_rgba(34,211,238,0.35)]">
        ✨

        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
      </span>

      <span className="text-left">
        <span className="block text-sm font-bold">
          Ask CivicAI
        </span>

        <span className="block text-xs text-slate-400">
          Multilingual AI Copilot
        </span>
      </span>
    </motion.button>
  )}
</div>

{isCopilotOpen && (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setIsCopilotOpen(false)}
      className="fixed inset-0 z-[121] bg-black/20 backdrop-blur-[2px] md:hidden"
    />

    <motion.aside
      initial={{ opacity: 0, x: 80, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-4 right-4 top-4 z-[122] flex w-[calc(100%-2rem)] flex-col overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-950/95 shadow-[0_0_80px_rgba(34,211,238,0.18)] backdrop-blur-2xl sm:w-[430px]"
    >
      {/* Copilot Header */}
      <div className="border-b border-slate-800 bg-gradient-to-r from-cyan-500/10 via-slate-950 to-blue-500/10 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl shadow-[0_0_25px_rgba(34,211,238,0.25)]">
              ✨

              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
            </div>

            <div>
              <h3 className="font-bold text-white">
                CivicAI Copilot
              </h3>

              <div className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs text-slate-400">
                  Online · Multilingual
                </span>
              </div>
            </div>
          </div>
<div className="flex items-center gap-2">
  <button
    onClick={() => {
  setCopilotMessages([
    COPILOT_WELCOME_MESSAGE,
  ]);

  setCopilotError("");
  setCopilotInput("");

  localStorage.removeItem(
    COPILOT_STORAGE_KEY
  );
}}
    disabled={isCopilotTyping}
    className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-400 transition hover:border-cyan-400 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
  >
    Clear
  </button>

  <button
    onClick={() => setIsCopilotOpen(false)}
    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-400"
  >
    ✕
  </button>
</div>
          
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {copilotMessages.map((message) => (
  <div
    key={message.id}
    className={`flex ${
      message.role === "user"
        ? "justify-end"
        : "justify-start"
    }`}
  >
    <div className="max-w-[85%]">
      <div
        className={`whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 ${
          message.role === "user"
            ? "rounded-br-md bg-cyan-500 text-slate-950"
            : "rounded-bl-md border border-slate-800 bg-slate-900 text-slate-200"
        }`}
      >
        {message.content}
      </div>

      <div
        className={`mt-1.5 flex items-center gap-2 px-1 ${
          message.role === "user"
            ? "justify-end"
            : "justify-start"
        }`}
      >
        {message.timestamp && (
          <span className="text-[10px] text-slate-600">
            {new Date(
              message.timestamp
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}

        {message.role === "assistant" &&
          message.id !== "welcome-message" && (
            <button
              onClick={() =>
                handleCopyCopilotMessage(
                  message.id,
                  message.content
                )
              }
              className="rounded-md px-2 py-1 text-[10px] font-semibold text-slate-500 transition hover:bg-slate-800 hover:text-cyan-300"
            >
              {copiedMessageId === message.id
                ? "Copied ✓"
                : "Copy"}
            </button>
          )}
      </div>
    </div>
  </div>
))}

        {isCopilotTyping && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md border border-slate-800 bg-slate-900 px-4 py-4">
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    animate={{
                      y: [0, -5, 0],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: dot * 0.15,
                    }}
                    className="h-2 w-2 rounded-full bg-cyan-400"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {copilotError && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm text-red-300">
              {copilotError}
            </p>
          </div>
        )}
        <div ref={copilotMessagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {copilotMessages.length === 1 && (
        <div className="border-t border-slate-800 px-5 py-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Suggested Questions
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              "How many complaints are pending?",
              "Sabse urgent issue konsa hai?",
              "आज की शिकायतों का सारांश बताओ",
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={() =>
                  handleSendCopilotMessage(prompt)
                }
                disabled={isCopilotTyping}
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-left text-xs text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-slate-800 bg-slate-950/90 p-4">
        <div className="flex items-end gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-2 transition focus-within:border-cyan-400/70">
          <textarea
            value={copilotInput}
            onChange={(e) =>
              setCopilotInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();
                handleSendCopilotMessage();
              }
            }}
            placeholder="Ask in English, Hindi or Hinglish..."
            rows={1}
            disabled={isCopilotTyping}
            className="max-h-28 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500 disabled:opacity-60"
          />

          <button
            onClick={() =>
              handleSendCopilotMessage()
            }
            disabled={
              !copilotInput.trim() ||
              isCopilotTyping
            }
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500 font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ➤
          </button>
        </div>

        <p className="mt-2 text-center text-[11px] text-slate-600">
          Enter to send · Shift + Enter for new line
        </p>
      </div>
    </motion.aside>
  </>
)}
<ConfirmDialog
  open={showLogoutDialog}
  title="Logout from CivicAI"
  message="Are you sure you want to logout? You will need to sign in again to access your dashboard."
  confirmText="Logout"
  cancelText="Stay"
  onCancel={() => setShowLogoutDialog(false)}
  onConfirm={confirmLogout}
/>
    </main>
    
  )
}