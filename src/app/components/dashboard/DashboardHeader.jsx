'use client';

export default function DashboardHeader({ user }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "God morgen";
    if (hour < 18) return "God eftermiddag"; 
    return "God aften";
  };

  const firstName = user?.firstName || "der";

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
        {getGreeting()}, {firstName}!
      </h1>
      <p className="text-lg md:text-xl text-gray-700">Hvad vil du skabe i dag?</p>
    </div>
  );
}
