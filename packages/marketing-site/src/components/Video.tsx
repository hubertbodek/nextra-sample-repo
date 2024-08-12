interface VideoProps {
  url: string;
}

export const Video = ({ url }: VideoProps) => (
  <div className="mt-10 grid grid-cols-[1px_minmax(0,1fr)] gap-5 bg-brand-dark-700 py-6 pl-3 pr-10 md:pl-5">
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video controls={false} loop={true} autoPlay={true} width="100%">
            <source src={url} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  </div>
);
