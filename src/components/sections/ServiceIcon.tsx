import {
  Brush,
  DoorOpen,
  Hammer,
  Home,
  Layers,
  MessagesSquare,
  PencilRuler,
  Plug,
  Ruler,
  ShieldCheck,
  Building2,
  SearchCheck,
} from "lucide-react";

const map: Record<string, typeof Home> = {
  home: Home,
  brick: Layers,
  structure: Building2,
  brush: Brush,
  plug: Plug,
  window: DoorOpen,
  hammer: Hammer,
  ruler: PencilRuler,
  quality: ShieldCheck,
  chat: MessagesSquare,
  detail: SearchCheck,
  delivery: Ruler,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Home;
  return <Icon className={className ?? "size-5"} aria-hidden="true" />;
}
