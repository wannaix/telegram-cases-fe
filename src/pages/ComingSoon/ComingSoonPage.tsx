import React from "react";
interface ComingSoonPageProps {
  title: string;
}
export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title }) => {
  return (
    <div className="p-4">
      <div className="max-w-md mx-auto text-center pt-20">
        <div className="text-8xl mb-6">🚧</div>
        <h1 className="text-2xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-gray-400 mb-8">
          This feature is coming soon! Stay tuned for updates.
        </p>
        <div className="bg-gray-800 rounded-xl p-6">
          <p className="text-sm text-gray-400">
            Follow our updates to be the first to know when this feature
            launches! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};
