import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type MotionValue } from 'framer-motion';
import type { IconType } from 'react-icons';

export interface DockItem {
  id: string;
  label: string;
  icon: IconType;
  gradient: string;
}

interface DockNavProps {
  items: DockItem[];
  onSelect: (id: string) => void;
}

// Tamanhos do Dock: ícone em repouso, ícone sob o mouse e alcance do efeito
const BASE = 42;
const MAX = 68;
const RANGE = 150;

const DockIcon: React.FC<{ item: DockItem; mouseX: MotionValue<number>; onSelect: (id: string) => void }> = ({ item, mouseX, onSelect }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || x === Infinity) return RANGE;
    return x - (rect.left + rect.width / 2);
  });
  const target = useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE]);
  const size = useSpring(target, { mass: 0.1, stiffness: 170, damping: 14 });
  const glyph = useTransform(size, (s) => s * 0.46);
  const Icon = item.icon;

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={item.label}
      onClick={() => onSelect(item.id)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="dock__icon"
      style={{ width: size, height: size, background: item.gradient }}
    >
      <motion.span className="dock__glyph" style={{ fontSize: glyph }}>
        <Icon />
      </motion.span>
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="dock__tooltip"
            initial={{ opacity: 0, y: -4, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -4, x: '-50%' }}
            transition={{ duration: 0.15 }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const DockNav: React.FC<DockNavProps> = ({ items, onSelect }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <nav
      className="dock"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {items.map((item) => (
        <DockIcon key={item.id} item={item} mouseX={mouseX} onSelect={onSelect} />
      ))}
    </nav>
  );
};

export default DockNav;
