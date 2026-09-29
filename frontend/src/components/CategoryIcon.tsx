import {
  ShoppingBasket,
  UtensilsCrossed,
  Home,
  Pill,
  Car,
  Receipt,
  ShoppingBag,
  MoreHorizontal,
  type LucideIcon,
} from 'lucide-react'
import type { Category } from '../types/expense'

const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  GROCERIES: ShoppingBasket,
  FOOD: UtensilsCrossed,
  HOUSEHOLD: Home,
  MEDICINE: Pill,
  TRAVEL: Car,
  BILLS: Receipt,
  SHOPPING: ShoppingBag,
  OTHER: MoreHorizontal,
}

interface CategoryIconProps {
  category: Category
  size?: number
  className?: string
}

export function CategoryIcon({ category, size = 20, className }: CategoryIconProps) {
  const Icon = CATEGORY_ICONS[category]
  return <Icon size={size} className={className} strokeWidth={2} aria-hidden="true" />
}
