import { Shield, Truck, Zap } from "lucide-react";
import React from "react";

const HomeFeatures = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast Delivery",
      desc: "Lightning-fast shipping to your door",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      desc: "Your data is always protected",
    },
    { icon: Truck, title: "Free Returns", desc: "30-day hassle-free returns" },
  ];

  return (
    <div>
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-apple"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeFeatures;
