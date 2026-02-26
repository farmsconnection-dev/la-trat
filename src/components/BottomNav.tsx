"use client";

import { Home, Search, Heart, User, ClipboardList, Gift, MoreHorizontal } from "lucide-react";

export default function BottomNav() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-stone-200 px-6 py-3 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
            <button className="flex flex-col items-center gap-1 text-pizza-orange">
                <ClipboardList className="w-6 h-6" />
                <span className="text-[10px] font-bold">Menu</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-stone-400">
                <Home className="w-6 h-6" />
                <span className="text-[10px] font-medium">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-stone-400">
                <Gift className="w-6 h-6" />
                <span className="text-[10px] font-medium">Rewards</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-stone-400">
                <MoreHorizontal className="w-6 h-6" />
                <span className="text-[10px] font-medium">More</span>
            </button>
        </div>
    );
}
