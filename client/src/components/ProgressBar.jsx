const ProgressBar = ({ current, total }) => {
  const percentage = Math.min((current / total) * 100, 100);
  const barColor = current >= total ? "bg-red-600" : "bg-blue-600";

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
      <div
        className={`${barColor} h-4 rounded-full transition-all`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
