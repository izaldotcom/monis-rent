// src/lib/data.ts

export type WorkspaceItem = {
  id: string;
  name: string;
  price: number;
  thumbnailUrl: string;
  renderUrl: string;
};

export type AccessoryItem = WorkspaceItem & {
  icon: string;
  category?: string;
};

export const DESKS: WorkspaceItem[] = [
  {
    id: "desk-1",
    name: "Minimalist Wood Desk",
    price: 15,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400",
    renderUrl: "",
  },
  {
    id: "desk-2",
    name: "Ergonomic Standing Desk",
    price: 25,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400",
    renderUrl: "",
  },
];

export const CHAIRS: WorkspaceItem[] = [
  {
    id: "chair-1",
    name: "Pro Ergonomic Chair",
    price: 10,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400",
    renderUrl: "",
  },
  {
    id: "chair-2",
    name: "Casual Mesh Chair",
    price: 7,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400",
    renderUrl: "",
  },
];

export const ACCESSORIES: AccessoryItem[] = [
  // Original Accessories
  {
    id: "acc-1",
    name: "27-inch 4K Monitor",
    price: 20,
    icon: "🖥️",
    thumbnailUrl: "",
    renderUrl: "",
  },
  {
    id: "acc-2",
    name: "Desk Lamp",
    price: 5,
    icon: "💡",
    thumbnailUrl: "",
    renderUrl: "",
  },
  {
    id: "acc-3",
    name: "Potted Plant",
    price: 3,
    icon: "🪴",
    thumbnailUrl: "",
    renderUrl: "",
  },

  // Coffee Station
  {
    id: "cof-1",
    name: "Espresso Machine",
    price: 12,
    icon: "☕",
    category: "Coffee Station",
    thumbnailUrl: "",
    renderUrl: "",
  },
  {
    id: "cof-2",
    name: "Grinder",
    price: 4,
    icon: "⚙️",
    category: "Coffee Station",
    thumbnailUrl: "",
    renderUrl: "",
  },

  // Outdoor Gear
  {
    id: "out-1",
    name: "Surfboard",
    price: 15,
    icon: "🏄",
    category: "Outdoor Gear",
    thumbnailUrl: "",
    renderUrl: "",
  },
  {
    id: "out-2",
    name: "Motorcycle",
    price: 45,
    icon: "🏍️",
    category: "Outdoor Gear",
    thumbnailUrl: "",
    renderUrl: "",
  },

  // Relax Zone
  {
    id: "rel-1",
    name: "Bean Bag",
    price: 8,
    icon: "🛋️",
    category: "Relax Zone",
    thumbnailUrl: "",
    renderUrl: "",
  },
  {
    id: "rel-2",
    name: "Yoga Mat",
    price: 2,
    icon: "🧘",
    category: "Relax Zone",
    thumbnailUrl: "",
    renderUrl: "",
  },

  // Garage Space
  {
    id: "gar-1",
    name: "Tool Shelf",
    price: 10,
    icon: "🔧",
    category: "Garage Space",
    thumbnailUrl: "",
    renderUrl: "",
  },
];
