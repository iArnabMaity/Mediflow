/**
 * DocumentationLayout
 * MediFlow documentation & knowledge base layout
 * Features: 3-column layout (sidebar / body / TOC)
 */

import React, { ReactNode, useState, useEffect } from "react";
import {
  Sidebar,
  SidebarNavItem,
  SidebarSection,
  TableOfContents,
  TocItem,
  Breadcrumb,
} from "@/components/Navigation";
import Input, { SearchPill } from "@/components/Input";

interface DocumentationLayoutProps {
  children: ReactNode;
  sidebarItems?: Array<{
    label: string;
    href: string;
    icon?: string;
    subsections?: Array<{ label: string; href: string }>;
  }>;
  tableOfContents?: Array<{
    label: string;
    href: string;
    level: 1 | 2 | 3;
  }>;
  currentPath?: string;
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

const DocumentationLayout: React.FC<DocumentationLayoutProps> = ({
  children,
  sidebarItems = [],
  tableOfContents = [],
  currentPath = "",
  title = "Documentation",
  breadcrumbs = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState(currentPath);

  const defaultSidebarItems = [
    {
      label: "Getting Started",
      href: "/docs/getting-started",
      subsections: [
        { label: "Introduction", href: "/docs/intro" },
        { label: "Installation", href: "/docs/install" },
        { label: "First Steps", href: "/docs/first-steps" },
      ],
    },
    {
      label: "Guides",
      href: "/docs/guides",
      subsections: [
        { label: "Patient Dashboard", href: "/docs/patient-dashboard" },
        { label: "Provider Portal", href: "/docs/provider-portal" },
        { label: "Records Management", href: "/docs/records" },
      ],
    },
    {
      label: "API Reference",
      href: "/docs/api",
      subsections: [
        { label: "Authentication", href: "/docs/api/auth" },
        { label: "Patients", href: "/docs/api/patients" },
        { label: "Appointments", href: "/docs/api/appointments" },
      ],
    },
    {
      label: "FAQs",
      href: "/docs/faq",
    },
  ];

  const items = sidebarItems.length > 0 ? sidebarItems : defaultSidebarItems;
  const toc = tableOfContents.length > 0 ? tableOfContents : [
    { label: "Introduction", href: "#intro", level: 1 as const },
    { label: "Getting Started", href: "#getting-started", level: 2 as const },
    { label: "Key Concepts", href: "#concepts", level: 2 as const },
    { label: "Best Practices", href: "#practices", level: 2 as const },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar - Navigation */}
      <Sidebar width="normal" sticky collapsible className="hidden lg:block">
        <div className="p-6 border-b border-hairline">
          <h1 className="text-2xl font-bold text-ink mb-4">MediFlow Docs</h1>
          <SearchPill
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {items.map((item, idx) => (
          <SidebarSection
            key={idx}
            title={item.label}
            collapsible={!!item.subsections}
            defaultOpen={activeSection.includes(item.href)}
          >
            <nav className="space-y-1">
              <SidebarNavItem
                href={item.href}
                label={item.label}
                isActive={activeSection === item.href}
                onClick={() => setActiveSection(item.href)}
              />
              {item.subsections && (
                <>
                  {item.subsections.map((sub) => (
                    <SidebarNavItem
                      key={sub.href}
                      href={sub.href}
                      label={sub.label}
                      isActive={activeSection === sub.href}
                      onClick={() => setActiveSection(sub.href)}
                      className="ml-4"
                    />
                  ))}
                </>
              )}
            </nav>
          </SidebarSection>
        ))}
      </Sidebar>

      {/* Center - Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-hairline p-6 sticky top-0 z-40">
          {breadcrumbs.length > 0 && (
            <Breadcrumb items={breadcrumbs} className="mb-3" />
          )}
          <h1 className="text-3xl font-bold text-ink">{title}</h1>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6 md:p-12">
            <article className="prose prose-lg max-w-none text-charcoal leading-relaxed">
              {children}
            </article>
          </div>
        </main>
      </div>

      {/* Right Sidebar - Table of Contents */}
      <div className="hidden xl:flex xl:w-48 xl:flex-col xl:border-l xl:border-hairline xl:p-6 xl:bg-surface-soft">
        <TableOfContents title="On this page" sticky>
          {toc.map((item, idx) => (
            <TocItem
              key={idx}
              href={item.href}
              label={item.label}
              level={item.level}
            />
          ))}
        </TableOfContents>
      </div>
    </div>
  );
};

export default DocumentationLayout;
