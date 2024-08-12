interface CardProps {
  title: string;
  description: string;
}

export const Card = ({ title, description }: CardProps) => (
  <div className="group flex flex-col gap-4">
    <div className="relative flex aspect-[455/240]"></div>
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          <h3 className="text-h5-mobile text-white group-hover:!text-brand-yellow-500 md:text-h5">
            {title}
          </h3>
          <p className="text-body2-mobile text-brand-gray-300 md:text-body2">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2"></div>
    </div>
  </div>
);
