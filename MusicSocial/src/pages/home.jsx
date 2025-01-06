import { createSignal, createEffect } from "solid-js";

const InfiniteVideoScroll = () => {
  const [videos, setVideos] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  // Dummy function to simulate fetching more videos
  const loadMoreVideos = async () => {
    setLoading(true);
    setTimeout(() => {
      // Instead of URLs, we'll refer to local video files in the public folder
      const newVideos = Array.from(
        { length: 1 },
        (_, index) => "https://i.imgur.com/GUzkSbC.mp4" // Relative path from public folder
      );
      setVideos([...videos(), ...newVideos]);
      setLoading(false);
    }, 1000); // Simulate an API delay
  };

  const lastVideoRef = (node) => {
    if (node) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading()) {
            loadMoreVideos();
          }
        },
        {
          rootMargin: "100px", // Trigger when the last video is near the bottom
        }
      );
      observer.observe(node);

      // Cleanup observer when component unmounts
      return () => observer.disconnect();
    }
  };

  // Initial load
  createEffect(() => {
    loadMoreVideos();
  });

  return (
    <div style={{ overflowY: "hidden" }}>
      {videos().map((videoUrl, index) => (
        <div
          ref={index === videos().length - 1 ? lastVideoRef : null}
          key={index}
          class="video-container"
          style={{
            width: "100vw", // Full width of the viewport
            height: "100vh", // Full height of the viewport
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#000", // Placeholder for video background
          }}
        >
          <div class="video" style={{ textAlign: "center", color: "#fff" }}>
            <video
              src={videoUrl} // Video URL is now a relative path from the public folder
              autoPlay
              loop
              controls
              style={{width : "100%"}}
              
            />
          </div>
        </div>
      ))}
      {loading() && <div class="loading">Loading...</div>}
    </div>
  );
};

export default InfiniteVideoScroll;
