import React, { useMemo } from "react";

// Predefined palette of visually appealing colors
const cardColors = [
  "bg-blue-100",
  "bg-green-100",
  "bg-red-100",
  "bg-purple-100",
  "bg-pink-100",
];

interface CardProps {
  date?: string;
  company?: string;
  title: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  price?: string;
  location?: string;
  imageUrl?: string;
  onBtnClick?: () => void;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  date,
  company,
  title,
  subtitle,
  description,
  tags = [],
  price,
  imageUrl,
  onBtnClick,
  footer,
}) => {
  // Memoized random background color
  const bgColor = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * cardColors.length);
    return cardColors[randomIndex];
  }, []); // Empty dependency ensures it runs only once per render

  return (
    <div
      className={`${bgColor} rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition duration-300`}
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        {/* Date */}
        {date && (
          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-500 shadow">
            {date}
          </span>
        )}
        {/* Company Logo */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Company Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
      </div>

      {/* Title and Subtitle */}
      <div className="mb-4">
        {company && <h3 className="text-sm text-gray-700 font-medium mb-1">{company}</h3>}
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      {/* Description */}
      {description && <p className="text-gray-600 mb-4">{description}</p>}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="border border-gray-400 rounded-full px-3 py-1 text-xs font-medium text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer Section */}
      <div className="flex justify-between items-center flex-nowrap mt-auto w-full">
  {/* Price Section */}
  {price && (
    <p className="text-lg font-bold text-gray-900 whitespace-nowrap">
      {price}
    </p>
  )}

  {/* Button Section */}
  {footer ? (
    footer
  ) : (
    onBtnClick && (
      <button
        onClick={onBtnClick}
        className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-300 whitespace-nowrap"
      >
        Details
      </button>
    )
  )}
</div>



    </div>
  );
};

export default Card;
