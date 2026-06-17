import {
  LayoutList,
  CalendarDays,
  CheckCircle2,
  Plus,
  CircleHelp,
  LogOut,
  X,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import GhostLogo from "./GhostLogo";
import Shuffle from "./Shuffle";

function Sidebar({ activeFilter, isOpen, onClose }) {
  const navigate = useNavigate();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          h-dvh
          w-64
          bg-[#f1f3ff]
          flex
          flex-col
          p-4
          gap-y-2
          shadow-sm
          z-55
          transform
          transition-transform
          duration-300
          ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >
        <div className="mb-8 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
              <GhostLogo size={32} />
            </div>

            <div>
              <Shuffle
                text="TaskVibe"
                tag="h3"
                colorFrom="#22d3ee"
                colorTo="#4338ca"
                shuffleDirection="right"
                duration={0.45}
                animationMode="evenodd"
                shuffleTimes={2}
                stagger={0.02}
                triggerOnce={true}
                triggerOnHover={true}
                loop={true}
                loopDelay={2}
                className="
    text-lg
    md:text-xl
    leading-tight
    tracking-wider
    font-normal
    pixel-logo
  "
              />

              <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wide">
                Productivity Feels Better
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-[#e1e8fd]"
          >
            <X size={22} />
          </button>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-indigo-800 transition-colors duration-150 mb-4 shadow-md">
          <Plus size={16} />
          New Project
        </button>

        <nav className="flex-1 flex flex-col gap-1">
          <SidebarItem
            icon={<LayoutList size={18} />}
            text="All Tasks"
            active={activeFilter === "all"}
            onClick={() => {
              navigate("/tasks/all");
              onClose?.();
            }}
          />

          <SidebarItem
            icon={<CalendarDays size={18} />}
            text="Today"
            active={activeFilter === "today"}
            onClick={() => {
              navigate("/tasks/today");
              onClose?.();
            }}
          />

          <SidebarItem
            icon={<CalendarDays size={18} />}
            text="Upcoming"
            active={activeFilter === "upcoming"}
            onClick={() => {
              navigate("/tasks/upcoming");
              onClose?.();
            }}
          />

          <SidebarItem
            icon={<CheckCircle2 size={18} />}
            text="Completed"
            active={activeFilter === "completed"}
            onClick={() => {
              navigate("/tasks/completed");
              onClose?.();
            }}
          />
        </nav>

        <div className="mt-auto flex flex-col gap-1">
          <SidebarItem icon={<CircleHelp size={18} />} text="Help Center" />
          <SidebarItem
            icon={<LogOut size={18} />}
            text="Log Out"
            onClick={logout}
          />
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ icon, text, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-150 text-sm font-medium ${
        active
          ? "bg-indigo-700 text-white shadow-md scale-[0.97] translate-x-0.5 opacity-90"
          : "text-gray-600 hover:bg-[#e1e8fd]"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}

export default Sidebar;
