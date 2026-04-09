"use client";

import { useState, useRef, useEffect } from "react";
import {
  DESKS,
  CHAIRS,
  ACCESSORIES,
  WorkspaceItem,
  AccessoryItem,
} from "../lib/data";

// --- OPTIMIZED DRAGGABLE (MULTI-SELECT SUPPORT) ---
const Draggable = ({
  children,
  initialX,
  initialY,
  onRemove,
  onDragEnd,
  isRemovable = true,
  isSelected,
  onClick,
}: any) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: initialX, y: initialY });
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (dragRef.current) {
      dragRef.current.style.transform = `translate(${initialX}px, ${initialY}px)`;
      pos.current = { x: initialX, y: initialY };
    }
  }, [initialX, initialY]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onClick();
    isDragging.current = true;
    startPos.current = {
      x: e.clientX - pos.current.x,
      y: e.clientY - pos.current.y,
    };

    if (dragRef.current) {
      dragRef.current.setPointerCapture(e.pointerId);
      dragRef.current.style.zIndex = "100";
      dragRef.current.style.transition = "none";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !dragRef.current) return;
    pos.current.x = e.clientX - startPos.current.x;
    pos.current.y = e.clientY - startPos.current.y;
    dragRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragRef.current) {
      dragRef.current.releasePointerCapture(e.pointerId);
      dragRef.current.style.zIndex = "30";
    }
    onDragEnd(pos.current.x, pos.current.y);
  };

  return (
    <div
      ref={dragRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: "none", position: "absolute", zIndex: 30 }}
      className={`group cursor-grab active:cursor-grabbing p-2 rounded-xl transition-shadow ${isSelected ? "ring-2 ring-indigo-500 shadow-2xl bg-indigo-50/20" : ""}`}
    >
      {isRemovable && (
        <button
          onPointerDown={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 shadow-md flex items-center justify-center z-[110]"
        >
          ✕
        </button>
      )}
      {children}
    </div>
  );
};

// --- 2D ASSETS ---
const Desk2D = ({ desk }: { desk: WorkspaceItem }) => (
  <div
    className={`w-[400px] h-[180px] rounded-xl shadow-2xl flex flex-col items-center justify-center border-4 ${desk.id === "desk-1" ? "bg-[#d9b382] border-[#b0895a]" : "bg-slate-800 border-slate-900"} relative`}
  >
    <span className="text-white/30 font-black tracking-widest uppercase text-2xl select-none">
      {desk.name}
    </span>
    <div className="absolute bottom-4 bg-black/20 px-3 py-1 rounded-full text-white/70 text-[10px] font-bold">
      BASE UNIT
    </div>
  </div>
);

const Chair2D = ({ chair }: { chair: WorkspaceItem }) => (
  <div className="relative flex flex-col items-center pointer-events-none">
    <div
      className={`w-20 h-24 rounded-[2rem] shadow-xl border-4 ${chair.id === "chair-1" ? "bg-indigo-600 border-indigo-800" : "bg-slate-500 border-slate-700"} flex items-center justify-start pt-2 flex-col`}
    >
      <div className="w-12 h-4 bg-black/20 rounded-full"></div>
    </div>
    <div className="mt-2 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 border border-slate-200">
      {chair.name}
    </div>
  </div>
);

const Accessory2D = ({ acc }: { acc: AccessoryItem }) => {
  return (
    <div className="relative flex flex-col items-center pointer-events-none">
      <div className="w-14 h-14 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-3xl">
        {acc.icon}
      </div>
      <div className="mt-2 bg-white/90 px-2 py-0.5 rounded text-[9px] font-bold text-slate-600 border border-slate-200">
        {acc.name}
      </div>
    </div>
  );
};

