# AQI Data Viewer - Combined Component

## Overview
Combined the "Real-Time AQI Monitor" and "Historical Air Quality Data" into a single tabbed component for better UX and space efficiency on the dashboard.

## Changes Made

### 1. New Component: AQIDataViewer
**File:** `src/components/home/AQIDataViewer.tsx`

A unified component that combines both real-time monitoring and historical data visualization:

**Features:**
- Tab-based interface with two views:
  1. **Historical Air Quality Data** (default tab)
  2. **Real-Time AQI Monitor**
- Gradient header with tab buttons
- Smooth transitions between tabs
- Mobile-responsive tab labels (shortened on small screens)
- Icons for visual clarity (TrendingUp for Historical, Activity for Real-Time)

**Props:**
- `currentAQI: number` - Current AQI value for real-time monitoring
- `onCityChange?: function` - Callback for city selection changes

### 2. Updated Components

#### AQITrendGraph.tsx
- Removed outer card wrapper (bg-white, rounded-3xl, shadow, border, padding)
- Now renders content directly without container
- Still maintains all functionality (city selector, time period, statistics, graph)

#### MainOptimized.tsx
- Replaced separate `AQIRealtimeMonitor` and `AQITrendGraph` sections
- Now uses single `AQIDataViewer` component
- Removed unused imports (Activity, TrendingUp icons)
- Added new import for `AQIDataViewer`
- Maintained lazy loading and collapsible behavior on mobile

### 3. Tab Behavior

**Default State:**
- Historical Air Quality Data tab is active by default
- Users can switch to Real-Time Monitor by clicking the tab

**Visual Design:**
- Active tab: White background with primary text color
- Inactive tabs: Semi-transparent white text with hover effects
- Gradient header (primary to secondary) for visual appeal
- Border between tabs for clear separation

**Mobile Optimization:**
- Tab labels shortened on mobile:
  - "Historical Air Quality Data" → "Historical"
  - "Real-Time AQI Monitor" → "Real-Time"
- Icons always visible for quick recognition
- Touch-friendly tab buttons

### 4. Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  [TrendingUp] Historical  │  [Activity] Real-Time      │  ← Tab Header
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    Tab Content                          │
│         (Historical Data or Real-Time Monitor)          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Benefits

✅ **Space Efficiency**: Combines two large cards into one, reducing vertical scroll
✅ **Better UX**: Related data grouped together with easy switching
✅ **Default to Historical**: Most users want to see trends first
✅ **Maintains Functionality**: Both components work exactly as before
✅ **Mobile Friendly**: Collapsible section on mobile with clear tab interface
✅ **Visual Consistency**: Unified design language with gradient header

## User Flow

1. User lands on dashboard
2. Scrolls to "AQI Data & Trends" section
3. Sees Historical Air Quality Data by default (bar chart with city/time period selectors)
4. Can switch to Real-Time Monitor tab to see live 30-minute tracking
5. Can switch back to Historical tab anytime

## Technical Details

### Component Hierarchy
```
MainOptimized
  └── LazySection
      └── AQIDataViewer
          ├── Tab: Historical
          │   └── AQITrendGraph (no wrapper)
          └── Tab: Real-Time
              └── AQIRealtimeMonitor (with wrapper)
```

### State Management
- `activeTab` state in AQIDataViewer controls which view is shown
- Default: `'historical'`
- Options: `'historical'` | `'realtime'`

### Styling
- Gradient header: `from-primary to-secondary`
- Active tab: `bg-white text-primary`
- Inactive tab: `text-white/80 hover:text-white hover:bg-white/10`
- Smooth transitions on all interactive elements

## Files Modified
- ✅ `src/components/home/AQIDataViewer.tsx` (new)
- ✅ `src/components/home/AQITrendGraph.tsx` (removed wrapper)
- ✅ `src/components/home/MainOptimized.tsx` (integrated new component)

## Testing
- Build successful: ✓
- No TypeScript errors: ✓
- Mobile responsive: ✓
- Tab switching works: ✓
- Default tab is Historical: ✓
- Both views maintain full functionality: ✓

## Before vs After

### Before
- Two separate large cards on dashboard
- Real-Time Monitor card
- Historical Air Quality Data card (24-Hour AQI Trends)
- More vertical scrolling required

### After
- Single unified card with tabs
- Historical Data shown by default
- Real-Time Monitor accessible via tab
- Reduced vertical space usage
- Better visual organization
