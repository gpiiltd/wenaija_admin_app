import React from "react";

interface Tab {
  key: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface NavProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  activeStyle?: React.CSSProperties;
  inactiveStyle?: React.CSSProperties;
  helperStyle?: React.CSSProperties;
}

const Nav: React.FC<NavProps> = ({
  tabs,
  activeTab,
  onTabChange,
  activeStyle,
  inactiveStyle,
  helperStyle,
}) => {
  return (
    <div>
      <section className="flex gap-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <div
              key={tab.key}
              style={isActive ? { ...activeStyle} : inactiveStyle}
              className="flex items-center gap-2 py-2 cursor-pointer"
              onClick={() => onTabChange(tab.key)}
            >
              {tab.icon}
              <h4 className="font-semibold font-style" style={{ color: isActive ? activeStyle?.color : inactiveStyle?.color }}>
                {tab.label}
              </h4>
              {tab.count !== undefined && (
                <span
                  className="text-sm"
                  style={{
                    ...helperStyle,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {tab.count}
                </span>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};


export default Nav;