export default function WorkspaceBuilder() {
  const [selectedDesk, setSelectedDesk] = useState<WorkspaceItem>(DESKS[0]);
  const [selectedChair, setSelectedChair] = useState<WorkspaceItem>(CHAIRS[0]);
  const [addedAccessories, setAddedAccessories] = useState<
    (AccessoryItem & { instanceId: number; x: number; y: number })[]
  >([]);
  const [deskPos, setDeskPos] = useState({ x: 0, y: 0 });
  const [chairPos, setChairPos] = useState({ x: 0, y: 160 });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSelectAllNotice, setShowSelectAllNotice] = useState(false);

  // Group accessories by category
  const categories = [
    "Coffee Station",
    "Outdoor Gear",
    "Relax Zone",
    "Garage Space",
  ];

  const addAccessory = (item: AccessoryItem) => {
    setAddedAccessories([
      ...addedAccessories,
      {
        ...item,
        instanceId: Date.now(),
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      },
    ]);
  };

  const handleSelectAll = () => {
    setSelectedIds([
      "desk",
      "chair",
      ...addedAccessories.map((a) => a.instanceId.toString()),
    ]);
    setShowSelectAllNotice(true);
    setTimeout(() => setShowSelectAllNotice(false), 3000);
  };

  const moveAll = (deltaX: number, deltaY: number) => {
    setDeskPos((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
    setChairPos((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
    setAddedAccessories((prev) =>
      prev.map((a) => ({ ...a, x: a.x + deltaX, y: a.y + deltaY })),
    );
  };

  const totalPrice =
    selectedDesk.price +
    selectedChair.price +
    addedAccessories.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col overflow-hidden relative">
      {showSelectAllNotice && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[70] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-indigo-400">
            <span className="text-lg">✨</span>
            <p className="font-bold text-sm">
              All items selected! Move them anywhere.
            </p>
          </div>
        </div>
      )}

      <header className="z-[60] bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 lg:px-12 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black italic">
          monis<span className="text-indigo-600">.rent</span>
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedIds([])}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Deselect
          </button>
          <button
            onClick={handleSelectAll}
            className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-xs font-black border border-indigo-100 hover:bg-indigo-100 transition-all uppercase"
          >
            Select All
          </button>
          <button
            onClick={() => setIsCheckingOut(true)}
            className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold flex items-center gap-3 shadow-lg hover:bg-indigo-600 transition-all"
          >
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs">
              ${totalPrice}
            </span>{" "}
            Rent Now
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row p-4 lg:p-8 gap-6 max-w-[1800px] mx-auto w-full">
        {/* SIDEBAR CATALOG */}
        <div className="w-full lg:w-[380px] space-y-6 overflow-y-auto pr-2 max-h-[85vh] custom-scrollbar">
          {/* Main Units */}
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
              01. Main Units
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {DESKS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDesk(d)}
                  className={`p-2 rounded-2xl border-2 transition-all ${selectedDesk.id === d.id ? "border-indigo-600 bg-indigo-50" : "border-slate-50 bg-slate-50 opacity-60"}`}
                >
                  <img
                    src={d.thumbnailUrl}
                    className="h-16 w-full object-cover rounded-xl mb-1"
                  />
                  <div className="text-[10px] font-bold uppercase">
                    {d.name}
                  </div>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CHAIRS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedChair(c)}
                  className={`p-2 rounded-2xl border-2 transition-all ${selectedChair.id === c.id ? "border-indigo-600 bg-indigo-50" : "border-slate-50 bg-slate-50 opacity-60"}`}
                >
                  <img
                    src={c.thumbnailUrl}
                    className="h-16 w-full object-cover rounded-xl mb-1"
                  />
                  <div className="text-[10px] font-bold uppercase">
                    {c.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Categories From Sketch */}
          {categories.map((cat, idx) => (
            <div
              key={cat}
              className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm"
            >
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{`0${idx + 2}. ${cat}`}</h3>
              <div className="grid grid-cols-2 gap-2">
                {ACCESSORIES.filter((a) => a.category === cat).map((a) => (
                  <button
                    key={a.id}
                    onClick={() => addAccessory(a)}
                    className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-200 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {a.icon}
                    </span>
                    <span className="text-[9px] font-bold text-center uppercase text-slate-500">
                      {a.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* General Accessories */}
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
              06. Tech & Decor
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {ACCESSORIES.filter((a) => !a.category).map((a) => (
                <button
                  key={a.id}
                  onClick={() => addAccessory(a)}
                  className="flex flex-col items-center p-2 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-all"
                >
                  <span className="text-xl">{a.icon}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* INTERACTIVE AREA */}
        <div className="flex-1 relative bg-white rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:40px_40px] flex items-center justify-center min-h-[600px]">
          <div className="relative w-full h-full flex items-center justify-center">
            <Draggable
              initialX={deskPos.x}
              initialY={deskPos.y}
              isRemovable={false}
              isSelected={selectedIds.includes("desk")}
              onClick={() =>
                setSelectedIds((p) => (p.includes("desk") ? p : ["desk"]))
              }
              onDragEnd={(x: number, y: number) => {
                const dx = x - deskPos.x;
                const dy = y - deskPos.y;
                if (selectedIds.includes("desk") && selectedIds.length > 1)
                  moveAll(dx, dy);
                else setDeskPos({ x, y });
              }}
            >
              <Desk2D desk={selectedDesk} />
            </Draggable>

            <Draggable
              initialX={chairPos.x}
              initialY={chairPos.y}
              isRemovable={false}
              isSelected={selectedIds.includes("chair")}
              onClick={() =>
                setSelectedIds((p) => (p.includes("chair") ? p : ["chair"]))
              }
              onDragEnd={(x: number, y: number) => {
                const dx = x - chairPos.x;
                const dy = y - chairPos.y;
                if (selectedIds.includes("chair") && selectedIds.length > 1)
                  moveAll(dx, dy);
                else setChairPos({ x, y });
              }}
            >
              <Chair2D chair={selectedChair} />
            </Draggable>

            {addedAccessories.map((acc) => (
              <Draggable
                key={acc.instanceId}
                initialX={acc.x}
                initialY={acc.y}
                isSelected={selectedIds.includes(acc.instanceId.toString())}
                onClick={() =>
                  setSelectedIds((p) =>
                    p.includes(acc.instanceId.toString())
                      ? p
                      : [acc.instanceId.toString()],
                  )
                }
                onRemove={() =>
                  setAddedAccessories((p) =>
                    p.filter((a) => a.instanceId !== acc.instanceId),
                  )
                }
                onDragEnd={(x: number, y: number) => {
                  const dx = x - acc.x;
                  const dy = y - acc.y;
                  if (
                    selectedIds.includes(acc.instanceId.toString()) &&
                    selectedIds.length > 1
                  )
                    moveAll(dx, dy);
                  else
                    setAddedAccessories((p) =>
                      p.map((a) =>
                        a.instanceId === acc.instanceId ? { ...a, x, y } : a,
                      ),
                    );
                }}
              >
                <Accessory2D acc={acc} />
              </Draggable>
            ))}
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 border border-slate-200 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400">
            Drag items to arrange your dream workspace
          </div>
        </div>
      </main>

      {/* SUMMARY OVERLAY */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-3xl font-black mb-8 text-center italic tracking-tight underline decoration-indigo-500">
              Inventory Setup.
            </h2>
            <div className="space-y-4 mb-10 max-h-[40vh] overflow-y-auto pr-2">
              <div className="flex justify-between font-bold border-b pb-2">
                <span>{selectedDesk.name}</span>
                <span>${selectedDesk.price}</span>
              </div>
              <div className="flex justify-between font-bold border-b pb-2">
                <span>{selectedChair.name}</span>
                <span>${selectedChair.price}</span>
              </div>
              {addedAccessories.map((a) => (
                <div
                  key={a.instanceId}
                  className="flex justify-between text-sm text-slate-500 py-1 border-b border-slate-50"
                >
                  <span>
                    {a.icon} {a.name}
                  </span>
                  <span>${a.price}</span>
                </div>
              ))}
              <div className="pt-6 flex justify-between items-end border-t-2 border-dashed border-slate-100">
                <span className="font-black uppercase text-xs text-slate-400">
                  Monthly Total
                </span>
                <span className="text-4xl font-black text-indigo-600">
                  ${totalPrice}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setIsCheckingOut(false)}
                className="flex-1 py-4 font-black uppercase text-xs border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all"
              >
                Back
              </button>
              <button className="flex-[2] py-4 font-black uppercase text-xs bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-indigo-600 transition-all">
                Complete Rent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
