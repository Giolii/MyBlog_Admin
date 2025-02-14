const BlogSkeleton = () => {
  return (
    <div>
      {/* Back button skeleton */}
      <div className="mb-6">
        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
      </div>

      <article className="bg-white rounded-lg shadow-md p-8 mb-8">
        {/* Title skeleton */}
        <div className="relative overflow-hidden">
          <div className="h-10 bg-gray-200 rounded-lg mb-4 animate-pulse" />
        </div>

        {/* Author info skeleton */}
        <div className="mb-6">
          <div className="h-5 bg-gray-200 w-48 rounded mb-2 animate-pulse" />
          <div className="h-5 bg-gray-200 w-64 rounded animate-pulse" />
        </div>

        {/* Content skeleton - multiple lines */}
        <div className="space-y-3 mb-8">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-10/12 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
        </div>

        {/* Comments section skeleton */}
        <div className="border-t pt-8">
          <div className="space-y-4">
            {/* Comment skeleton - repeat for multiple comments */}
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex space-x-4">
                {/* Avatar skeleton */}
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                <div className="flex-1 space-y-2">
                  {/* Comment author skeleton */}
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                  {/* Comment text skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogSkeleton;
