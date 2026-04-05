import { useState, memo } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

/**
 * Main Layout component for FlowBoard.
 * Arranges Sidebar, Header, and Content area.
 * Desktop: Sidebar is fixed to the left.
 * Mobile: Sidebar is hidden and toggled via hamburger.
 */
export const Layout = memo(function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const toggleMobileSidebar = () => setIsMobileOpen((prev) => !prev);

  // Register Global Keyboard Shortcuts (B, N, Escape)
  useKeyboardShortcuts(toggleCollapse);

  return (
    <div className="flex h-screen w-full bg-background-main text-slate-100 overflow-hidden font-sans">
      {/* (Mobile Overlay) */}
      {isMobileOpen && (
        <div 
          onClick={toggleMobileSidebar}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar - Desktop & Tablet */}
      <div 
        className={`hidden md:flex flex-col shrink-0 h-full transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-[260px]'}`}
      >
        <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      </div>

      {/* Sidebar - Mobile Drawer */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform md:hidden transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar isCollapsed={false} onToggleCollapse={toggleMobileSidebar} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header onToggleSidebar={toggleMobileSidebar} />
        
        <main className="flex-1 min-h-0 bg-transparent relative">
          {children}
        </main>
      </div>
    </div>
  );
});

